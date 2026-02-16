"""Feature engineering and dataset builder.

Loads de-identified CSV, computes features, outputs train/val/test Parquet files
and metadata manifest.
"""
import csv
import json
import random
from pathlib import Path


def load_csv(path: str):
    """Load CSV and return header + list of dict rows."""
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        header = reader.fieldnames or []
        for row in reader:
            rows.append(row)
    return header, rows


def safe_float(v: str, default: float = 0.0) -> float:
    try:
        return float(v) if v and v.strip() else default
    except Exception:
        return default


def safe_int(v: str, default: int = 0) -> int:
    try:
        return int(v) if v and v.strip() else default
    except Exception:
        return default


def compute_features(rows):
    """Compute feature matrix + target."""
    X = []
    y = []
    
    for row in rows:
        # Numeric features
        age = safe_float(row.get("age", 0))
        lab_value = safe_float(row.get("lab_value", 100))
        
        # Categorical features (one-hot encoded as integers)
        gender_m = 1 if row.get("gender", "").strip() == "M" else 0
        gender_f = 1 if row.get("gender", "").strip() == "F" else 0
        
        diag = row.get("diagnosis_code", "").strip()
        diag_is_n18 = 1 if diag == "N18" else 0
        diag_is_r07 = 1 if diag == "R07" else 0
        diag_is_g47 = 1 if diag == "G47" else 0
        diag_is_j18 = 1 if diag == "J18" else 0
        diag_other = 1 if diag not in ["N18", "R07", "G47", "J18"] else 0
        
        # Derived features
        age_sq = age ** 2 / 10000  # normalize
        lab_normalized = (lab_value - 100) / 50  # normalize
        
        features = {
            "age": age,
            "lab_value": lab_value,
            "gender_m": gender_m,
            "gender_f": gender_f,
            "diag_n18": diag_is_n18,
            "diag_r07": diag_is_r07,
            "diag_g47": diag_is_g47,
            "diag_j18": diag_is_j18,
            "diag_other": diag_other,
            "age_squared": age_sq,
            "lab_normalized": lab_normalized,
        }
        
        target = safe_int(row.get("outcome_readmit", 0))
        
        X.append(features)
        y.append(target)
    
    return X, y


def split_data(X, y, train_pct=0.7, val_pct=0.15, seed=42):
    """Split into train/val/test."""
    n = len(X)
    indices = list(range(n))
    random.Random(seed).shuffle(indices)
    
    n_train = int(n * train_pct)
    n_val = int(n * val_pct)
    
    train_idx = indices[:n_train]
    val_idx = indices[n_train : n_train + n_val]
    test_idx = indices[n_train + n_val :]
    
    train_X = [X[i] for i in train_idx]
    train_y = [y[i] for i in train_idx]
    
    val_X = [X[i] for i in val_idx]
    val_y = [y[i] for i in val_idx]
    
    test_X = [X[i] for i in test_idx]
    test_y = [y[i] for i in test_idx]
    
    return (train_X, train_y), (val_X, val_y), (test_X, test_y)


def write_parquet_simple(features, targets, path: str):
    """Write features + target to actual Parquet format using pandas."""
    import pandas as pd
    
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    
    # Convert to DataFrame and write as parquet
    rows = []
    for feat_dict, tgt in zip(features, targets):
        row = dict(feat_dict)
        row["outcome_readmit"] = tgt
        rows.append(row)
    
    if rows:
        df = pd.DataFrame(rows)
        df.to_parquet(path, index=False)
    else:
        # Create empty parquet file
        pd.DataFrame().to_parquet(path, index=False)
    
    print(f"Wrote {len(features)} rows to {path}")


def main():
    input_path = "data/sample_deid.csv"
    output_dir = "data/processed"
    
    if not Path(input_path).exists():
        print(f"Error: {input_path} not found")
        return
    
    print("=" * 80)
    print("FEATURE ENGINEERING & DATASET BUILDER")
    print("=" * 80)
    print()
    
    # Load and compute features
    header, rows = load_csv(input_path)
    print(f"Loaded {len(rows)} rows from {input_path}")
    
    X, y = compute_features(rows)
    print(f"Computed features for {len(X)} samples")
    print()
    
    # Split data
    (train_X, train_y), (val_X, val_y), (test_X, test_y) = split_data(X, y)
    
    print(f"Train: {len(train_X)} ({100*len(train_X)//len(X)}%)")
    print(f"Val:   {len(val_X)} ({100*len(val_X)//len(X)}%)")
    print(f"Test:  {len(test_X)} ({100*len(test_X)//len(X)}%)")
    print()
    
    # Write split datasets
    write_parquet_simple(train_X, train_y, f"{output_dir}/train.parquet")
    write_parquet_simple(val_X, val_y, f"{output_dir}/val.parquet")
    write_parquet_simple(test_X, test_y, f"{output_dir}/test.parquet")
    print()
    
    # Metadata manifest
    manifest = {
        "source": input_path,
        "num_samples": len(X),
        "num_features": len(X[0]) if X else 0,
        "features": list(X[0].keys()) if X else [],
        "target": "outcome_readmit",
        "train_size": len(train_X),
        "val_size": len(val_X),
        "test_size": len(test_X),
        "splits": {
            "train": f"{output_dir}/train.parquet",
            "val": f"{output_dir}/val.parquet",
            "test": f"{output_dir}/test.parquet",
        },
    }
    
    manifest_path = f"{output_dir}/manifest.json"
    Path(manifest_path).parent.mkdir(parents=True, exist_ok=True)
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"Saved manifest to {manifest_path}")
    print()
    print("=" * 80)
    print("FEATURE ENGINEERING COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
