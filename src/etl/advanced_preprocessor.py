"""Advanced Preprocessing for Large Tabular Models.

Sophisticated feature engineering optimized for TabPFN, CatBoost, XGBoost,
FT-Transformer, and TabNet models.
"""
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.impute import KNNImputer
from sklearn.feature_selection import mutual_info_classif
from typing import Dict, List, Tuple, Optional


class AdvancedPreprocessor:
    """Advanced preprocessing pipeline for large tabular models."""
    
    def __init__(self, target_col: str = 'outcome_readmit'):
        self.target_col = target_col
        self.scaler = RobustScaler()  # Robust to outliers
        self.imputer = KNNImputer(n_neighbors=5)
        self.feature_importances = {}
        self.categorical_cols = []
        self.numerical_cols = []
        
    def create_temporal_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create temporal features from dates."""
        result = df.copy()
        
        # Check if date columns exist
        date_cols = [col for col in df.columns if 'date' in col.lower()]
        
        for col in date_cols:
            if col in df.columns:
                try:
                    dates = pd.to_datetime(df[col], errors='coerce')
                    result[f'{col}_day_of_week'] = dates.dt.dayofweek
                    result[f'{col}_month'] = dates.dt.month
                    result[f'{col}_quarter'] = dates.dt.quarter
                    result[f'{col}_is_weekend'] = (dates.dt.dayofweek >= 5).astype(int)
                except Exception:
                    pass
        
        # Calculate age from DOB if it exists
        if 'dob' in df.columns:
            try:
                dob = pd.to_datetime(df['dob'], errors='coerce')
                # If admission_date exists, calculate age at admission
                if 'admission_date' in df.columns:
                    admission = pd.to_datetime(df['admission_date'], errors='coerce')
                    result['age_at_admission'] = ((admission - dob).dt.days / 365.25).round(1)
            except Exception:
                pass
                
        return result
    
    def create_interaction_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create polynomial interaction features."""
        result = df.copy()
        
        # Age-based interactions (if age exists)
        if 'age' in df.columns:
            result['age_squared'] = df['age'] ** 2
            result['age_log'] = np.log1p(df['age'])
            
            # Age × lab values
            if 'lab_value' in df.columns:
                result['age_x_lab'] = df['age'] * df['lab_value']
        
        # Lab value transformations
        if 'lab_value' in df.columns:
            result['lab_value_squared'] = df['lab_value'] ** 2
            result['lab_value_log'] = np.log1p(np.abs(df['lab_value']))
            result['lab_value_sqrt'] = np.sqrt(np.abs(df['lab_value']))
        
        return result
    
    def create_aggregate_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create aggregate features by groups."""
        result = df.copy()
        
        # Diagnosis-based aggregates
        if 'diagnosis_code' in df.columns and 'lab_value' in df.columns:
            diag_stats = df.groupby('diagnosis_code')['lab_value'].agg([
                ('diag_mean_lab', 'mean'),
                ('diag_std_lab', 'std'),
                ('diag_count', 'size')
            ]).reset_index()
            
            result = result.merge(diag_stats, on='diagnosis_code', how='left')
            result['lab_value_vs_diag_mean'] = result['lab_value'] - result['diag_mean_lab']
        
        # Gender-based aggregates  
        if 'gender' in df.columns and 'age' in df.columns:
            gender_stats = df.groupby('gender')['age'].agg([
                ('gender_mean_age', 'mean'),
                ('gender_std_age', 'std')
            ]).reset_index()
            
            result = result.merge(gender_stats, on='gender', how='left')
            result['age_vs_gender_mean'] = result['age'] - result['gender_mean_age']
        
        return result
    
    def encode_categorical(self, df: pd.DataFrame, train: bool = True) -> pd.DataFrame:
        """Target encoding for categorical variables."""
        result = df.copy()
        
        # Identify categorical columns
        cat_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
        
        # Exclude target column
        if self.target_col in cat_cols:
            cat_cols.remove(self.target_col)
        
        self.categorical_cols = cat_cols
        
        for col in cat_cols:
            if col in df.columns:
                # Simple frequency encoding (works without target)
                freq = df[col].value_counts(normalize=True).to_dict()
                result[f'{col}_freq'] = df[col].map(freq).fillna(0)
                
                # Convert to category code
                result[f'{col}_code'] = pd.Categorical(df[col]).codes
        
        return result
    
    def handle_outliers(self, df: pd.DataFrame) -> pd.DataFrame:
        """Handle outliers using IQR method."""
        result = df.copy()
        
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        # Exclude target column
        if self.target_col in numeric_cols:
            numeric_cols.remove(self.target_col)
        
        for col in numeric_cols:
            if col in df.columns:
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                
                lower = Q1 - 3 * IQR
                upper = Q3 + 3 * IQR
                
                # Clip outliers
                result[col] = df[col].clip(lower=lower, upper=upper)
        
        return result
    
    def impute_missing(self, df: pd.DataFrame, train: bool = True) -> pd.DataFrame:
        """Impute missing values using KNN."""
        result = df.copy()
        
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if len(numeric_cols) > 0:
            if train:
                result[numeric_cols] = self.imputer.fit_transform(df[numeric_cols])
            else:
                result[numeric_cols] = self.imputer.transform(df[numeric_cols])
        
        return result
    
    def scale_features(self, df: pd.DataFrame, train: bool = True) -> pd.DataFrame:
        """Scale numerical features using RobustScaler."""
        result = df.copy()
        
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        # Exclude target and ID columns
        exclude = [self.target_col, 'patient_id']
        numeric_cols = [col for col in numeric_cols if col not in exclude]
        
        self.numerical_cols = numeric_cols
        
        if len(numeric_cols) > 0:
            if train:
                result[numeric_cols] = self.scaler.fit_transform(df[numeric_cols])
            else:
                result[numeric_cols] = self.scaler.transform(df[numeric_cols])
        
        return result
    
    def select_features(self, df: pd.DataFrame, y: pd.Series, top_k: int = 100) -> List[str]:
        """Select top K features using mutual information."""
        # Get feature columns
        feature_cols = [col for col in df.columns 
                       if col != self.target_col and col != 'patient_id']
        
        # Calculate mutual information
        X = df[feature_cols].select_dtypes(include=[np.number])
        
        if len(X.columns) == 0:
            return feature_cols
        
        mi_scores = mutual_info_classif(X, y, random_state=42)
        
        # Store feature importances
        self.feature_importances = dict(zip(X.columns, mi_scores))
        
        # Sort and select top K
        sorted_features = sorted(self.feature_importances.items(), 
                                key=lambda x: x[1], reverse=True)
        
        top_features = [feat for feat, score in sorted_features[:top_k]]
        
        return top_features
    
    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """Complete preprocessing pipeline (for training data)."""
        result = df.copy()
        
        print("Step 1/7: Creating temporal features...")
        result = self.create_temporal_features(result)
        
        print("Step 2/7: Creating interaction features...")
        result = self.create_interaction_features(result)
        
        print("Step 3/7: Creating aggregate features...")
        result = self.create_aggregate_features(result)
        
        print("Step 4/7: Encoding categorical features...")
        result = self.encode_categorical(result, train=True)
        
        print("Step 5/7: Handling outliers...")
        result = self.handle_outliers(result)
        
        print("Step 6/7: Imputing missing values...")
        result = self.impute_missing(result, train=True)
        
        print("Step 7/7: Scaling features...")
        result = self.scale_features(result, train=True)
        
        print(f"✓ Preprocessing complete! Shape: {result.shape}")
        
        return result
    
    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform new data using fitted preprocessor (for test data)."""
        result = df.copy()
        
        result = self.create_temporal_features(result)
        result = self.create_interaction_features(result)
        result = self.create_aggregate_features(result)
        result = self.encode_categorical(result, train=False)
        result = self.handle_outliers(result)
        result = self.impute_missing(result, train=False)
        result = self.scale_features(result, train=False)
        
        return result


if __name__ == '__main__':
    # Example usage
    import sys
    from pathlib import Path
    
    # Load de-identified data
    data_path = Path('data/sample_deid.csv')
    
    if not data_path.exists():
        print(f"Error: {data_path} not found. Run generate_synthetic.py first.")
        sys.exit(1)
    
    # Load data
    df = pd.read_csv(data_path)
    print(f"Loaded {len(df)} patients")
    
    # Initialize preprocessor
    preprocessor = AdvancedPreprocessor(target_col='outcome_readmit')
    
    # Preprocess
    df_processed = preprocessor.fit_transform(df)
    
    # Save processed data
    output_path = Path('data/processed_advanced.csv')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df_processed.to_csv(output_path, index=False)
    
    print(f"\n✓ Saved processed data to {output_path}")
    print(f"  Original features: {len(df.columns)}")
    print(f"  Enhanced features: {len(df_processed.columns)}")
    print(f"  Feature gain: +{len(df_processed.columns) - len(df.columns)}")
