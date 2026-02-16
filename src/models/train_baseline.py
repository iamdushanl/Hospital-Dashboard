"""Baseline model training: Logistic Regression using pure Python.

Trains a simple logistic regression model for readmission prediction.
"""
import csv
import json
import math
from pathlib import Path


def load_parquet_simple(path: str):
    """Load CSV or Parquet and return features + targets.

    This function will try to read parquet via pandas when the file
    extension is `.parquet`. If pandas is unavailable or reading fails,
    it falls back to CSV DictReader. The target column can be `target`
    or `outcome_readmit` (preferred when present).
    """
    X = []
    y = []

    # Try pandas for parquet files when available
    if str(path).lower().endswith(".parquet"):
        try:
            import pandas as pd  # optional dependency

            df = pd.read_parquet(path)
            cols = list(df.columns)
            target_col = "target" if "target" in cols else ("outcome_readmit" if "outcome_readmit" in cols else None)
            feature_cols = [c for c in cols if c not in ("target", "outcome_readmit")]

            for _, row in df.iterrows():
                features = [float(row.get(c, 0) or 0) for c in feature_cols]
                if target_col is not None:
                    try:
                        target = float(row.get(target_col, 0) or 0)
                    except Exception:
                        target = 0.0
                else:
                    target = 0.0
                X.append(features)
                y.append(target)

            return X, y, feature_cols
        except Exception:
            # Fall back to CSV reader below
            pass

    # Fallback: treat as CSV-like file
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        feature_cols = [c for c in fieldnames if c not in ("target", "outcome_readmit")]

        for row in reader:
            features = [float(row.get(c, 0) or 0) for c in feature_cols]
            target_val = row.get("target")
            if target_val is None:
                target_val = row.get("outcome_readmit")
            try:
                target = float(target_val) if target_val is not None else 0.0
            except Exception:
                target = 0.0
            X.append(features)
            y.append(target)

    return X, y, feature_cols


def sigmoid(z):
    """Sigmoid activation function."""
    if z > 100:
        return 1.0
    if z < -100:
        return 0.0
    return 1.0 / (1.0 + math.exp(-z))


def predict_proba(X, coef, intercept):
    """Compute prediction probabilities."""
    probs = []
    for x in X:
        z = intercept + sum(c * v for c, v in zip(coef, x))
        probs.append(sigmoid(z))
    return probs


def evaluate_metrics(y_true, y_pred_proba, threshold=0.5):
    """Compute accuracy, precision, recall, F1, AUC."""
    y_pred = [1 if p >= threshold else 0 for p in y_pred_proba]
    
    tp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 1)
    tn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 0)
    fp = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 0 and yp == 1)
    fn = sum(1 for yt, yp in zip(y_true, y_pred) if yt == 1 and yp == 0)
    
    accuracy = (tp + tn) / len(y_true) if y_true else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "tp": tp,
        "tn": tn,
        "fp": fp,
        "fn": fn,
    }


def train_logistic_regression(X, y, lr=0.01, epochs=100):
    """Simple SGD-based logistic regression training."""
    num_features = len(X[0]) if X else 0
    coef = [0.0] * num_features
    intercept = 0.0
    
    for epoch in range(epochs):
        for x, yt in zip(X, y):
            z = intercept + sum(c * v for c, v in zip(coef, x))
            pred = sigmoid(z)
            error = pred - yt
            
            intercept -= lr * error
            for i in range(num_features):
                coef[i] -= lr * error * x[i]
    
    return coef, intercept


def main():
    data_dir = "data/processed"
    report_dir = "reports"
    
    print("=" * 80)
    print("BASELINE MODEL TRAINING: LOGISTIC REGRESSION")
    print("=" * 80)
    print()
    
    # Load data
    train_path = f"{data_dir}/train.parquet"
    val_path = f"{data_dir}/val.parquet"
    test_path = f"{data_dir}/test.parquet"
    
    for p in [train_path, val_path, test_path]:
        if not Path(p).exists():
            print(f"Error: {p} not found. Run src/etl/dataset_builder.py first.")
            return
    
    train_X, train_y, feature_cols = load_parquet_simple(train_path)
    val_X, val_y, _ = load_parquet_simple(val_path)
    test_X, test_y, _ = load_parquet_simple(test_path)
    
    print(f"Train: {len(train_X)} samples")
    print(f"Val:   {len(val_X)} samples")
    print(f"Test:  {len(test_X)} samples")
    print(f"Features: {len(feature_cols)}")
    print()
    
    # Train model
    print("Training logistic regression model...")
    coef, intercept = train_logistic_regression(train_X, train_y, lr=0.01, epochs=100)
    print("Training complete!")
    print()
    
    # Evaluate
    train_proba = predict_proba(train_X, coef, intercept)
    val_proba = predict_proba(val_X, coef, intercept)
    test_proba = predict_proba(test_X, coef, intercept)
    
    train_metrics = evaluate_metrics(train_y, train_proba)
    val_metrics = evaluate_metrics(val_y, val_proba)
    test_metrics = evaluate_metrics(test_y, test_proba)
    
    print("=" * 80)
    print("EVALUATION METRICS")
    print("=" * 80)
    print()
    
    for split, metrics in [("Train", train_metrics), ("Val", val_metrics), ("Test", test_metrics)]:
        print(f"{split:8s} | Accuracy: {metrics['accuracy']:.4f} | " +
              f"Precision: {metrics['precision']:.4f} | Recall: {metrics['recall']:.4f} | " +
              f"F1: {metrics['f1']:.4f}")
    
    print()
    print("Confusion Matrix (Test Set):")
    print(f"  TP: {test_metrics['tp']:3d}  FP: {test_metrics['fp']:3d}")
    print(f"  FN: {test_metrics['fn']:3d}  TN: {test_metrics['tn']:3d}")
    print()
    
    # Save model and report
    model_data = {
        "model_type": "logistic_regression",
        "coef": coef,
        "intercept": intercept,
        "feature_cols": feature_cols,
        "train_metrics": train_metrics,
        "val_metrics": val_metrics,
        "test_metrics": test_metrics,
    }
    
    Path(report_dir).mkdir(parents=True, exist_ok=True)
    model_path = f"{report_dir}/baseline_model.json"
    
    with open(model_path, "w", encoding="utf-8") as f:
        json.dump(model_data, f, indent=2)
    
    print(f"Model saved to {model_path}")
    print()
    print("=" * 80)
    print("MODEL TRAINING COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
