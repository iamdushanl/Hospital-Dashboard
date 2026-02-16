"""Train a Tabuler model (if `tabuler` is installed).

This script is written defensively because different versions of third-party
"tabuler" packages expose different APIs. The script assumes a scikit-learn
style estimator (fit / predict_proba). If the installed `tabuler` provides a
different API, adapt the call in `build_and_train()` accordingly.

Usage:
    python src/models/train_tabuler.py --train data/processed/train.parquet \
        --val data/processed/val.parquet --test data/processed/test.parquet

Outputs:
    - reports/tabuler_model.pkl  (pickled model if it supports pickle)
    - reports/tabuler_report.json (basic metrics)
"""
from __future__ import annotations

import argparse
import json
import math
import os
import pickle
from pathlib import Path

import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


def load_parquet(path: str) -> pd.DataFrame:
    return pd.read_parquet(path)


def safe_mkdir(path: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)


def build_and_train(X_train, y_train, X_val=None, y_val=None):
    """Instantiate a Tabuler model and train it.

    The implementation below tries common entry points. If your installed
    `tabuler` package exposes a different constructor, modify this function.
    """
    try:
        import tabuler
    except Exception as e:
        raise RuntimeError(
            "Could not import 'tabuler'. Install it in your environment: pip install tabuler"
        ) from e

    # Heuristic: look for typical classes / factories
    Model = None
    if hasattr(tabuler, "TabularModel"):
        Model = tabuler.TabularModel
    elif hasattr(tabuler, "Tabuler"):
        Model = tabuler.Tabuler
    elif hasattr(tabuler, "Tabular"):
        Model = tabuler.Tabular

    if Model is None:
        # As a last resort, check if the package exposes an sklearn-compatible API
        if hasattr(tabuler, "fit") or hasattr(tabuler, "train"):
            raise RuntimeError(
                "Found 'tabuler' but couldn't find a standard model class. "
                "Please adapt src/models/train_tabuler.py to your tabuler package's API."
            )

    # Instantiate with sensible defaults if present
    kwargs = {}
    try:
        model = Model(**kwargs)
    except TypeError:
        # If constructor signature differs, just call without args
        model = Model()

    # Fit using sklearn-like API if available
    if hasattr(model, "fit"):
        model.fit(X_train, y_train)
    elif hasattr(model, "train"):
        model.train(X_train, y_train)
    else:
        raise RuntimeError("Tabuler model does not expose `fit` or `train`. Update this script.")

    return model


def evaluate_model(model, X, y_true):
    # Try predict_proba, otherwise predict.
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)
        # If predict_proba returns (n_samples, 2), take column 1.
        if probs.ndim == 2 and probs.shape[1] == 2:
            probs = probs[:, 1]
        y_pred = (probs >= 0.5).astype(int)
    elif hasattr(model, "predict"):
        y_pred = model.predict(X)
        try:
            y_pred = y_pred.astype(int)
        except Exception:
            pass
    else:
        raise RuntimeError("Model has no predict or predict_proba method")

    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)

    return {"accuracy": acc, "precision": prec, "recall": rec, "f1": f1}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--train", required=True)
    parser.add_argument("--val", required=False)
    parser.add_argument("--test", required=False)
    parser.add_argument("--target", default="outcome_readmit")
    parser.add_argument("--model-out", default="reports/tabuler_model.pkl")
    parser.add_argument("--report-out", default="reports/tabuler_report.json")
    args = parser.parse_args()

    train_df = load_parquet(args.train)
    val_df = load_parquet(args.val) if args.val and Path(args.val).exists() else None
    test_df = load_parquet(args.test) if args.test and Path(args.test).exists() else None

    # Features are all columns except the target and identifiers
    exclude = {args.target, "patient_id"}
    feature_cols = [c for c in train_df.columns if c not in exclude]

    X_train = train_df[feature_cols]
    y_train = train_df[args.target].astype(int)

    X_val, y_val = (None, None)
    if val_df is not None:
        X_val = val_df[feature_cols]
        y_val = val_df[args.target].astype(int)

    X_test, y_test = (None, None)
    if test_df is not None:
        X_test = test_df[feature_cols]
        y_test = test_df[args.target].astype(int)

    print("Training Tabuler model (this will fail if tabuler isn't installed or API differs)...")
    model = build_and_train(X_train, y_train, X_val, y_val)

    # Save model
    safe_mkdir(args.model_out)
    try:
        with open(args.model_out, "wb") as f:
            pickle.dump(model, f)
        print(f"Saved model to {args.model_out}")
    except Exception:
        print("Warning: Could not pickle model. It may not be serializable. You can save manually.")

    # Evaluate
    report = {"feature_cols": feature_cols}
    if X_train is not None:
        report["train_metrics"] = evaluate_model(model, X_train, y_train)
    if X_val is not None:
        report["val_metrics"] = evaluate_model(model, X_val, y_val)
    if X_test is not None:
        report["test_metrics"] = evaluate_model(model, X_test, y_test)

    safe_mkdir(args.report_out)
    with open(args.report_out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"Wrote report to {args.report_out}")


if __name__ == "__main__":
    main()
