# 📖 Code Walkthrough: Line-by-Line Explanation

This guide walks through the actual code with detailed explanations. Read the beginner's guide first.

---

## File 1: `scripts/generate_synthetic.py`

**What it does:** Creates 200 fake patient records for testing.

### Full Code with Annotations

```python
"""Generate a synthetic patients CSV for testing the ETL/deid pipeline."""
# ↑ This is a docstring explaining what the module does

from __future__ import annotations  # Allows newer Python type hints

import argparse      # Parse command-line arguments
import csv           # Read/write CSV files
import os            # File system operations
import random        # Random number generation
from datetime import datetime, timedelta  # Date/time operations


# Configuration: Lists to pick from
FIRST = ["Alex", "Sam", "Jamie", "Taylor", "Jordan", "Casey", "Morgan", "Riley", ...]
LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", ...]
DIAG = ["I10", "E11", "J18", "N18", "M54", "K21", "F32", "G47", "R07", "Z00"]
# ↑ These are diagnosis codes (ICD-10 codes used in hospitals)


def random_date(start: datetime, end: datetime) -> datetime:
    """Generate a random date between start and end.
    
    Example:
        random_date(datetime(2020, 1, 1), datetime(2025, 12, 31))
        → Returns something like datetime(2022, 5, 15)
    """
    delta = end - start  # Number of days between start and end
    # Pick a random day in that range
    return start + timedelta(days=random.randint(0, delta.days))


def generate_row(i: int) -> dict:
    """Generate one synthetic patient record.
    
    Args:
        i: Patient number (1, 2, 3, ... 200)
    
    Returns:
        Dictionary with patient data
    """
    # Pick random names
    first = random.choice(FIRST)  # Pick one name from FIRST list
    last = random.choice(LAST)
    name = f"{first} {last}"  # Combine into full name
    
    # Generate SSN (format: XXX-XX-XXXX)
    ssn = f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}"
    
    # Generate birth date (between 1930 and 2005)
    dob = random_date(datetime(1930, 1, 1), datetime(2005, 12, 31)).date()
    
    # Generate admission date (between 2019 and 2025)
    admission = random_date(datetime(2019, 1, 1), datetime(2025, 1, 1)).date()
    
    # Generate discharge date (1-14 days after admission)
    discharge = admission + timedelta(days=random.randint(1, 14))
    
    # Pick random diagnosis code
    diagnosis = random.choice(DIAG)
    
    # Generate lab value (normally distributed, mean=100, std=30)
    lab = round(random.gauss(100, 30), 1)
    
    # Pick random gender (M or F)
    gender = random.choice(["M", "F"])
    
    # Calculate age (admission year - birth year)
    age = max(0, admission.year - dob.year)
    
    # Generate readmission outcome: 12% probability of readmission
    readmit = 1 if random.random() < 0.12 else 0
    # ↑ random.random() returns float 0.0-1.0
    # ↑ if result < 0.12 (12% chance), set readmit=1, else 0
    
    # Return dictionary with all patient data
    return {
        "patient_id": f"P{i:06d}",        # P000001, P000002, etc.
        "patient_name": name,
        "ssn": ssn,
        "dob": dob.isoformat(),           # Convert date to string: 1950-05-15
        "admission_date": admission.isoformat(),
        "discharge_date": discharge.isoformat(),
        "diagnosis_code": diagnosis,
        "age": age,
        "gender": gender,
        "lab_value": lab,
        "outcome_readmit": readmit,
    }


def main():
    """Main function: Parse arguments and generate CSV."""
    
    # Parse command-line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Output CSV path")
    parser.add_argument("--n", type=int, default=200, help="Number of rows to generate")
    args = parser.parse_args()
    
    # Example: python generate_synthetic.py --out data/patients.csv --n 200
    #          args.out = "data/patients.csv"
    #          args.n = 200
    
    # Create directory if it doesn't exist
    out_dir = os.path.dirname(args.out)  # Get directory path
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)  # Create directory
    
    # List of column names (in order)
    fieldnames = [
        "patient_id",
        "patient_name",
        "ssn",
        "dob",
        "admission_date",
        "discharge_date",
        "diagnosis_code",
        "age",
        "gender",
        "lab_value",
        "outcome_readmit",
    ]
    
    # Open file for writing
    with open(args.out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        
        # Write header row
        writer.writeheader()
        # ↑ Writes: patient_id,patient_name,ssn,...
        
        # Generate N rows
        for i in range(1, args.n + 1):  # 1, 2, 3, ..., 200
            row = generate_row(i)
            writer.writerow(row)
            # ↑ Writes: P000001,Jamie Smith,456-12-3456,...
    
    print(f"Wrote synthetic CSV: {args.out} ({args.n} rows)")


if __name__ == "__main__":
    main()
    # ↑ Runs main() only if this file is executed directly
    # ↑ (not if it's imported as a module)
```

### Key Concepts Explained

#### `random.gauss(100, 30)`
Creates values from a bell curve (normal distribution):
```
95% of values fall within 100 ± 60
Most common values: around 100
Sometimes: 50 or 150 (outliers)
```

#### `f"{first} {last}"` (f-string)
Formats strings with variables:
```python
first = "Alex"
last = "Smith"
f"{first} {last}"  → "Alex Smith"
f"P{i:06d}"        → "P000041" (pad with zeros to 6 digits)
```

#### `with open(...) as f:`
Opens file safely (automatically closes when done):
```python
# Good practice - file closes automatically
with open("file.csv", "w") as f:
    writer = csv.DictWriter(f, fieldnames=[...])
    
# Don't do this - might forget to close
f = open("file.csv", "w")
# ... (if error here, file never closes!)
```

---

## File 2: `scripts/deidentify_csv.py`

**What it does:** Removes sensitive patient information.

### Key Function

```python
def hash_value(v: str, salt: str = "") -> str:
    """Convert a value to an unrecognizable hash.
    
    Example:
        hash_value("P000001", salt="secret")
        → "a3f7b2e9c4d8f1a6b9c2e5d8f1a6b9c2e5d8f1a6b9c2e5d8f1a6b9c2e5d8f1"
    
    Key insight: Same input always produces same hash
                 Different salt = different hash
                 Can't reverse (one-way function)
    """
    if v is None or v == "":
        return ""
    
    key = f"{v}|{salt}".encode("utf-8")  # Combine value and salt, convert to bytes
    return hashlib.sha256(key).hexdigest()  # Compute SHA256 hash


def shift_dates(df, cols, days=365, seed=42):
    """Shift dates by random offset.
    
    Example:
        Original DOB: 1970-05-15
        Shift by ±365 days
        New DOB: 1970-03-22 (shifted by -54 days)
    
    Why? Preserves relative ages but hides exact birth dates
    """
    rng = random.Random(seed)  # Reproducible randomness
    
    for col in cols:
        # Generate random offsets: -365, -364, ..., +365
        offsets = [rng.randint(-days, days) for _ in range(len(df))]
        
        # Add offsets to dates
        df[col] = df[col] + pd.to_timedelta(offsets, unit="D")
    
    return df


def deidentify(in_path, out_path, drop_cols, hash_cols, date_cols, ...):
    """Main de-identification function."""
    
    # Step 1: Load data
    df = pd.read_parquet(in_path)
    
    # Step 2: Drop sensitive columns
    df = df.drop(columns=[c for c in drop_cols if c in df.columns])
    # ↑ For example: drop "patient_name", "ssn"
    
    # Step 3: Hash identifier columns
    for col in hash_cols:
        if col in df.columns:
            df[col] = hash_series(df[col], salt=salt)
    # ↑ For example: hash "patient_id"
    
    # Step 4: Shift date columns
    if date_cols:
        df = shift_dates(df, date_cols, days=shift_days, seed=seed)
    # ↑ For example: shift "dob", "admission_date"
    
    # Step 5: Save de-identified data
    df.to_parquet(out_path, index=False)
    
    print(f"Wrote de-identified data: {out_path} ({len(df)} rows)")
```

### De-Identification Workflow

```
BEFORE:
┌──────────┬──────────────┬───────────┬───────────┐
│ patient_ │ patient_     │ ssn       │ dob       │
│ id       │ name         │           │           │
├──────────┼──────────────┼───────────┼───────────┤
│ P000001  │ Jamie Smith  │ 456-12... │ 1970-05-15│
└──────────┴──────────────┴───────────┴───────────┘
                   ↓ (apply deidentify)
AFTER:
┌──────────────────────────────────────┬───────────┐
│ patient_id                           │ dob       │
├──────────────────────────────────────┼───────────┤
│ a3f7b2e9c4d8...f1a6b9c2e5d8 (hash)   │ 1970-03-22│
└──────────────────────────────────────┴───────────┘
(name & SSN gone) (hashed ID)           (shifted date)
```

---

## File 3: `src/etl/dataset_builder.py`

**What it does:** Create machine learning features and train/val/test splits.

### Feature Engineering

```python
def compute_features(rows):
    """Convert raw data to ML-ready features."""
    X = []  # Feature matrix (input to model)
    y = []  # Target vector (output to predict)
    
    for row in rows:
        # Extract raw values
        age = safe_float(row.get("age", 0))
        lab_value = safe_float(row.get("lab_value", 100))
        
        # One-hot encode gender
        # Why? ML models need numbers, not text
        gender_m = 1 if row.get("gender", "").strip() == "M" else 0
        gender_f = 1 if row.get("gender", "").strip() == "F" else 0
        
        # Example:
        #   gender="M" → gender_m=1, gender_f=0
        #   gender="F" → gender_m=0, gender_f=1
        
        # One-hot encode diagnosis
        diag = row.get("diagnosis_code", "").strip()
        diag_is_n18 = 1 if diag == "N18" else 0  # Kidney disease
        diag_is_r07 = 1 if diag == "R07" else 0  # Chest pain
        diag_is_g47 = 1 if diag == "G47" else 0  # Sleep disorder
        diag_is_j18 = 1 if diag == "J18" else 0  # Pneumonia
        diag_other = 1 if diag not in ["N18", "R07", "G47", "J18"] else 0
        
        # Derived features (engineer new features from existing ones)
        age_sq = age ** 2 / 10000      # Capture non-linear age effects
        lab_normalized = (lab_value - 100) / 50  # Scale to mean=0, std=1
        
        # Why normalization?
        # Age (0-100) and lab value (50-150) have different scales
        # Normalize so they're comparable: (-2, -1, 0, 1, 2)
        
        features = {
            "age": age,                    # 1. Age (in years)
            "lab_value": lab_value,        # 2. Lab value (raw)
            "gender_m": gender_m,          # 3. Is male?
            "gender_f": gender_f,          # 4. Is female?
            "diag_n18": diag_is_n18,       # 5. Has kidney disease?
            "diag_r07": diag_is_r07,       # 6. Has chest pain?
            "diag_g47": diag_is_g47,       # 7. Has sleep disorder?
            "diag_j18": diag_is_j18,       # 8. Has pneumonia?
            "diag_other": diag_other,      # 9. Other diagnosis?
            "age_squared": age_sq,         # 10. Non-linear age
            "lab_normalized": lab_normalized,  # 11. Scaled lab value
        }
        
        X.append(features)
        target = safe_int(row.get("outcome_readmit", 0))
        y.append(target)
    
    return X, y


def split_data(X, y, train_pct=0.7, val_pct=0.15, seed=42):
    """Split data into train/validation/test sets."""
    n = len(X)
    indices = list(range(n))  # [0, 1, 2, ..., 199]
    
    random.Random(seed).shuffle(indices)  # Shuffle: [142, 5, 67, ...]
    
    # Calculate split points
    n_train = int(n * train_pct)   # 200 * 0.70 = 140
    n_val = int(n * val_pct)       # 200 * 0.15 = 30
    # Test = remaining = 30
    
    # Split indices
    train_idx = indices[:n_train]                    # [142, 5, 67, ..., 190]
    val_idx = indices[n_train : n_train + n_val]    # [23, 45, 101, ..., 199]
    test_idx = indices[n_train + n_val :]            # [1, 12, 34, ..., 178]
    
    # Use indices to split data
    train_X = [X[i] for i in train_idx]
    train_y = [y[i] for i in train_idx]
    # Similarly for val and test
    
    return (train_X, train_y), (val_X, val_y), (test_X, test_y)
```

### Train/Val/Test Visualization

```
200 total samples
    │
    ├─ Shuffle with seed=42
    │   [142, 5, 67, ..., 23]
    │
    ├─ Take first 140 → TRAIN
    │   [142, 5, 67, ..., 101]
    │   ↓ Feed to model (it learns from these)
    │
    ├─ Take next 30 → VAL  
    │   [45, 23, 88, ..., 156]
    │   ↓ Check if model overfits (optional in this project)
    │
    └─ Take last 30 → TEST
        [1, 12, 34, ..., 178]
        ↓ Final evaluation (model never sees these during training)
```

---

## File 4: `src/models/train_baseline.py`

**What it does:** Train logistic regression model.

### Training Algorithm

```python
def sigmoid(z):
    """Convert any value to probability (0-1).
    
    Sigmoid curve:
    
        1 │     ─────────
          │    /
        0.5├──/
          │ /
        0 │────────
          └─────────────
           -4  0   4
    
    sigmoid(-4)  = 0.02  (very low probability)
    sigmoid(0)   = 0.50  (neutral)
    sigmoid(4)   = 0.98  (very high probability)
    """
    if z > 100:
        return 1.0
    if z < -100:
        return 0.0
    return 1.0 / (1.0 + math.exp(-z))


def train_logistic_regression(X, y, lr=0.01, epochs=100):
    """Train using Stochastic Gradient Descent (SGD).
    
    Algorithm:
    1. Start with random weights
    2. For each epoch (pass through data):
       - For each sample:
         a. Calculate prediction
         b. Calculate error
         c. Update weights to reduce error
    3. After 100 epochs, return trained weights
    
    Learning rate (lr=0.01):
    - Too high (0.5): Weights jump around, might diverge
    - Too low (0.001): Slow training, might not reach optimum
    - Just right (0.01): Converges smoothly
    """
    
    num_features = len(X[0])  # 11 features
    coef = [0.0] * num_features  # Start with zero weights
    intercept = 0.0
    
    for epoch in range(epochs):  # 1, 2, ..., 100
        total_loss = 0
        
        for x, yt in zip(X, y):
            # ========== Forward Pass ==========
            # Calculate raw score
            z = intercept + sum(c * v for c, v in zip(coef, x))
            #   = intercept + (w1*x1 + w2*x2 + ... + w11*x11)
            
            # Convert to probability
            pred = sigmoid(z)  # Number between 0 and 1
            
            # ========== Calculate Error ==========
            error = pred - yt
            # If: pred=0.9, actual=1 → error=−0.1 (underestimate)
            # If: pred=0.7, actual=0 → error=+0.7 (overestimate)
            
            # ========== Backward Pass (Update Weights) ==========
            # Update intercept: move it opposite to error direction
            intercept -= lr * error
            
            # Update feature weights
            for i in range(num_features):
                # Larger feature value + larger error = larger weight update
                coef[i] -= lr * error * x[i]
            
            total_loss += error ** 2
        
        # Print progress every 25 epochs
        if (epoch + 1) % 25 == 0:
            avg_loss = total_loss / len(X)
            print(f"Epoch {epoch+1}/100, Loss: {avg_loss:.4f}")
    
    return coef, intercept

# Example training:
#
# Initial:    coef = [0, 0, 0, ..., 0],  intercept = 0
# Epoch 1:    coef = [-0.05, 0.02, ...], intercept = 0.01
# Epoch 2:    coef = [-0.08, 0.04, ...], intercept = 0.02
# ...
# Epoch 100:  coef = [-0.12, 0.07, ...], intercept = 0.05
#             (hopefully weights have converged to good values)
```

### Making Predictions

```python
def predict_proba(X, coef, intercept):
    """Given trained weights, make predictions."""
    probs = []
    
    for x in X:
        # Calculate logit (raw score)
        z = intercept + sum(c * v for c, v in zip(coef, x))
        
        # Convert to probability
        prob = sigmoid(z)  # Value between 0 and 1
        
        probs.append(prob)
    
    return probs

# Example:
# Patient 1: age=65, gender_m=1, lab_normalized=0.1, ...
# z = 0.05 + (-0.12)*65 + (0.07)*1 + (0.03)*0.1 + ... = -7.5
# sigmoid(-7.5) = 0.0005
# Prediction: 0.05% chance of readmission (very low)
#
# Patient 2: age=75, gender_m=1, lab_normalized=1.5, ...
# z = 0.05 + (-0.12)*75 + (0.07)*1 + (0.03)*1.5 + ... = 2.3
# sigmoid(2.3) = 0.91
# Prediction: 91% chance of readmission (very high)
```

---

## File 5: `dashboard/app.py`

**What it does:** Interactive web dashboard using Streamlit.

### Key Patterns

```python
# Pattern 1: Caching (load data once, reuse)
@st.cache_data
def load_deid_data():
    """Load CSV, cache result (only runs once)."""
    df = pd.read_csv("data/sample_deid.csv")
    return df

# Without cache: loads file every time dashboard redraws (slow)
# With cache: runs function once, reuses data (fast)


# Pattern 2: Sidebar filters
with st.sidebar:
    # Slider: creates interactive age range picker
    age_range = st.slider("Age Range", 0, 100, (20, 80))
    # Returns: (min_value, max_value)
    
    # Multi-select: allows picking multiple genders
    genders = st.multiselect("Gender", ["M", "F"], default=["M", "F"])
    # Returns: ["M", "F"] or ["M"] or ["F"] or []


# Pattern 3: Apply filters
df_filtered = df[
    (df["age"] >= age_range[0]) &  # Age >= min
    (df["age"] <= age_range[1]) &  # Age <= max
    (df["gender"].isin(genders))   # Gender is selected
]

# Why & not "and"? 
# Python's "and" doesn't work with pandas Series
# & is element-wise AND


# Pattern 4: Display metrics
col1, col2, col3 = st.columns(3)  # Create 3 columns

with col1:
    st.metric("Total Patients", len(df_filtered))
    # Shows: "Total Patients" header, then number below

with col2:
    readmit_rate = df_filtered["outcome_readmit"].sum() / len(df_filtered) * 100
    st.metric("Readmission Rate", f"{readmit_rate:.1f}%")


# Pattern 5: Interactive charts
import plotly.express as px

fig = px.histogram(
    df_filtered,
    x="age",
    nbins=20,
    title="Age Distribution"
)
st.plotly_chart(fig)

# Plotly charts are interactive:
# - Hover to see values
# - Click legend items to toggle
# - Zoom, pan, download as PNG
```

### Dashboard Flow

```
User opens browser
        ↓
Streamlit runs app.py from top to bottom
        ↓
@st.cache_data decorator loads data (first time only)
        ↓
Render sidebar with filters
        ↓
User adjusts filters (age slider, gender select)
        ↓
Streamlit reruns app.py (very fast because data is cached)
        ↓
Apply new filters: df_filtered = df[conditions]
        ↓
Render charts with filtered data
        ↓
Charts update in real-time
        ↓
Repeat as user changes filters
```

---

## Next Steps

1. Open these files in VS Code
2. Read the actual code (not just this guide)
3. Modify variables and understand the effects:
   - Change readmission rate (0.12 → 0.20)
   - Change sample size (200 → 1000)
   - Change learning rate (0.01 → 0.001)
4. Add print statements to debug and understand flow

Happy learning! 📚
