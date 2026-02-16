"""Train TabPFN v2 - Zero-shot Transformer Foundation Model.

TabPFN requires no training - it's pre-trained on millions of synthetic datasets.
Just load and predict!
"""
import numpy as np
import pandas as pd
from pathlib import Path
import json
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report
)

try:
    from tabpfn import TabPFNClassifier
    TABPFN_AVAILABLE = True
except ImportError:
    print("⚠️  TabPFN not installed. Install with: pip install tabpfn")
    TABPFN_AVAILABLE = False


def load_data(data_dir: str = 'data/processed'):
    """Load preprocessed train/val/test data."""
    train = pd.read_parquet(f'{data_dir}/train.parquet')
    val = pd.read_parquet(f'{data_dir}/val.parquet')
    test = pd.read_parquet(f'{data_dir}/test.parquet')
    
    return train, val, test


def prepare_features(df: pd.DataFrame, target_col: str = 'outcome_readmit'):
    """Prepare features and target."""
    # Exclude non-feature columns
    exclude_cols = [target_col, 'patient_id']
    feature_cols = [col for col in df.columns if col not in exclude_cols]
    
    # Select only numeric columns for TabPFN
    X = df[feature_cols].select_dtypes(include=[np.number])
    y = df[target_col].values
    
    # Fill any remaining NaNs
    X = X.fillna(0)
    
    # TabPFN has size limits - ensure we're within them
    max_samples = 10000
    max_features = 500
    
    if len(X) > max_samples:
        print(f"⚠️  Dataset has {len(X)} samples, sampling {max_samples} for TabPFN")
        sample_idx = np.random.choice(len(X), max_samples, replace=False)
        X = X.iloc[sample_idx]
        y = y[sample_idx]
    
    if X.shape[1] > max_features:
        print(f"⚠️  Dataset has {X.shape[1]} features, selecting top {max_features}")
        # Feature selection: use variance as simple heuristic
        variances = X.var()
        top_features = variances.nlargest(max_features).index.tolist()
        X = X[top_features]
    
    return X, y, X.columns.tolist()


def evaluate_model(model, X, y, split_name: str = 'test'):
    """Evaluate model performance."""
    # Predictions
    y_pred = model.predict(X)
    y_pred_proba = model.predict_proba(X)[:, 1]
    
    # Metrics
    acc = accuracy_score(y, y_pred)
    prec = precision_score(y, y_pred, zero_division=0)
    rec = recall_score(y, y_pred, zero_division=0)
    f1 = f1_score(y, y_pred, zero_division=0)
    auc = roc_auc_score(y, y_pred_proba)
    
    # Confusion matrix
    tn, fp, fn, tp = confusion_matrix(y, y_pred).ravel()
    
    metrics = {
        'accuracy': float(acc),
        'precision': float(prec),
        'recall': float(rec),
        'f1': float(f1),
        'auc': float(auc),
        'tn': int(tn),
        'fp': int(fp),
        'fn': int(fn),
        'tp': int(tp)
    }
    
    print(f"\n{split_name.upper()} Metrics:")
    print(f"  Accuracy:  {acc:.4f}")
    print(f"  Precision: {prec:.4f}")
    print(f"  Recall:    {rec:.4f}")
    print(f"  F1 Score:  {f1:.4f}")
    print(f"  AUC:       {auc:.4f}")
    print(f"  Confusion Matrix: TN={tn}, FP={fp}, FN={fn}, TP={tp}")
    
    return metrics


def main():
    """Main training function."""
    if not TABPFN_AVAILABLE:
        print("❌ TabPFN not available. Exiting.")
        return
    
    print("=" * 60)
    print("TabPFN v2 - Zero-Shot Transformer Foundation Model")
    print("=" * 60)
    
    # Load data
    print("\n📂 Loading data...")
    try:
        train_df, val_df, test_df = load_data()
        print(f"  Train: {len(train_df)} samples")
        print(f"  Val:   {len(val_df)} samples")
        print(f"  Test:  {len(test_df)} samples")
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        print("Run dataset_builder.py first to create train/val/test splits.")
        return
    
    # Prepare features
    print("\n🔧 Preparing features...")
    X_train, y_train, feature_cols = prepare_features(train_df)
    X_val, y_val, _ = prepare_features(val_df)
    X_test, y_test, _ = prepare_features(test_df)
    
    print(f"  Features: {len(feature_cols)}")
    print(f"  Train shape: {X_train.shape}")
    print(f"  Val shape:   {X_val.shape}")
    print(f"  Test shape:  {X_test.shape}")
    
    # Initialize TabPFN
    print("\n🚀 Initializing TabPFN...")
    print("  (No training needed - using pre-trained foundation model)")
    
    try:
        model = TabPFNClassifier(
            device='cpu',  # Use 'cuda' if GPU available
            N_ensemble_configurations=32,  # Number of ensemble members
        )
        print("  ✓ TabPFN initialized")
    except Exception as e:
        print(f"❌ Error initializing TabPFN: {e}")
        return
    
    # "Training" (really just fitting the data for predictions)
    print("\n📊 Fitting TabPFN...")
    try:
        model.fit(X_train.values, y_train)
        print("  ✓ Model fitted")
    except Exception as e:
        print(f"❌ Error fitting model: {e}")
        return
    
    # Evaluate
    print("\n📈 Evaluating model performance...")
    train_metrics = evaluate_model(model, X_train, y_train, 'train')
    val_metrics = evaluate_model(model, X_val, y_val, 'validation')
    test_metrics = evaluate_model(model, X_test, y_test, 'test')
    
    # Save model
    print("\n💾 Saving model...")
    reports_dir = Path('reports')
    reports_dir.mkdir(exist_ok=True)
    
    model_path = reports_dir / 'tabpfn_model.pkl'
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"  ✓ Model saved to {model_path}")
    
    # Save metrics report
    report = {
        'model_type': 'TabPFN v2',
        'model_description': 'Zero-shot transformer foundation model for tabular data',
        'n_features': len(feature_cols),
        'feature_cols': feature_cols,
        'train_samples': len(X_train),
        'val_samples': len(X_val),
        'test_samples': len(X_test),
        'train_metrics': train_metrics,
        'val_metrics': val_metrics,
        'test_metrics': test_metrics,
    }
    
    report_path = reports_dir / 'tabpfn_report.json'
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)
    print(f"  ✓ Report saved to {report_path}")
    
    print("\n" + "=" * 60)
    print("✅ TabPFN Training Complete!")
    print("=" * 60)
    print(f"\n🎯 Test AUC: {test_metrics['auc']:.4f}")
    print(f"   Expected: 0.85-0.90 for this model")
    
    if test_metrics['auc'] >= 0.85:
        print("   ✓ Excellent performance! 🎉")
    elif test_metrics['auc'] >= 0.80:
        print("   ✓ Good performance")
    else:
        print("   ⚠️  Lower than expected - check data quality")


if __name__ == '__main__':
    main()
