"""Basic de-identification utilities for tabular data.

Features:
- drop specified columns
- hash identifier columns (SHA256 with optional salt)
- shift date columns by a fixed offset or random offset

Usage:
  python src/etl/deidentify.py --input data/sample.parquet --output data/sample_deid.parquet --drop-cols patient_name,ssn --hash-cols patient_id --date-cols dob --shift-days 365
"""
from __future__ import annotations

import argparse
import hashlib
import os
import random
from typing import Iterable, Optional

import numpy as np
import pandas as pd


def hash_series(s: pd.Series, salt: str = "") -> pd.Series:
    def h(v: object) -> str:
        if pd.isna(v):
            return ""
        key = f"{v}|{salt}".encode("utf-8")
        return hashlib.sha256(key).hexdigest()

    return s.apply(h)


def shift_dates(df: pd.DataFrame, cols: Iterable[str], days: Optional[int] = None, randomize: bool = True, seed: Optional[int] = None) -> pd.DataFrame:
    rng = random.Random(seed)
    for c in cols:
        if c not in df.columns:
            continue
        if not np.issubdtype(df[c].dtype, np.datetime64):
            df[c] = pd.to_datetime(df[c], errors="coerce")
        if days is None:
            # no shift
            continue
        if randomize:
            offsets = [rng.randint(-days, days) for _ in range(len(df))]
            df[c] = df[c] + pd.to_timedelta(offsets, unit="D")
        else:
            df[c] = df[c] + pd.to_timedelta(days, unit="D")
    return df


def deidentify(in_path: str, out_path: str, drop_cols: Optional[Iterable[str]] = None, hash_cols: Optional[Iterable[str]] = None, date_cols: Optional[Iterable[str]] = None, shift_days: Optional[int] = None, salt: str = "", seed: Optional[int] = None) -> None:
    df = pd.read_parquet(in_path)
    drop_cols = list(drop_cols or [])
    hash_cols = list(hash_cols or [])
    date_cols = list(date_cols or [])

    df = df.drop(columns=[c for c in drop_cols if c in df.columns], errors="ignore")

    for c in hash_cols:
        if c in df.columns:
            df[c] = hash_series(df[c], salt=salt)

    if date_cols:
        df = shift_dates(df, date_cols, days=shift_days, randomize=True, seed=seed)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    df.to_parquet(out_path, index=False)
    print(f"Wrote de-identified data: {out_path} ({len(df)} rows)")


def _parse_list(s: Optional[str]) -> list[str]:
    if not s:
        return []
    return [x.strip() for x in s.split(",") if x.strip()]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--drop-cols", help="Comma-separated columns to drop")
    parser.add_argument("--hash-cols", help="Comma-separated columns to hash")
    parser.add_argument("--date-cols", help="Comma-separated date columns to shift")
    parser.add_argument("--shift-days", type=int, default=365, help="Max days to shift (random +/-)")
    parser.add_argument("--salt", default="", help="Optional salt for hashing")
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    deidentify(args.input, args.output, drop_cols=_parse_list(args.drop_cols), hash_cols=_parse_list(args.hash_cols), date_cols=_parse_list(args.date_cols), shift_days=args.shift_days, salt=args.salt, seed=args.seed)


if __name__ == "__main__":
    main()
