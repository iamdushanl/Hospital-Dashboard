"""Exploratory Data Analysis notebook script (runnable as-is or in Jupyter).

Loads de-identified CSV, computes cohort stats, missingness, distributions,
and outcome patterns.
"""
import csv
from pathlib import Path
import statistics
from collections import defaultdict, Counter


def load_csv(path: str):
    """Load CSV and return header + list of dict rows."""
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        for row in reader:
            rows.append(row)
    return header, rows


def summarize_numeric_col(values: list[str]) -> dict:
    """Parse as float and summarize: count, missing, min, max, mean."""
    valid = []
    for v in values:
        if v and v.strip():
            try:
                valid.append(float(v))
            except Exception:
                pass
    if not valid:
        return {
            "count": len(values),
            "missing": len(values) - len(valid),
            "min": None,
            "max": None,
            "mean": None,
            "stdev": None,
        }
    return {
        "count": len(values),
        "missing": len(values) - len(valid),
        "min": min(valid),
        "max": max(valid),
        "mean": statistics.mean(valid),
        "stdev": statistics.stdev(valid) if len(valid) > 1 else 0,
    }


def summarize_categorical_col(values: list[str]) -> dict:
    """Count unique values and top 5."""
    valid = [v for v in values if v and v.strip()]
    missing = len(values) - len(valid)
    counter = Counter(valid)
    return {
        "count": len(values),
        "missing": missing,
        "unique": len(counter),
        "top_5": counter.most_common(5),
    }


def main():
    input_path = "data/sample_deid.csv"
    
    print("=" * 80)
    print("HOSPITAL DATA — EXPLORATORY DATA ANALYSIS")
    print("=" * 80)
    print()
    
    if not Path(input_path).exists():
        print(f"Error: {input_path} not found")
        return
    
    header, rows = load_csv(input_path)
    print(f"File: {input_path}")
    print(f"Rows: {len(rows)}")
    print(f"Columns: {len(header)}")
    print()
    
    # Basic cohort stats
    print("=" * 80)
    print("COHORT SUMMARY")
    print("=" * 80)
    print()
    
    # Column summaries
    numeric_cols = ["age", "lab_value", "outcome_readmit"]
    categorical_cols = ["gender", "diagnosis_code"]
    
    for col in numeric_cols:
        if col not in header:
            continue
        values = [row.get(col, "") for row in rows]
        summary = summarize_numeric_col(values)
        print(f"{col:25s} | count: {summary['count']:5d} | missing: {summary['missing']:3d} | " +
              f"min: {summary['min']:7.1f} | max: {summary['max']:7.1f} | mean: {summary['mean']:7.1f} ± {summary['stdev']:5.1f}")
    
    print()
    for col in categorical_cols:
        if col not in header:
            continue
        values = [row.get(col, "") for row in rows]
        summary = summarize_categorical_col(values)
        print(f"{col:25s} | unique: {summary['unique']:3d} | missing: {summary['missing']:3d}")
        for val, count in summary["top_5"]:
            print(f"  {val:20s}: {count:3d} ({100*count/len(rows):.1f}%)")
    
    print()
    
    # Missingness analysis
    print("=" * 80)
    print("MISSINGNESS ANALYSIS")
    print("=" * 80)
    print()
    
    for col in header:
        values = [row.get(col, "") for row in rows]
        missing = sum(1 for v in values if not v or not v.strip())
        missing_pct = 100 * missing / len(rows) if rows else 0
        print(f"{col:30s}: {missing:3d} / {len(rows)} ({missing_pct:5.1f}%)")
    
    print()
    
    # Outcome analysis
    print("=" * 80)
    print("OUTCOME ANALYSIS (Readmission)")
    print("=" * 80)
    print()
    
    if "outcome_readmit" in header:
        readmit_vals = [row.get("outcome_readmit", "") for row in rows]
        readmit_counts = Counter(readmit_vals)
        total = len(readmit_vals)
        for val in sorted(readmit_counts.keys()):
            count = readmit_counts[val]
            pct = 100 * count / total
            print(f"  {val:10s}: {count:3d} ({pct:5.1f}%)")
    
    print()
    
    # Age distribution
    if "age" in header:
        age_vals = [float(row.get("age", 0) or 0) for row in rows if row.get("age", "").strip()]
        age_bins = {
            "0-20": sum(1 for v in age_vals if v < 20),
            "20-40": sum(1 for v in age_vals if 20 <= v < 40),
            "40-60": sum(1 for v in age_vals if 40 <= v < 60),
            "60-80": sum(1 for v in age_vals if 60 <= v < 80),
            "80+": sum(1 for v in age_vals if v >= 80),
        }
        print("=" * 80)
        print("AGE DISTRIBUTION")
        print("=" * 80)
        print()
        for label, count in age_bins.items():
            pct = 100 * count / len(age_vals) if age_vals else 0
            bar = "█" * (count // max(1, max(age_bins.values()) // 20))
            print(f"  {label:10s}: {count:3d} ({pct:5.1f}%) {bar}")
    
    print()
    
    # Gender distribution
    if "gender" in header:
        gender_vals = [row.get("gender", "").strip() for row in rows if row.get("gender", "").strip()]
        gender_counts = Counter(gender_vals)
        print("=" * 80)
        print("GENDER DISTRIBUTION")
        print("=" * 80)
        print()
        for gender in sorted(gender_counts.keys()):
            count = gender_counts[gender]
            pct = 100 * count / len(gender_vals) if gender_vals else 0
            bar = "█" * (count // max(1, max(gender_counts.values()) // 20))
            print(f"  {gender:10s}: {count:3d} ({pct:5.1f}%) {bar}")
    
    print()
    print("=" * 80)
    print("EDA COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
