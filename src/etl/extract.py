"""Simple extraction utilities: CSV/Parquet/DB -> Parquet sample

Usage examples:
  python src/etl/extract.py --source csv --path data/sample/patients.csv --limit 1000 --output data/sample.parquet
  python src/etl/extract.py --source db --uri postgresql://user:pass@host:5432/db --query "SELECT * FROM patients LIMIT 1000" --output data/sample.parquet
"""
from __future__ import annotations

import argparse
import os
from typing import Optional

import pandas as pd


def read_csv(path: str, limit: Optional[int] = None) -> pd.DataFrame:
    if limit:
        return pd.read_csv(path, nrows=limit)
    return pd.read_csv(path)


def read_parquet(path: str, limit: Optional[int] = None) -> pd.DataFrame:
    df = pd.read_parquet(path)
    if limit:
        return df.head(limit)
    return df


def read_db(uri: str, query: str, limit: Optional[int] = None) -> pd.DataFrame:
    from sqlalchemy import create_engine, text

    engine = create_engine(uri)
    if limit and "LIMIT" not in query.upper():
        query = f"{query.rstrip('; ')} LIMIT {limit}"  # type: ignore
    with engine.connect() as conn:
        return pd.read_sql_query(text(query), conn)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", choices=("csv", "parquet", "db"), required=True)
    parser.add_argument("--path", help="Path to CSV/Parquet file")
    parser.add_argument("--uri", help="DB URI for SQLAlchemy if source=db")
    parser.add_argument("--query", help="SQL query to run (for db)")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--output", required=True, help="Output Parquet path")
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    if args.source == "csv":
        if not args.path:
            raise SystemExit("--path is required for csv source")
        df = read_csv(args.path, limit=args.limit)
    elif args.source == "parquet":
        if not args.path:
            raise SystemExit("--path is required for parquet source")
        df = read_parquet(args.path, limit=args.limit)
    else:
        if not args.uri or not args.query:
            raise SystemExit("--uri and --query required for db source")
        df = read_db(args.uri, args.query, limit=args.limit)

    df.to_parquet(args.output, index=False)
    print(f"Wrote {len(df)} rows to {args.output}")


if __name__ == "__main__":
    main()
