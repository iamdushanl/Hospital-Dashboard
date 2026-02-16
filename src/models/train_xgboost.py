"""Train an XGBoost model for readmission prediction.

Usage:
    python src/models/train_xgboost.py \
        --train data/processed/train.parquet \
        --val data/processed/val.parquet \
        --test data/processed/test.parquet

Outputs:
    - reports/xgboost_model.pkl  (pickled model)
    - reports/xgboost_report.json (metrics and feature names)
"""
from __future__ import annotations

import argparse
import json
import pickle
from pathlib import Path

import pandas as pd
import xgboost as xgb
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix


def load_parquet(path: str) -> pd.DataFrame:
    """Load a parquet file."""
    return pd.read_parquet(path)


def safe_mkdir(path: str) -> None:
    """Create parent directory if it doesn't exist."""
    Path(path).parent.mkdir(parents=True, exist_ok=True)


def evaluate_model(model, X, y_true):
    """Evaluate XGBoost model on given data."""
    y_pred_proba = model.predict(xgb.DMatrix(X))
    y_pred = (y_pred_proba >= 0.5).astype(int)

    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)

    # Confusion matrix
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()

    return {
        "accuracy": float(acc),
        "precision": float(prec),
        "recall": float(rec),
        "f1": float(f1),
        "tp": int(tp),
        "fp": int(fp),
        "fn": int(fn),
        "tn": int(tn),
    }


def main():
    parser = argparse.ArgumentParser(description="Train XGBoost model for readmission prediction")
    parser.add_argument("--train", required=True, help="Path to training parquet file")
    parser.add_argument("--val", required=False, help="Path to validation parquet file")
    parser.add_argument("--test", required=False, help="Path to test parquet file")
    parser.add_argument("--target", default="outcome_readmit", help="Target column name")
    parser.add_argument("--model-out", default="reports/xgboost_model.pkl", help="Output model path")
    parser.add_argument("--report-out", default="reports/xgboost_report.json", help="Output report path")
    args = parser.parse_args()

    # Load data
    print("Loading data...")
    train_df = load_parquet(args.train)
    val_df = load_parquet(args.val) if args.val and Path(args.val).exists() else None
    test_df = load_parquet(args.test) if args.test and Path(args.test).exists() else None

    # Feature columns (all except target and id)
    exclude = {args.target, "patient_id"}
    feature_cols = [c for c in train_df.columns if c not in exclude]

    X_train = train_df[feature_cols].astype(float)
    y_train = train_df[args.target].astype(int)

    X_val, y_val = None, None
    if val_df is not None:
        X_val = val_df[feature_cols].astype(float)
        y_val = val_df[args.target].astype(int)

    X_test, y_test = None, None
    if test_df is not None:
        X_test = test_df[feature_cols].astype(float)
        y_test = test_df[args.target].astype(int)

    # Initialize XGBoost model
    print("Training XGBoost model...")
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbose=1,
        eval_metric="logloss",
    )

    # Fit model
    eval_set = [(X_train, y_train)]
    if X_val is not None:
        eval_set.append((X_val, y_val))

    model.fit(
        X_train,
        y_train,
        eval_set=eval_set,
        verbose=False,
    )

    print(f"Best score: {model.best_score}")

    # Save model
    safe_mkdir(args.model_out)
    with open(args.model_out, "wb") as f:
        pickle.dump(model, f)
    print(f"✓ Saved XGBoost model to {args.model_out}")

    # Evaluate on all sets
    print("Evaluating model...")
    report = {
        "model_type": "XGBoost",
        "feature_cols": feature_cols,
        "n_features": len(feature_cols),
        "hyperparameters": {
            "n_estimators": 100,
            "max_depth": 6,
            "learning_rate": 0.1,
            "subsample": 0.8,
            "colsample_bytree": 0.8,
        },
    }

    if X_train is not None:
        report["train_metrics"] = evaluate_model(model, X_train, y_train)
    if X_val is not None:
        report["val_metrics"] = evaluate_model(model, X_val, y_val)
    if X_test is not None:
        report["test_metrics"] = evaluate_model(model, X_test, y_test)

    # Save report
    safe_mkdir(args.report_out)
    with open(args.report_out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"✓ Wrote report to {args.report_out}")

    # Print metrics
    print("\n" + "=" * 60)
    if "train_metrics" in report:
        print("TRAIN METRICS:")
        for k, v in report["train_metrics"].items():
            print(f"  {k}: {v:.4f}" if isinstance(v, float) else f"  {k}: {v}")
    if "val_metrics" in report:
        print("\nVAL METRICS:")
        for k, v in report["val_metrics"].items():
            print(f"  {k}: {v:.4f}" if isinstance(v, float) else f"  {k}: {v}")
    if "test_metrics" in report:
        print("\nTEST METRICS:")
        for k, v in report["test_metrics"].items():
            print(f"  {k}: {v:.4f}" if isinstance(v, float) else f"  {k}: {v}")
    print("=" * 60)


if __name__ == "__main__":
    main()
