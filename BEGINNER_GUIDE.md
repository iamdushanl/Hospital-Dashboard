# 🎓 Beginner's Guide to Hospital Data Analytics Pipeline

Welcome! This guide is written for students like you who want to understand how data science pipelines work from start to finish.

## 🎯 What is This Project About?

Imagine you're a hospital manager trying to predict which patients are likely to be readmitted (come back to the hospital after discharge). You have:
- Patient information (age, gender, diagnosis)
- Clinical measurements (lab values)
- Hospital visit history
- Whether they were readmitted or not

**This project shows you how to:**
1. **Extract** patient data from sources (CSV files, databases)
2. **Protect privacy** by removing sensitive information
3. **Explore** the data to find patterns
4. **Engineer features** (create useful information from raw data)
5. **Train models** (teach the computer to predict readmissions)
6. **Visualize** results in an interactive dashboard

## 🏗️ System Architecture (Simple Overview)

Think of the system like an assembly line:

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOSPITAL DATA PIPELINE                       │
└─────────────────────────────────────────────────────────────────┘

Step 1: DATA COLLECTION
├─ CSV files (synthetic data for demo)
├─ Hospital databases (PostgreSQL, MySQL)
└─ FHIR APIs (healthcare data standards)
        ↓
Step 2: DE-IDENTIFICATION (PRIVACY)
├─ Remove patient names & SSNs
├─ Hash patient IDs (make them unrecognizable)
└─ Shift birth dates randomly
        ↓
Step 3: EXPLORATORY DATA ANALYSIS (EDA)
├─ Look at data distribution
├─ Find missing values
├─ Understand demographics
└─ Identify outcome patterns
        ↓
Step 4: FEATURE ENGINEERING
├─ Convert text to numbers
├─ Create new useful variables
├─ Split into train/validation/test
└─ Save as Parquet files
        ↓
Step 5: MODEL TRAINING
├─ Logistic Regression (baseline)
├─ XGBoost (if you install it)
└─ Advanced Models (FT-Transformer, TabPFN)
        ↓
Step 6: EVALUATION & VISUALIZATION
├─ Calculate accuracy, precision, recall
├─ Confusion matrix
└─ Interactive dashboard
```

## 📁 Project Structure Explained

```
hospital-data-pipeline/
│
├── data/                          ← All data files
│   ├── sample/
│   │   └── patients.csv           ← Raw synthetic data (200 records)
│   ├── sample_deid.csv            ← De-identified data
│   └── processed/
│       ├── train.parquet          ← 140 training samples
│       ├── val.parquet            ← 30 validation samples
│       ├── test.parquet           ← 30 test samples
│       └── manifest.json          ← Feature metadata
│
├── scripts/                       ← Standalone data scripts
│   ├── generate_synthetic.py      ← Creates fake patient data
│   └── deidentify_csv.py          ← Removes sensitive info
│
├── src/                           ← Source code (reusable)
│   ├── etl/                       ← Extract, Transform, Load
│   │   ├── extract.py             ← Read data from sources
│   │   ├── dataset_builder.py     ← Create train/val/test splits
│   │   └── deidentify.py          ← Privacy module
│   │
│   ├── models/                    ← Machine learning
│   │   ├── train_baseline.py      ← Logistic regression trainer
│   │   ├── train_xgboost.py       ← (Optional) XGBoost
│   │   └── train_ft_transformer.py ← (Optional) Deep learning
│   │
│   └── utils/                     ← Helper functions
│       └── config.py              ← Load configuration
│
├── notebooks/                     ← Data analysis & exploration
│   └── 01_eda.py                  ← Exploratory data analysis
│
├── dashboard/                     ← Web interface
│   └── app.py                     ← Streamlit interactive app
│
├── reports/                       ← Results & models
│   └── baseline_model.json        ← Trained model weights
│
├── requirements.txt               ← Python dependencies list
├── README.md                      ← Quick start guide
└── BEGINNER_GUIDE.md             ← This file!
```

## 🔍 Understanding Key Concepts

### What is "De-identification"?

**Problem:** Hospital data has sensitive information (patient names, SSNs, addresses). It's illegal to share without permission.

**Solution:** Remove or hide personal information.

**Example:**
```
BEFORE (has PHI - Protected Health Information):
| Name       | SSN        | DOB        | Diagnosis |
| John Smith | 123-45-6789| 1970-01-15 | Diabetes  |

AFTER (de-identified):
| patient_id                   | dob_shifted | Diagnosis |
| a3f7b2e9c4d8f1a6b9c2e5d8... | 1968-03-22  | Diabetes  |
  (SHA256 hash)                  (shifted by ~300 days)
```

**In our code:** `scripts/deidentify_csv.py` does this.

---

### What is "Feature Engineering"?

**Problem:** Raw data isn't always useful for machine learning. Numbers in different scales, categorical data, etc.

**Solution:** Create meaningful features from raw data.

**Example:**
```
RAW DATA:
├─ age: 65 (already a number ✓)
├─ gender: "M" (text ❌)
├─ lab_value: 98.5 (number, but needs scaling ❌)
└─ diagnosis_code: "J18" (text ❌)

ENGINEERED FEATURES:
├─ age: 65 (keep as is)
├─ gender_m: 1 (1=Male, 0=Female)
├─ gender_f: 0
├─ lab_normalized: (98.5 - 100) / 50 = -0.03 (scaled)
├─ diag_j18: 1 (1=has this diagnosis, 0=doesn't)
├─ age_squared: 65²/10000 = 0.4225 (polynomial feature)
└─ ... (more features)
```

**In our code:** `src/etl/dataset_builder.py` does this.

---

### What is "Train/Validation/Test Split"?

**Problem:** If you train and test on the same data, you can't know if the model really works.

**Solution:** Split data into 3 parts:

```
100 samples
    │
    ├─ TRAIN (70) ─────→ Feed to model to learn patterns
    ├─ VAL (15) ───────→ Tune hyperparameters (not used in this project)
    └─ TEST (15) ──────→ Final evaluation (never seen during training)
```

**Why this matters:**
- Training set = Learning
- Test set = Exam (proves you really learned)

---

### What is "Logistic Regression"?

**What it does:** Predicts if something is Yes/No (binary classification).

**Real-world analogy:** Like a doctor asking questions:
- Is the patient's age > 60? → +points toward readmission risk
- Is their lab value abnormal? → +more points
- Is their diagnosis critical? → +even more points

If total points > threshold → Predict "Readmitted"

**In our code:** `src/models/train_baseline.py` implements this.

---

### What is "Accuracy, Precision, Recall, F1"?

Let's say you trained a model to predict readmission. Here's what each metric means:

```
Predictions vs Reality:

                    ┌──────────────────────────┐
                    │   ACTUAL READMITTED      │
                    │ Yes        │ No          │
        ┌───────────┼───────────┼─────────────┤
        │ PRED Yes  │    TP     │     FP      │  True Positive / False Positive
PREDICT │───────────┼───────────┼─────────────┤
        │ PRED No   │    FN     │     TN      │  False Negative / True Negative
        └───────────┴───────────┴─────────────┘

ACCURACY = (TP + TN) / Total
"Out of all predictions, how many were correct?"

PRECISION = TP / (TP + FP)
"Of patients we predicted would be readmitted, how many actually were?"

RECALL = TP / (TP + FN)
"Of patients who were actually readmitted, how many did we catch?"

F1 = 2 × (Precision × Recall) / (Precision + Recall)
"Balanced score between precision and recall"
```

---

## 🚀 How to Run Each Step

### Step 1: Setup
```powershell
# Create isolated Python environment
python -m venv .venv

# Activate it
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

**What's happening?**
- `venv` = Virtual Environment (isolated workspace for this project)
- `requirements.txt` = List of Python libraries needed
- `pip install` = Download and install those libraries

---

### Step 2: Generate Synthetic Data
```powershell
python scripts\generate_synthetic.py --out data\sample\patients.csv --n 200
```

**What happens:**
1. Opens `scripts/generate_synthetic.py`
2. Creates 200 fake patient records with:
   - Demographics (age, gender)
   - Clinical data (diagnosis, lab values)
   - Outcomes (readmitted: yes/no)
3. Saves to `data/sample/patients.csv`

**Output file format:**
```
patient_id,patient_name,ssn,dob,admission_date,...,outcome_readmit
P000001,Jamie Smith,456-12-3456,1962-03-10,...,0
P000002,Alex Taylor,789-34-5678,1980-07-22,...,1
...
```

---

### Step 3: De-identify Data
```powershell
python scripts\deidentify_csv.py \
  --input data\sample\patients.csv \
  --output data\sample_deid.csv \
  --drop-cols patient_name,ssn \
  --hash-cols patient_id \
  --date-cols dob,admission_date,discharge_date \
  --shift-days 365
```

**What this does:**
1. Reads `data/sample/patients.csv`
2. **Drops** (deletes): `patient_name`, `ssn`
3. **Hashes** (encrypts): `patient_id` with SHA256
4. **Shifts** dates randomly: DOB moves by ±365 days
5. Saves result to `data/sample_deid.csv`

**Before vs After:**
```
BEFORE:
patient_name,ssn,dob,patient_id,...
Jamie Smith,456-12-3456,1962-03-10,P000001,...

AFTER:
dob,patient_id,...
1963-08-15,a3f7b2e9c4d8f1a6b9c2e5d8f1a6b9c,...
(name & SSN gone, DOB shifted, ID hashed)
```

---

### Step 4: Exploratory Data Analysis
```powershell
python notebooks\01_eda.py
```

**What it outputs:**
```
Cohort Summary:
- 200 patients
- Age: 52.8 ± 23.1 years (range 14–93)
- Gender: 52.5% M, 47.5% F
- Readmitted: 12.5% (25 patients)
- No missing data

Distribution by diagnosis:
- N18 (kidney disease): 27 patients (13.5%)
- R07 (chest pain): 25 patients (12.5%)
- ...
```

**This helps you understand:**
- Is the data balanced? (Are there enough readmitted patients?)
- Are there missing values?
- What are the demographics?

---

### Step 5: Feature Engineering
```powershell
python src\etl\dataset_builder.py
```

**What happens:**
1. Loads `data/sample_deid.csv`
2. Converts categories to numbers
3. Creates 11 engineered features
4. Splits into:
   - Train (140 samples) → `data/processed/train.parquet`
   - Val (30 samples) → `data/processed/val.parquet`
   - Test (30 samples) → `data/processed/test.parquet`
5. Saves metadata → `data/processed/manifest.json`

**Features created:**
```
Input: age=65, gender="M", lab_value=105

Output features:
├─ age: 65
├─ lab_value: 105
├─ gender_m: 1
├─ gender_f: 0
├─ diag_n18: 0
├─ diag_r07: 1
├─ diag_g47: 0
├─ age_squared: 0.4225
├─ lab_normalized: 0.1
└─ ... (11 total)
```

---

### Step 6: Train Model
```powershell
python src\models\train_baseline.py
```

**What happens:**
1. Loads training data
2. Creates logistic regression model
3. Trains for 100 epochs (iterations)
4. Evaluates on test set
5. Saves model → `reports/baseline_model.json`

**Output:**
```
Train Accuracy: 0.1071 | Precision: 0.1071 | Recall: 1.0 | F1: 0.1935
Val Accuracy:   0.1667 | Precision: 0.1667 | Recall: 1.0 | F1: 0.2857
Test Accuracy:  0.1667 | Precision: 0.1667 | Recall: 1.0 | F1: 0.2857

Current model predicts "readmitted=yes" for everyone (recall=1.0)
This is a baseline - real models would be better!
```

---

### Step 7: Interactive Dashboard
```powershell
streamlit run dashboard\app.py
```

**Opens at:** `http://localhost:8501`

**Features:**
- 📊 Cohort Summary (patient counts, readmission rate)
- 📈 Demographics (age/gender distributions)
- 🔬 Clinical Features (lab values, diagnoses)
- 🤖 Model Performance (metrics, confusion matrix)
- **Filters:** Adjust age, gender, diagnosis to see real-time updates

---

## 📚 Code Walkthrough: Key Files

### 1. `scripts/generate_synthetic.py`

**Purpose:** Create fake patient data for testing

**Key function:**
```python
def generate_row(i: int) -> dict:
    # Pick random first & last name
    first = random.choice(FIRST)
    last = random.choice(LAST)
    
    # Pick random birth date (1930-2005)
    dob = random_date(datetime(1930, 1, 1), datetime(2005, 12, 31)).date()
    
    # Pick random admission date (2019-2025)
    admission = random_date(datetime(2019, 1, 1), datetime(2025, 1, 1)).date()
    
    # Random lab value (normal distribution mean=100, std=30)
    lab = round(random.gauss(100, 30), 1)
    
    # Random outcome: 12% chance of readmission
    readmit = 1 if random.random() < 0.12 else 0
    
    return {
        "patient_id": f"P{i:06d}",      # P000001, P000002, ...
        "dob": dob.isoformat(),
        "lab_value": lab,
        "outcome_readmit": readmit,
        # ... more fields
    }
```

**How to read:**
- `random.choice()` = pick random item from list
- `random.gauss(100, 30)` = normal distribution (bell curve)
- `random.random() < 0.12` = 12% probability

---

### 2. `scripts/deidentify_csv.py`

**Purpose:** Remove sensitive information

**Key function:**
```python
def deidentify(in_path, out_path, drop_cols, hash_cols, date_cols, ...):
    # 1. Load CSV file
    df = pd.read_parquet(in_path)
    
    # 2. Drop sensitive columns (names, SSNs)
    df = df.drop(columns=drop_cols, errors="ignore")
    
    # 3. Hash ID columns (patient_id → unrecognizable string)
    for col in hash_cols:
        df[col] = hash_value(df[col], salt="secret")
    
    # 4. Shift dates randomly
    for col in date_cols:
        offset = rng.randint(-365, 365)  # Random ±365 days
        df[col] = df[col] + timedelta(days=offset)
    
    # 5. Save de-identified data
    df.to_parquet(out_path)
```

**How it works:**
1. **DROP:** Remove name, SSN columns entirely
2. **HASH:** Convert patient ID to unrecognizable hash
3. **SHIFT:** Move dates by random offset (keeps age but hides exact DOB)

---

### 3. `src/etl/dataset_builder.py`

**Purpose:** Create features and train/val/test splits

**Key function:**
```python
def compute_features(rows):
    X = []  # Features (input to model)
    y = []  # Target (what we're predicting)
    
    for row in rows:
        # Convert to numbers
        age = float(row.get("age", 0))
        lab = float(row.get("lab_value", 100))
        
        # One-hot encode gender
        gender_m = 1 if row["gender"] == "M" else 0
        gender_f = 1 if row["gender"] == "F" else 0
        
        # One-hot encode diagnosis
        diag = row["diagnosis_code"]
        diag_n18 = 1 if diag == "N18" else 0
        # ... (more diagnoses)
        
        # Create derived features
        age_sq = age ** 2 / 10000
        lab_norm = (lab - 100) / 50
        
        # Combine all features
        features = {
            "age": age,
            "lab_value": lab,
            "gender_m": gender_m,
            "gender_f": gender_f,
            "diag_n18": diag_n18,
            # ... (11 total)
            "age_squared": age_sq,
            "lab_normalized": lab_norm,
        }
        X.append(features)
        
        # Get target (what we're predicting)
        target = int(row.get("outcome_readmit", 0))
        y.append(target)
    
    return X, y
```

**What this does:**
- Converts text (gender, diagnosis) to numbers
- Scales values (raw lab value → normalized value)
- Creates new features (age² for non-linear patterns)
- Returns 11 features per patient

---

### 4. `src/models/train_baseline.py`

**Purpose:** Train logistic regression

**Key function:**
```python
def sigmoid(z):
    """Convert any number to probability (0-1)"""
    return 1.0 / (1.0 + exp(-z))

def train_logistic_regression(X, y, lr=0.01, epochs=100):
    # Initialize weights randomly
    coef = [0.0] * len(X[0])  # One weight per feature
    intercept = 0.0
    
    # Train for 100 epochs
    for epoch in range(epochs):
        for x, yt in zip(X, y):
            # Prediction = sigmoid(intercept + w1*x1 + w2*x2 + ...)
            z = intercept + sum(c * v for c, v in zip(coef, x))
            pred = sigmoid(z)
            
            # Error = predicted - actual
            error = pred - yt
            
            # Update weights (decrease if error is high)
            intercept -= lr * error
            for i in range(len(coef)):
                coef[i] -= lr * error * x[i]
    
    return coef, intercept
```

**How it works:**
1. Start with random weights
2. For each training sample:
   - Calculate prediction (sigmoid of weighted sum)
   - Calculate error
   - Adjust weights to reduce error
3. Repeat 100 times

---

### 5. `dashboard/app.py`

**Purpose:** Interactive web dashboard using Streamlit

**Key sections:**

```python
# Load data (cached)
@st.cache_data
def load_deid_data():
    # Read CSV file
    df = pd.read_csv("data/sample_deid.csv")
    return df

# Sidebar filters
with st.sidebar:
    age_range = st.slider("Age Range", 0, 100, (20, 80))
    gender = st.multiselect("Gender", ["M", "F"])

# Apply filters
df_filtered = df[df["age"].between(age_range[0], age_range[1])]
df_filtered = df_filtered[df_filtered["gender"].isin(gender)]

# Show metrics
st.metric("Total Patients", len(df_filtered))
st.metric("Readmission Rate", f"{readmit_pct:.1f}%")

# Show charts
fig = px.histogram(df_filtered, x="age", title="Age Distribution")
st.plotly_chart(fig)
```

**What this does:**
- Loads data
- Creates sidebar filters
- Applies filters in real-time
- Shows metrics & charts

---

## 🎓 Learning Path

If you want to understand this deeply, follow this order:

1. **Start here:** Read this guide
2. **Run the pipeline:** Execute each step (generate → deid → eda → features → train)
3. **Explore the data:** Open CSV files in Excel, see what each column means
4. **Read the code:** Start with `scripts/generate_synthetic.py` (simplest)
5. **Understand algorithms:** Learn about logistic regression (online tutorials)
6. **Try modifications:** Change parameters and see what happens
7. **Build advanced models:** Once you understand basics, try XGBoost

---

## 🔧 Common Questions

### Q: What does `random.seed(42)` do?
**A:** Makes randomness reproducible. With seed=42, you always get the same random numbers. Without it, results change every run.

### Q: Why 70/15/15 split?
**A:** Convention. 70% to learn, 15% to tune, 15% to test. Ensures model hasn't just memorized training data.

### Q: What's the difference between accuracy and precision?
**A:** 
- **Accuracy:** Out of all predictions, how many were right?
- **Precision:** Out of predictions of "readmit", how many were actually readmitted?

Example: A model that predicts "readmit=yes" for everyone gets high recall (100%) but low precision (12%).

### Q: Why hash patient IDs?
**A:** Makes it impossible to reverse-engineer who the patient is. Even if someone steals the data, they can't re-identify patients.

### Q: What's a "Parquet" file?
**A:** Efficient format for storing tabular data (like CSV but faster and more compressed). Python/SQL can read it directly.

### Q: Why "tabular models" in the project name?
**A:** Your data is a table (rows = patients, columns = features). "Tabular" means structured table data (not images, not text).

---

## 📖 Next Steps

1. **Run the full pipeline** (takes 2 minutes)
2. **Open the dashboard** and explore
3. **Read individual code files** (start with `generate_synthetic.py`)
4. **Modify parameters:** Change readmission rate, number of patients, etc.
5. **Try advanced models:** Install XGBoost and run `src/models/train_xgboost.py`

---

## 🆘 Need Help?

See:
- `README.md` — Quick start
- `IMPLEMENTATION_SUMMARY.md` — Architecture overview
- Code comments — Detailed explanations in each file
- [Machine Learning Basics](https://www.youtube.com/watch?v=aircAruvnKk) — Andrew Ng's videos

Good luck, and have fun learning! 🚀
