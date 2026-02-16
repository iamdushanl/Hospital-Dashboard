# 🤖 Machine Learning Concepts Guide

A beginner-friendly explanation of ML concepts used in this project.

---

## 1. Classification vs Regression

### Classification
**Task:** Predict a category (yes/no, cat/dog, spam/not-spam)

```
Input:  Age=65, Gender=M, Lab=120, Diagnosis=Heart Disease
        ↓
Model:  "Is this patient likely to be readmitted?"
        ↓
Output: YES (1) or NO (0)
```

**Our project uses classification:**
- **Target:** Readmission (Yes/No)
- **Prediction:** Probability that patient will be readmitted

### Regression
**Task:** Predict a number (price, temperature, rainfall)

```
Input:  House size, location, age
        ↓
Model:  "What is the house price?"
        ↓
Output: $450,000.50
```

We could use regression to predict "length of stay" (5.3 days), but our project focuses on classification.

---

## 2. Features (Inputs)

**Feature:** Any data about a patient that helps predict readmission.

### Raw Features (Data as-is)
```
age: 65 years
gender: M
diagnosis_code: I10
lab_value: 120
```

### Engineered Features (Created from raw data)
```
age_squared: 65² = 4,225
            Useful for models with non-linear patterns
            (e.g., very old patients might have different risk than young)

lab_normalized: (120 - 100) / 50 = 0.4
                Scaled to help model learn better
                (prevents age (0-100) from overpowering lab (50-150))

gender_m: 1    (is male?)
gender_f: 0    (is female?)
          These are "one-hot" encoded (only one is 1, rest are 0)
```

### Why Engineer Features?

```
Raw data:
┌─────┬────────┬─────┐
│ age │ gender │ lab │
├─────┼────────┼─────┤
│ 65  │   M    │ 120 │
│ 32  │   F    │  85 │
│ 78  │   M    │ 145 │
└─────┴────────┴─────┘

Model sees: "I have 3 numbers (65, M, 120)"
            But "M" is text! Model needs numbers!

After engineering:
┌─────┬──────────┬────────┬──────────┬─┬─────────────┐
│ age │ lab_norm │ gender │ age_sq   │ │ ... (more)  │
├─────┼──────────┼────────┼──────────┼─┼─────────────┤
│ 65  │    0.4   │   1    │   0.424  │ │  ...        │
│ 32  │   -0.3   │   0    │   0.102  │ │  ...        │
│ 78  │    0.9   │   1    │   0.608  │ │  ...        │
└─────┴──────────┴────────┴──────────┴─┴─────────────┘

Now model has:
✓ All numeric values
✓ Normalized scales
✓ Domain knowledge (age squared captures non-linearity)
✓ Categorical data encoded properly
```

---

## 3. Training, Validation, and Testing

### The Problem: Overfitting

```
Scenario: Training on 200 patients, testing on the same 200

Model might "memorize" patterns:
- "P000042 always gets readmitted → predict readmit for them"
- "Patient with age=73 had readmission before (maybe again?)"

High training accuracy: 98%
But on new patients: 60% accuracy (pattern doesn't generalize!)
```

### The Solution: Train/Val/Test Split

```
200 total patients
│
├─ 140 TRAIN
│  └─ Model learns from these
│
├─ 30 VAL (optional)
│  └─ Check if model is overfitting
│     If train=98%, val=60% → OVERFITTING!
│
└─ 30 TEST
   └─ Final evaluation on completely unseen data
      This is the "true" performance metric
```

### Analogy: Studying for an Exam

```
TRAIN set = Textbook + homework problems
            Read and practice until you understand

VAL set   = Practice exam (same topics)
            Check: "Am I ready for the real exam?"
            If practice score ≠ homework score → I'm just memorizing!

TEST set  = Real exam
            Never seen before, but same topics
            This is what matters for your grade
```

### In Our Project

```python
# Split 200 patients reproducibly
random.seed(42)  # Same seed → same split every time

train_idx = [142, 5, 67, ...]    # 140 patients
val_idx   = [23, 45, 101, ...]   # 30 patients
test_idx  = [1, 12, 34, ...]     # 30 patients

# Train on train_idx
weights = train_logistic_regression(train_X, train_y)

# Evaluate on test_idx (never trained on these!)
test_pred = predict(test_X, weights)
accuracy = compute_accuracy(test_pred, test_y)
```

---

## 4. Logistic Regression

**What it does:** Predicts probability of an outcome (0-1)

### The Math (Simplified)

#### Step 1: Weighted Sum
```
z = intercept + (w1 × x1) + (w2 × x2) + ... + (w11 × x11)

Examples:
       age  gender_m  lab_norm  diag_heart  age_sq    ...
x  = [ 65,    1,       0.4,       1,      0.42,  ...]

w  = [-0.05,  0.10, 0.03, 0.50, -0.01, ...]
      (weights learned during training)

z = 0.05 + (-0.05)(65) + (0.10)(1) + (0.03)(0.4) + (0.50)(1) + ...
  = 0.05 - 3.25 + 0.10 + 0.012 + 0.50 + ...
  = -2.588 (raw score, can be any number)
```

#### Step 2: Apply Sigmoid
```
        1
sigmoid(z) = ────────────── 
            1 + e^(-z)

sigmoid(-2.588) = 1 / (1 + e^2.588)
                = 1 / (1 + 13.3)
                = 1 / 14.3
                = 0.070 (7% probability of readmission)

This converts raw score to probability (0-1)!
```

### Visual: How Weights Affect Predictions

```
What weights say:

w_age = -0.05      "Older patients (age++) → lower risk (z--)"
                   Each year of age decreases risk slightly

w_gender_m = 0.10  "Male patients → higher risk"
                   Men have slightly higher readmission rate

w_lab_norm = 0.03  "Higher lab values → slightly higher risk"

w_diag_heart = 0.50  "Heart disease diagnosis → much higher risk!"
                     This has the biggest impact
```

### Training: Learn the Weights

```
Goal: Adjust w1, w2, ..., w11 to minimize prediction errors

Start:   w = [0, 0, 0, ..., 0]  (neutral, no knowledge)
         
Sample 1: age=65, actual=readmit=NO (y=0)
- Predict: sigmoid(-2.588) = 0.07 (7% chance)
- Error: 0.07 - 0 = 0.07 (I predicted 7% but actual is 0%)
- Update: w_age += -lr × error × age
         = -0.05 + (-0.01) × 0.07 × 65
         = -0.05 - 0.0455
         = -0.0955 (becomes more negative)
         
         (This means: increase penalty for old age)

After epoch 1: w ≈ [-0.0955, 0.087, ..., -0.002]
After epoch 50: w ≈ [-0.0512, 0.105, ...,  0.003]
After epoch 100: w ≈ [-0.0198, 0.098, ..., -0.001]  ← converged
```

### In Our Project

```python
# Matrix form (cleaner)
# X = features matrix     (200 samples × 11 features)
# y = outcomes vector     (200 samples × 1)
# w = weights vector      (11 features × 1)

# Prediction equation
y_pred = sigmoid(X @ w)  # @ is matrix multiplication
         # X (200x11) @ w (11x1) = (200x1) predictions

# Loss
error = y_pred - y  # (200x1) vector of errors

# Update
w = w - lr × error @ X.T  # lr=0.01, X.T transposes X
```

---

## 5. Model Evaluation Metrics

### Accuracy (Simple but Misleading)

```
Correct predictions / Total predictions

              TP + TN
Accuracy = ──────────
           TP+FP+FN+TN

Example: 25 readmitted, 175 not readmitted

Dummy model: "Always predict NOT readmitted"
- Correct: 175/200 = 87.5% accuracy!
- But useless: never detects actual readmissions!

Don't use accuracy alone!
```

### Confusion Matrix

```
                 Predicted: YES   Predicted: NO
Actual: YES   │     TP            FN
              │    (5)           (0)      True Positive: Correctly predicted readmission
              │                           False Negative: "False alarm averted" (missed readmission)
              
Actual: NO    │     FP            TN
              │    (25)          (170)    False Positive: Wrongly predicted readmission
              │                           True Negative: Correctly predicted non-readmission

TP (5)  = "Person will readmit, we predicted readmit" ✓ Good
FP (25) = "Person won't readmit, we predicted readmit" ✗ False alarm
FN (0)  = "Person will readmit, we predicted no readmit" ✗ Missed dangerous case!
TN (170)= "Person won't readmit, we predicted no readmit" ✓ Good
```

### Precision

```
              TP
Precision = ──────  (Of predicted readmissions, how many are correct?)
            TP + FP

In our model:  5 / (5+25) = 5/30 = 16.7%

Meaning: When we predict readmission, only 17% of the time are we right.
         83% of our readmission predictions are false alarms.

Use when: False alarms are expensive (unnecessary monitoring)
```

### Recall (Sensitivity)

```
            TP
Recall = ──────  (Of actual readmissions, how many do we catch?)
         TP + FN

In our model:  5 / (5+0) = 5/5 = 100%

Meaning: We catch all actual readmissions.
         But we also sound many false alarms.

Use when: Missing cases is dangerous (preventive care)
```

### F1 Score

```
              2 × Precision × Recall
F1 = ──────────────────────────────
      Precision + Recall

     2 × 0.167 × 1.0
   = ───────────────
     0.167 + 1.0
   = 0.285 (28.5%)

Meaning: Harmonic mean of precision and recall
         Useful when you care about both false alarms AND missed cases
```

### In Our Project

```python
TP = 5   (correctly predicted readmissions)
FP = 25  (false alarms)
FN = 0   (missed readmissions)
TN = 170 (correctly predicted non-readmissions)

accuracy  = (5 + 170) / 200 = 87.5%
precision = 5 / 30 = 16.7%
recall    = 5 / 5 = 100%
F1        = 28.5%

Interpretation:
- Accuracy is high (87.5%) but misleading (dummy model also gets 87.5%)
- Recall is perfect (100%) → we catch all readmission cases
- Precision is low (16.7%) → many false alarms
- Trade-off: Catch all cases but create noise

Next step: Improve precision by tweaking threshold
```

---

## 6. Threshold Selection

### The Threshold Problem

```
Our model outputs probabilities: 0.02, 0.45, 0.71, 0.88, ...

How do we convert to YES/NO?

Option A: threshold = 0.5 (default)
├─ If prob >= 0.5 → predict YES
└─ If prob < 0.5 → predict NO

Option B: threshold = 0.3 (more sensitive)
├─ If prob >= 0.3 → predict YES
└─ If prob < 0.3 → predict NO

Option C: threshold = 0.8 (less sensitive)
├─ If prob >= 0.8 → predict YES
└─ If prob < 0.8 → predict NO
```

### Effect on Metrics

```
threshold = 0.8 (very strict):
├─ Few predictions of YES
├─ Recall LOW (miss many cases)
└─ Precision HIGH (confident about predictions)

threshold = 0.5 (balanced):
├─ Balanced predictions
├─ Recall MEDIUM
└─ Precision MEDIUM

threshold = 0.1 (very loose):
├─ Many predictions of YES
├─ Recall HIGH (catch most cases)
└─ Precision LOW (many false alarms)
```

### ROC Curve

```
Shows all threshold options:

       1 │          ╱─ (threshold=0.1)
Recall  │        ╱  
       │      ╱─ (threshold=0.5)
     0 │  ───╱
       │─────────────────────
       0               1
            False Positive Rate
       
Interpretation:
- Top-left corner: High recall (catch cases) + Low false alarms (ideal!)
- Bottom-right corner: Low recall (miss cases) + High false alarms (useless)
- Diagonal line: Random guessing
- Area under curve (AUC): 0.5 (random) to 1.0 (perfect)
```

---

## 7. Underfitting vs Overfitting

### The Learning Curve Story

```
Model training on epochs:

Epoch 1:   train_loss=0.50, test_loss=0.48   ← Good
           [Gap=0.02, small overfitting]

Epoch 10:  train_loss=0.30, test_loss=0.32   ← Still good
           [Gap=0.02, still small]

Epoch 50:  train_loss=0.05, test_loss=0.40   ← Bad!
           [Gap=0.35, massive overfitting]

Epoch 100: train_loss=0.001, test_loss=0.50  ← Terrible!
           [Gap=0.499, model memorized training]
```

### Visualization

```
UNDERFITTING:  Model too simple
           y
           │      ✓ ✓        ✓ = data points
           │  \_____/        ─ = model fit
           │    (bad fit)    Model not capturing pattern
           ├─────────────

GOOD FIT:      Model just right
           y
           │    ✓       ✓
           │   ╱ ╲     ╱ ╲
           │  ╱   ╲___╱   ╲
           │ ╱            ╲
           ├─────────────

OVERFITTING:   Model too complex
           y
           │ ✓╲ ╱✓╲ ╱✓
           │  ╲╱  ╲╱  ╱
           │        ╲╱
           ├─────────────
           (memorizes training noise)
```

### Solutions

```
Underfitting?
├─ Add more features (age_squared, interactions)
├─ Use more complex model (decision trees instead of logistic regression)
└─ Train longer (more epochs)

Overfitting?
├─ Remove features (feature selection)
├─ Use simpler model
├─ Add regularization (L1/L2 penalties)
└─ Get more training data
```

---

## 8. One-Hot Encoding (Categorical Variables)

### The Problem

```
Gender: M (male), F (female)

Can't use: 0 = M, 1 = F
Why? Model thinks F > M (wrong order!)
     What if gender = 2? (doesn't exist)
```

### The Solution: One-Hot Encoding

```
Original:
┌────────┐
│ M      │
│ F      │
│ M      │
└────────┘

After one-hot encoding:
┌────────┬────────┐
│ gender_m│ gender_f│
├────────┼────────┤
│   1    │   0    │  (M = 1, 0)
│   0    │   1    │  (F = 0, 1)
│   1    │   0    │
└────────┴────────┘

Key: Exactly one column is 1, rest are 0
     Model learns separate weight for each category
```

### In Our Project

```python
DIAG_CODES = ["N18", "R07", "G47", "J18", "others"]

# Before
diagnosis_code = "N18" (string, can't use in model)

# After
diag_n18 = 1 (is N18?)
diag_r07 = 0 (is R07?)
diag_g47 = 0 (is G47?)
diag_j18 = 0 (is J18?)
diag_other = 0 (other?)

# Model learns:
# w_diag_n18 = 0.30 (N18 → higher readmission risk)
# w_diag_j18 = 0.45 (J18 → even higher risk!)
```

---

## 9. Normalization and Scaling

### The Problem

```
Feature scales vary:
├─ age: 0–100 years
├─ lab_value: 50–150
├─ gender: 0–1 (boolean)
├─ age_squared: 0–10,000

Raw model:
z = w1×age + w2×lab + w3×gender + w4×age²
  = w1×(big number) + w2(medium) + w3(small) + w4(huge!)

Problem: age² dominates (it's huge!)
         Model might ignore other features
         Weights become hard to interpret
```

### Solution: Min-Max Normalization

```
                value - min
normalized = ──────────────
              max - min

Example (age):
   age=65, min=14, max=93
   = (65 - 14) / (93 - 14)
   = 51 / 79
   = 0.645 (between 0 and 1)

Now all features are 0–1 scale!
```

### Alternative: Z-Score Normalization

```
                value - mean
normalized = ─────────────
              standard_dev

Example (age):
   age=65, mean=52.8, std=23.1
   = (65 - 52.8) / 23.1
   = 12.2 / 23.1
   = 0.528 (usually between -2 and 2)

Now all features have mean=0, std=1
```

### In Our Project

```python
lab_normalized = (lab_value - 100) / 50

# lab=100 → normalized=0 (mean)
# lab=150 → normalized=1 (upper bound)
# lab=50  → normalized=-1 (lower bound)

# All features roughly comparable scale now
```

---

## 10. Learning Rate

**Learning rate (lr):** How much to adjust weights each update

### Too High (lr=0.5)

```
Loss curve (trying to minimize):

     Loss
      │     ∞ (explodes!)
      │      │\
      │      │ \__
      │  __╱  
      └─────────────
        Epochs

Model can't converge (keeps jumping over minimum)
```

### Too Low (lr=0.001)

```
Loss curve:

     Loss
      │
      │    ────────── (creeps down slowly)
      │   ╱
      │╱
      └──────────────────
        Epochs

Model learns so slowly, might not reach minimum
(or takes 1000 epochs instead of 100)
```

### Just Right (lr=0.01)

```
Loss curve:

     Loss
      │
      │  ╱───
      │ ╱
      │╱
      └──────────────
        Epochs

Smooth convergence, reaches minimum efficiently
```

### In Our Project

```python
def train(..., lr=0.01, epochs=100):
    # Each epoch: weight update = -lr × error × feature
    #            = -0.01 × error × feature
    #            Small step towards minimum
```

---

## Review Checklist

After reading this guide, you should understand:

- [ ] Classification vs Regression
- [ ] What features are and why we engineer them
- [ ] Train/Val/Test split and why we need it
- [ ] How logistic regression makes predictions
- [ ] What TP/FP/FN/TN mean
- [ ] Precision vs Recall (and when to use each)
- [ ] Why accuracy alone is misleading
- [ ] Overfitting and how to detect it
- [ ] One-hot encoding for categorical variables
- [ ] Why we normalize features
- [ ] How learning rate affects training

✅ If you checked all boxes, you're ready to modify code and experiment!

---

## Further Learning Resources

**Topics to explore next:**
1. Cross-validation (more robust than train/val/test)
2. Class imbalance (what if 95% of patients don't readmit?)
3. Feature importance (which features matter most?)
4. Regularization (prevent overfitting mathematically)
5. Decision trees and random forests
6. Neural networks and deep learning
7. Time series modeling (patient trajectories)

**Recommended learning order:**
1. Read CODE_WALKTHROUGH.md (understand code structure)
2. Read this file (understand ML concepts)
3. Run the code and modify parameters
4. Add debugging prints to understand data flow
5. Implement a new feature or model variant
