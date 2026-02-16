
References:
  - CatBoost: https://catboost.ai/
  - Paper: https://arxiv.org/abs/1706.09516

Usage:
    python src/models/train_catboost.py \\
        --train data/processed/train.parquet \\
        --val data/processed/val.parquet \\
        --test data/processed/test.parquet

Outputs:
    - reports/catboost_model.pkl     (Pickled model)
    - reports/catboost_report.json   (Metrics and feature importance)
"""
from __future__ import annotations

import argparse
import json
import pickle
from pathlib import Path

import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# Try to import CatBoost; fall back to scikit-learn if not available
try:
    from catboost import CatBoostClassifier, Pool
    CATBOOST_AVAILABLE = True
except ImportError:
    from sklearn.ensemble import GradientBoostingClassifier
    CATBOOST_AVAILABLE = False


def load_parquet(path: str) -> pd.DataFrame:
    """Load a parquet file, with CSV fallback."""
    try:
        return pd.read_parquet(path)
    except Exception as e:
        # Try CSV as fallback
        csv_path = path.replace('.parquet', '.csv')
        try:
            return pd.read_csv(csv_path)
        except:
            raise ValueError(f"Could not load {path} or {csv_path}: {e}")


def safe_mkdir(path: str) -> None:
    """Create parent directory if it doesn't exist."""
    Path(path).parent.mkdir(parents=True, exist_ok=True)


def evaluate_model(model, X, y_true):
    """Evaluate CatBoost model on given data."""
    y_pred_proba = model.predict_proba(X)[:, 1]
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
    parser = argparse.ArgumentParser(
        description="Train CatBoost (large tabular model) for readmission prediction"
    )
    parser.add_argument("--train", required=True, help="Path to training parquet file")
    parser.add_argument("--val", required=False, help="Path to validation parquet file")
    parser.add_argument("--test", required=False, help="Path to test parquet file")
    parser.add_argument("--target", default="outcome_readmit", help="Target column name")
    parser.add_argument("--model-out", default="reports/catboost_model.pkl", help="Output model path")
    parser.add_argument("--report-out", default="reports/catboost_report.json", help="Output report path")
    parser.add_argument("--iterations", type=int, default=500, help="Number of boosting iterations")
    args = parser.parse_args()

    # Load data
    print("=" * 70)
    print("CatBoost: Large Tabular Model for Readmission Prediction")
    print("=" * 70)
    print("\nLoading data...")
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

    print(f"  Train samples: {len(X_train)}")
    if X_val is not None:
        print(f"  Val samples: {len(X_val)}")
    if X_test is not None:
        print(f"  Test samples: {len(X_test)}")
    print(f"  Features: {len(feature_cols)}")

    # Initialize and fit model
    if CATBOOST_AVAILABLE:
        print("\nInitializing CatBoost model (large tabular model)...")
        model = CatBoostClassifier(
            iterations=args.iterations,
            depth=8,
            learning_rate=0.05,
            subsample=0.8,
            loss_function="Logloss",
            eval_metric="AUC",
            use_best_model=True,
            random_state=42,
            verbose=100,  # Show progress every 100 iterations
            gpu_ram_limit=1024,  # Use GPU if available (auto switch to CPU if not)
        )

        # Create validation pool for early stopping
        eval_set = None
        if X_val is not None:
            eval_set = Pool(X_val, y_val)

        # Fit model
        print(f"\nTraining CatBoost for {args.iterations} iterations...")
        model.fit(
            Pool(X_train, y_train),
            eval_set=eval_set,
            early_stopping_rounds=50,
        )

        print(f"\n✓ Training complete! Used {model.tree_count_} of {args.iterations} trees.")
        model_type = "CatBoost (Large Tabular Model)"
        feature_importance = model.get_feature_importance(Pool(X_train, y_train))

    else:
        print("\nInitializing scikit-learn GradientBoostingClassifier...")
        from sklearn.ensemble import GradientBoostingClassifier
        model = GradientBoostingClassifier(
            n_estimators=args.iterations,
            max_depth=8,
            learning_rate=0.05,
            subsample=0.8,
            loss="log_loss",
            random_state=42,
            verbose=10,
        )
        
        print(f"\nTraining GradientBoostingClassifier for {args.iterations} iterations...")
        model.fit(X_train, y_train)
        print(f"✓ Training complete!")
        model_type = "scikit-learn GradientBoostingClassifier"
        feature_importance = model.feature_importances_

    # Save model
    safe_mkdir(args.model_out)
    with open(args.model_out, "wb") as f:
        pickle.dump(model, f)
    print(f"✓ Saved model (pickle) to {args.model_out}")

    # Evaluate on all sets
    print("\nEvaluating model on all splits...")
    report = {
        "model_type": model_type,
        "feature_cols": feature_cols,
        "n_features": len(feature_cols),
        "hyperparameters": {
            "iterations": args.iterations,
            "depth": 8,
            "learning_rate": 0.05,
            "subsample": 0.8,
            "loss_function": "Logloss" if CATBOOST_AVAILABLE else "log_loss",
            "eval_metric": "AUC" if CATBOOST_AVAILABLE else "N/A",
        },
    }

    if X_train is not None:
        report["train_metrics"] = evaluate_model(model, X_train, y_train)
    if X_val is not None:
        report["val_metrics"] = evaluate_model(model, X_val, y_val)
    if X_test is not None:
        report["test_metrics"] = evaluate_model(model, X_test, y_test)

    # Feature importance (already computed above)
    top_features = pd.DataFrame({
        "Feature": feature_cols,
        "Importance": feature_importance
    }).sort_values("Importance", ascending=False).head(10)
    report["top_features"] = top_features.to_dict(orient="records")

    # Save report
    safe_mkdir(args.report_out)
    with open(args.report_out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"✓ Wrote report to {args.report_out}")

    # Print metrics
    print("\n" + "=" * 70)
    print("RESULTS")
    print("=" * 70)
    if "train_metrics" in report:
        print("\nTRAIN METRICS:")
        metrics = report["train_metrics"]
        print(f"  Accuracy:  {metrics['accuracy']:.4f}")
        print(f"  Precision: {metrics['precision']:.4f}")
        print(f"  Recall:    {metrics['recall']:.4f}")
        print(f"  F1 Score:  {metrics['f1']:.4f}")
        print(f"  TP={metrics['tp']}, FP={metrics['fp']}, FN={metrics['fn']}, TN={metrics['tn']}")

    if "val_metrics" in report:
        print("\nVALIDATION METRICS:")
        metrics = report["val_metrics"]
        print(f"  Accuracy:  {metrics['accuracy']:.4f}")
        print(f"  Precision: {metrics['precision']:.4f}")
        print(f"  Recall:    {metrics['recall']:.4f}")
        print(f"  F1 Score:  {metrics['f1']:.4f}")
        print(f"  TP={metrics['tp']}, FP={metrics['fp']}, FN={metrics['fn']}, TN={metrics['tn']}")

    if "test_metrics" in report:
        print("\nTEST METRICS:")
        metrics = report["test_metrics"]
        print(f"  Accuracy:  {metrics['accuracy']:.4f}")
        print(f"  Precision: {metrics['precision']:.4f}")
        print(f"  Recall:    {metrics['recall']:.4f}")
        print(f"  F1 Score:  {metrics['f1']:.4f}")
        print(f"  TP={metrics['tp']}, FP={metrics['fp']}, FN={metrics['fn']}, TN={metrics['tn']}")

    if "top_features" in report:
        print("\nTOP 10 FEATURES (by importance):")
        for i, feat in enumerate(report["top_features"], 1):
            print(f"  {i:2d}. {feat['Feature']:20s} {feat['Importance']:8.4f}")

    print("\n" + "=" * 70)


if __name__ == "__main__":
    main()
