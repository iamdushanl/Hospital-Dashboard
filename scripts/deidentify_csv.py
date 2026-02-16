"""De-identify a CSV file using only the standard library.

Features:
- drop specified columns
- hash identifier columns (SHA256 with optional salt)
- shift date columns by a random offset within +/- days

Usage:
  python scripts/deidentify_csv.py --input data/sample/patients.csv --output data/sample_deid.csv --drop-cols patient_name,ssn --hash-cols patient_id --date-cols dob,admission_date,discharge_date --shift-days 365 --salt secret --seed 123
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import os
import random
from datetime import datetime, timedelta
from typing import List, Optional


def parse_list(s: Optional[str]) -> List[str]:
    if not s:
        return []
    return [x.strip() for x in s.split(",") if x.strip()]


def hash_value(v: str, salt: str = "") -> str:
    if v is None or v == "":
        return ""
    key = f"{v}|{salt}".encode("utf-8")
    return hashlib.sha256(key).hexdigest()


def try_parse_date(s: str) -> Optional[datetime]:
    if s is None or s == "":
        return None
    for fmt in ("%Y-%m-%d", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S"):
        try:
            return datetime.strptime(s, fmt)
        except Exception:
            continue
    # fallback: try fromisoformat
    try:
        return datetime.fromisoformat(s)
    except Exception:
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--drop-cols")
    parser.add_argument("--hash-cols")
    parser.add_argument("--date-cols")
    parser.add_argument("--shift-days", type=int, default=365)
    parser.add_argument("--salt", default="")
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    drop_cols = parse_list(args.drop_cols)
    hash_cols = parse_list(args.hash_cols)
    date_cols = parse_list(args.date_cols)

    rng = random.Random(args.seed)

    out_dir = os.path.dirname(args.output)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    with open(args.input, newline="", encoding="utf-8") as fin:
        reader = csv.DictReader(fin)
        fieldnames = [f for f in reader.fieldnames or [] if f not in drop_cols]

        with open(args.output, "w", newline="", encoding="utf-8") as fout:
            writer = csv.DictWriter(fout, fieldnames=fieldnames)
            writer.writeheader()
            rows_written = 0
            for row in reader:
                out = {}
                for f in fieldnames:
                    val = row.get(f, "")
                    if f in hash_cols:
                        out[f] = hash_value(val, salt=args.salt)
                        continue
                    if f in date_cols:
                        d = try_parse_date(val)
                        if d is None:
                            out[f] = ""
                        else:
                            offset = rng.randint(-args.shift_days, args.shift_days)
                            d2 = d + timedelta(days=offset)
                            out[f] = d2.date().isoformat()
                        continue
                    out[f] = val
                writer.writerow(out)
                rows_written += 1

    print(f"Wrote de-identified CSV: {args.output} ({rows_written} rows)")


if __name__ == "__main__":
    main()
