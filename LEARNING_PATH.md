# 📋 Learning Path & Troubleshooting

A structured path to learn this project + solutions for common problems.

---

## Phase 1: Understand the System (30 minutes)

### Learning Goals
- [ ] Understand what the project does
- [ ] Know the overall pipeline
- [ ] Familiarize with file structure

### Tasks

#### 1.1 Read the project overview
```bash
Read: README.md
Time: 5 minutes
Goal: Answer "What is this project trying to do?"
```

#### 1.2 Understand the architecture
```bash
Read: IMPLEMENTATION_SUMMARY.md (Architecture section)
Time: 10 minutes
Goal: Draw the pipeline on paper:
      Raw Data → De-identify → Features → Train → Predict → Dashboard
```

#### 1.3 Explore file structure
```bash
Run: python
     import os
     for root, dirs, files in os.walk('src'):
         level = root.replace('src', '').count(os.sep)
         indent = ' ' * 2 * level
         print(f'{indent}{os.path.basename(root)}/')
         for f in files:
             print(f'{indent}  {f}')

Goal: See how code is organized
```

#### 1.4 Review beginner guide
```bash
Read: BEGINNER_GUIDE.md (Sections 1-3)
Time: 15 minutes
Goal: Understand 7 key concepts
```

**✅ Phase 1 Complete:** You know WHAT the project does and HOW it's structured.

---

## Phase 2: Run the Entire Pipeline (20 minutes)

### Learning Goals
- [ ] Execute all steps successfully
- [ ] See real data being processed
- [ ] Understand data flow

### Tasks

#### 2.1 Generate synthetic data
```bash
cd C:\Users\HP\Documents\Datamining

python scripts/generate_synthetic.py \
    --out data/sample/patients.csv \
    --n 200

Expected output:
  Wrote synthetic CSV: data/sample/patients.csv (200 rows)
  ✓
  
Time: 5 seconds
```

#### 2.2 De-identify the data
```bash
python scripts/deidentify_csv.py \
    --in data/sample/patients.csv \
    --out data/sample_deid.csv

Expected output:
  De-identification summary:
  - Input: 200 rows
  - Output: 200 rows
  - Dropped columns: ['patient_name', 'ssn'] 
  - Hashed columns: ['patient_id']
  - Shifted dates: ['dob', 'admission_date', 'discharge_date']
  ✓

Time: 2 seconds
```

#### 2.3 Explore data with EDA
```bash
python notebooks/01_eda.py

Expected output:
  Cohort Summary
  ==============
  Total patients: 200
  Age: 52.8 ± 23.1 (range 14-93)
  Gender: 52.5% M, 47.5% F
  Readmission rate: 12.5%
  
  [... more statistics ...]
  ✓

Time: 3 seconds
```

#### 2.4 Engineer features
```bash
python src/etl/dataset_builder.py \
    --in data/sample_deid.csv \
    --out data/processed/

Expected output:
  Wrote train set: data/processed/train.parquet (140 rows)
  Wrote val set: data/processed/val.parquet (30 rows)
  Wrote test set: data/processed/test.parquet (30 rows)
  Wrote manifest: data/processed/manifest.json
  ✓

Time: 2 seconds
```

#### 2.5 Train baseline model
```bash
python src/models/train_baseline.py

Expected output:
  Epoch 25/100, Loss: 0.1234
  Epoch 50/100, Loss: 0.0956
  Epoch 75/100, Loss: 0.0823
  Epoch 100/100, Loss: 0.0734
  
  Test Metrics:
  - Accuracy: 0.8333
  - Precision: 0.1667
  - Recall: 1.0000
  - F1: 0.2857
  
  Wrote model: reports/baseline_model.json
  ✓

Time: 5 seconds
```

#### 2.6 Launch dashboard
```bash
streamlit run dashboard\app.py

Expected output:
  ...
  Local URL: http://localhost:8501
  
  Open browser to http://localhost:8501
  Explore the 4 tabs: Cohort Summary, Demographics, Clinical, Model

Time: 10 seconds + open browser
```

**✅ Phase 2 Complete:** Full pipeline runs end-to-end! You've seen data transform at each step.

---

## Phase 3: Understand the Code (1-2 hours)

### Learning Goals
- [ ] Read and understand each module
- [ ] Know what each function does
- [ ] Trace data through the pipeline

### Reading Order

#### 3.1 Data Generation (Beginner)
```
File: scripts/generate_synthetic.py
Time: 15 minutes
Read: CODE_WALKTHROUGH.md → File 1 section

Questions to answer:
- Q: What does random.gauss(100, 30) do?
  A: ___________________ (read the guide!)
  
- Q: Why do we use f-strings like f"P{i:06d}"?
  A: ___________________
  
- Q: What is a "with" statement?
  A: ___________________
```

#### 3.2 De-identification (Beginner-Intermediate)
```
File: scripts/deidentify_csv.py
Time: 10 minutes
Read: CODE_WALKTHROUGH.md → File 2 section

Questions:
- Q: Why hash the patient ID?
  A: ___________________ 
  
- Q: What does date-shifting accomplish?
  A: ___________________
```

#### 3.3 Feature Engineering (Intermediate)
```
File: src/etl/dataset_builder.py
Time: 20 minutes
Read: CODE_WALKTHROUGH.md → File 3 section
      ML_CONCEPTS.md → Sections 2, 8, 9

Questions:
- Q: What is one-hot encoding?
  A: ___________________
  
- Q: Why is 70/15/15 split good?
  A: ___________________
  
- Q: What does "age_sq = age**2 / 10000" do?
  A: ___________________
```

#### 3.4 Model Training (Intermediate-Advanced)
```
File: src/models/train_baseline.py
Time: 25 minutes
Read: CODE_WALKTHROUGH.md → File 4 section
      ML_CONCEPTS.md → Sections 1, 4, 5, 10

Questions:
- Q: What is the sigmoid function?
  A: ___________________
  
- Q: Why do we update weights by "lr * error * feature"?
  A: ___________________
  
- Q: What happens if learning_rate = 0.1 (too high)?
  A: ___________________
  
- Q: What does FP (false positive) mean in our context?
  A: ___________________
```

#### 3.5 Dashboard (Beginner)
```
File: dashboard/app.py
Time: 15 minutes
Read: CODE_WALKTHROUGH.md → File 5 section

Questions:
- Q: What is @st.cache_data for?
  A: ___________________
  
- Q: Why do we use st.multiselect instead of checkbox?
  A: ___________________
  
- Q: How do interactive charts work in Plotly?
  A: ___________________
```

**✅ Phase 3 Complete:** You understand the code structure and key algorithms.

---

## Phase 4: Modify and Experiment (1-2 hours)

### Learning Goals
- [ ] Change parameters and see effects
- [ ] Debug code by adding print statements
- [ ] Understand data flow deeper

### Experiments

#### 4.1 Change synthetic data parameters
```python
# File: scripts/generate_synthetic.py

# EXPERIMENT 1: More patients
# Change: --n 200 → --n 500
python scripts/generate_synthetic.py --out data/big/ --n 500

Expected: 500 patient records
Effect: More data → better model training

# EXPERIMENT 2: Higher readmission rate
# Modify: readmit = 1 if random.random() < 0.12 else 0
#         → readmit = 1 if random.random() < 0.30 else 0

Expected: ~150 readmitted instead of ~25
Effect: Imbalanced data → different model behavior
```

#### 4.2 Change feature engineering
```python
# File: src/etl/dataset_builder.py

# EXPERIMENT 1: Add a new feature
# After line: age_sq = age ** 2 / 10000
# Add:        gender_age_interaction = gender_m * age / 100
#             (does gender and age interact?)

# EXPERIMENT 2: Remove a feature
# Comment out: "diag_other": diag_other,
# Result: Only 10 features instead of 11
# Effect: Model might perform worse (lost information)

# EXPERIMENT 3: Change split ratio
# Change: train_pct=0.7, val_pct=0.15
#      to: train_pct=0.8, val_pct=0.10
# Effect: More training data, less test data (less reliable evaluation)
```

#### 4.3 Change model training parameters
```python
# File: src/models/train_baseline.py

# EXPERIMENT 1: Different learning rate
# Change: lr=0.01 → lr=0.001
# Result: Slower convergence, might not reach optimum in 100 epochs
# Check logs: Epoch 100/100, Loss: 0.0734 (should be smaller)

# EXPERIMENT 2: More training epochs
# Change: epochs=100 → epochs=500
# Result: Model trains longer (5x slower)
# Check logs: Does loss continue to decrease or plateau?

# EXPERIMENT 3: Change prediction threshold
# Change: threshold=0.5 → threshold=0.3
# Result: Predict more readmissions (higher recall, lower precision)
# Check metrics: recall ↑, precision ↓
```

#### 4.4 Debug with print statements
```python
# In scripts/generate_synthetic.py, add:

def generate_row(i):
    # ... existing code ...
    
    # ADD THIS:
    if i <= 3:  # Only print first 3 rows
        print(f"DEBUG: Row {i}")
        print(f"  Name: {name}")
        print(f"  Age: {age}")
        print(f"  Readmitted: {readmit}")
        print()
    
    return { ... }

# Result: See actual values being generated
```

#### 4.5 Explore data in Python REPL
```bash
python

# In Python:
import csv
import json

# Load and inspect data
with open('data/sample_deid.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    
print(f"Total rows: {len(rows)}")
print(f"Columns: {list(rows[0].keys())}")
print(f"First row: {rows[0]}")

# Load model
with open('reports/baseline_model.json') as f:
    model = json.load(f)
    
print(f"Model weights: {model['weights']}")
print(f"Model accuracy: {model['metrics']['accuracy']}")

# Analyze outcomes
outcomes = [int(r['outcome_readmit']) for r in rows]
print(f"Readmission rate: {sum(outcomes) / len(outcomes) * 100:.1f}%")
```

**✅ Phase 4 Complete:** You can modify code and understand the effects!

---

## Phase 5: Extend the Project (2-4 hours)

### Learning Goals
- [ ] Add new functionality
- [ ] Implement a variant model
- [ ] Improve performance

### Extension Ideas

#### 5.1 Add a new feature (Medium difficulty)
```python
# File: src/etl/dataset_builder.py

# Idea: Add "length_of_stay" feature
# Why: Longer stays might indicate more severe illness

def compute_features(rows):
    # ... existing code ...
    
    # Add after other features:
    admission = datetime.fromisoformat(row['admission_date'])
    discharge = datetime.fromisoformat(row['discharge_date'])
    length_of_stay = (discharge - admission).days
    
    features['length_of_stay'] = length_of_stay
```

#### 5.2 Implement XGBoost model (Hard difficulty)
```python
# File: src/models/train_xgboost.py (NEW FILE)

import xgboost as xgb

def train_xgboost(X, y):
    """Train XGBoost (much more powerful than logistic regression)"""
    
    # Convert to XGBoost format
    dtrain = xgb.DMatrix(X, label=y)
    
    # Train
    params = {
        'objective': 'binary:logistic',
        'max_depth': 5,
        'learning_rate': 0.1,
    }
    model = xgb.train(params, dtrain, num_boost_round=100)
    
    return model
```

#### 5.3 Add SHAP explainability (Hard difficulty)
```python
# File: src/models/explain.py (NEW FILE)

import shap

def explain_prediction(X, model):
    """Explain why model made a specific prediction"""
    
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X)
    
    # Visualize
    shap.summary_plot(shap_values, X)
```

#### 5.4 Add unit tests (Medium difficulty)
```python
# File: tests/test_features.py (NEW FILE)

import pytest
from src.etl.dataset_builder import compute_features

def test_feature_count():
    """Verify we create exactly 11 features"""
    rows = [{'age': '65', 'gender': 'M', ...}]
    X, y = compute_features(rows)
    assert len(X[0]) == 11

def test_one_hot_encoding():
    """Verify gender is properly one-hot encoded"""
    rows = [{'gender': 'M'}, {'gender': 'F'}]
    X, y = compute_features(rows)
    assert X[0]['gender_m'] == 1 and X[0]['gender_f'] == 0
```

**✅ Phase 5 Complete:** You've extended the project with your own features!

---

## Troubleshooting Guide

### ❌ Problem: "ModuleNotFoundError: No module named 'pandas'"

**Cause:** pandas not installed

**Solution 1: Check if installed**
```bash
python -c "import pandas; print(pandas.__version__)"
```

**Solution 2: Install**
```bash
pip install pandas numpy scikit-learn
```

**Solution 3: Use venv (recommended)**
```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
python -m pip install -r requirements.txt
```

---

### ❌ Problem: "FileNotFoundError: data/sample/patients.csv"

**Cause:** File doesn't exist (not generated yet)

**Solution:**
```bash
# Step 1: Generate data
python scripts/generate_synthetic.py --out data/sample/patients.csv --n 200

# Step 2: Verify file exists
dir data/sample/

# Step 3: Try again
python scripts/deidentify_csv.py --in data/sample/patients.csv --out data/sample_deid.csv
```

---

### ❌ Problem: "Address already in use" when running dashboard

**Cause:** Another streamlit app is already running on port 8501

**Solution:**
```bash
# Method 1: Kill the background process
# Find the process ID (PID) and kill it
tasklist | findstr streamlit
taskkill /PID 12345

# Method 2: Use different port
streamlit run dashboard\app.py --server.port 8502

# Method 3: Restart computer (nuclear option)
```

---

### ❌ Problem: Dashboard shows "No data loaded"

**Cause:** data/sample_deid.csv missing or broken

**Solution:**
```bash
# Regenerate deidentified data
python scripts/generate_synthetic.py --out data/sample/patients.csv --n 200
python scripts/deidentify_csv.py --in data/sample/patients.csv --out data/sample_deid.csv

# Check file size (should be > 5 KB)
dir data/sample_deid.csv
```

---

### ❌ Problem: Model trains but accuracy is very low (< 50%)

**Cause 1:** Learning rate too high (weights oscillate)
```python
# In src/models/train_baseline.py, reduce:
lr=0.01 → lr=0.001
```

**Cause 2:** Not enough epochs
```python
# Increase:
epochs=100 → epochs=500
```

**Cause 3:** Bad features (not predictive)
```python
# Check correlation between features and outcome
# See if features actually correlate with readmission
```

---

### ❌ Problem: Code runs slow

**Cause 1:** Too much data (100K+ rows)
```bash
# Reduce sample size
python scripts/generate_synthetic.py --n 200
```

**Cause 2:** Dashboard rendering slow
```python
# Check data size
import pandas as pd
df = pd.read_csv('data/sample_deid.csv')
print(len(df), len(df.columns))
# If > 50K rows, filter in sidebar
```

---

## Debugging Checklist

When something breaks:

- [ ] **Read the error message carefully**
  - Exact file/line number?
  - What type of error (FileNotFoundError, TypeError, etc.)?
  
- [ ] **Check prerequisite steps**
  - Was data generated?
  - Was data de-identified?
  - Do all CSV files exist?
  
- [ ] **Add print statements**
  - Print data shapes
  - Print feature names
  - Print predictions
  
- [ ] **Reduce complexity**
  - Smaller dataset (--n 10)
  - Fewer features
  - Fewer epochs
  
- [ ] **Check dependencies**
  - python --version (should be 3.8+)
  - pip list | findstr pandas
  
- [ ] **Search online**
  - Copy exact error to Google
  - Check StackOverflow

---

## Common Questions

### Q: Why do I get different results each time I run the code?

**A:** Some randomness is seeded (reproducible):
- `random.seed(42)` in generate_synthetic.py → same patients each time
- `seed=42` in split_data → same train/val/test each time

Others are randomized:
- Model initializes with random weights
- Each training might converge slightly differently

**To get identical results:**
```python
import random
import numpy as np
random.seed(42)
np.random.seed(42)
```

---

### Q: Why is readmission rate only 12.5%?

**A:** In synthetic data, we set: `readmit = 1 if random.random() < 0.12 else 0`

In real hospitals, rates vary by condition and hospital (2-30%).

**To change:**
```python
# In scripts/generate_synthetic.py
readmit = 1 if random.random() < 0.25 else 0  # 25% readmission
```

---

### Q: What does "test set" accuracy really mean?

**A:** Test accuracy is your model's score on data it never saw during training.

This is the "true" performance number because:
- Training accuracy can be inflated (memorization)
- Test accuracy shows if model generalizes to new patients

**Example:**
```
Training accuracy: 87% (model saw these patients during training)
Test accuracy:     72% (model never saw these patients)

Interpretation: Model memorized training data (overfitting)
Solution: Simplify model, add more training data, or use regularization
```

---

## Next Steps After Learning

1. **Master the existing code** (Phase 1-4)
2. **Add your own features** (Phase 5.1)
3. **Implement XGBoost** (Phase 5.2, if feeling advanced)
4. **Write unit tests** (Phase 5.4, best practice)
5. **Deploy to production** (use Streamlit Cloud, Heroku, or Docker)
6. **Explore advanced topics:**
   - Time series forecasting
   - Multi-class classification
   - Neural networks
   - Reinforcement learning

---

## Resources

**Documentation Files in This Project:**
- `README.md` - Quick start
- `IMPLEMENTATION_SUMMARY.md` - Architecture overview
- `BEGINNER_GUIDE.md` - Concepts and explanations
- `CODE_WALKTHROUGH.md` - Line-by-line code explanation
- `ML_CONCEPTS.md` - Machine learning theory
- `LEARNING_PATH.md` - This file!

**External Resources:**
- ML Concepts: https://www.deeplearningbook.org/
- Python Basics: https://www.python.org/dev/peps/pep-0008/
- Streamlit: https://docs.streamlit.io/
- scikit-learn: https://scikit-learn.org/stable/

Happy learning! 🚀
