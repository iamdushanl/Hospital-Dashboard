# 🔍 Quick Reference Guide

Fast lookup for common commands, code snippets, and concepts.

---

## Command Reference

### Generate Data
```bash
# Create 200 synthetic patients
python scripts/generate_synthetic.py --out data/sample/patients.csv --n 200

# Create 1000 patients
python scripts/generate_synthetic.py --out data/large/patients.csv --n 1000
```

### De-identify Data
```bash
# Remove PHI (names, SSNs), hash IDs, shift dates
python scripts/deidentify_csv.py \
    --in data/sample/patients.csv \
    --out data/sample_deid.csv
```

### Explore Data
```bash
# Print cohort statistics, distributions, correlations
python notebooks/01_eda.py
```

### Engineer Features
```bash
# Create 11 ML features, split into train/val/test
python src/etl/dataset_builder.py \
    --in data/sample_deid.csv \
    --out data/processed/
```

### Train Model
```bash
# Train logistic regression on training set
python src/models/train_baseline.py

# Output: baseline_model.json with metrics
```

### Launch Dashboard
```bash
# Start interactive web app at localhost:8501
streamlit run dashboard\app.py

# Use different port (if 8501 is busy)
streamlit run dashboard\app.py --server.port 8502
```

### Run Full Pipeline
```bash
# One-command execute all steps
python scripts/generate_synthetic.py --out data/sample/patients.csv --n 200 && \
python scripts/deidentify_csv.py --in data/sample/patients.csv --out data/sample_deid.csv && \
python notebooks/01_eda.py && \
python src/etl/dataset_builder.py --in data/sample_deid.csv --out data/processed/ && \
python src/models/train_baseline.py
```

---

## Python Code Snippets

### Import Libraries
```python
import csv           # Read/write CSV
import json          # Read/write JSON
import random        # Random numbers
import math          # Math functions (sin, cos, exp, etc)
from datetime import datetime, timedelta  # Date operations

# Optional (requires pip install)
import pandas as pd  # Data manipulation
import numpy as np   # Numerical computing
```

### Load CSV
```python
import csv

# Read CSV
with open('data.csv') as f:
    reader = csv.DictReader(f)  # headers as keys
    rows = list(reader)
    
print(rows[0])  # First row

# Write CSV
with open('output.csv', 'w', newline='') as f:
    fieldnames = ['age', 'gender', 'outcome']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'age': 65, 'gender': 'M', 'outcome': 1})
```

### Load JSON
```python
import json

# Read JSON
with open('model.json') as f:
    data = json.load(f)
    
print(data['weights'])  # Access like dict

# Write JSON
data = {'weights': [0.1, 0.2, 0.3], 'bias': 0.05}
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
```

### Work with Dates
```python
from datetime import datetime, timedelta

# Create date
d = datetime(2024, 3, 15)  # March 15, 2024

# Parse date string
d = datetime.fromisoformat('2024-03-15')  # → datetime object

# Add days
d2 = d + timedelta(days=10)  # 10 days later

# Calculate difference
delta = d2 - d  # → timedelta object
days = delta.days  # → 10

# Format as string
s = d.isoformat()  # → '2024-03-15'
```

### Random Numbers
```python
import random

# Random integer (inclusive)
random.randint(1, 10)  # → 1-10

# Random float (0.0 to 1.0)
random.random()  # → 0.456

# Random from normal distribution (mean, std)
random.gauss(100, 15)  # → around 100

# Random choice from list
random.choice(['M', 'F'])  # → 'M' or 'F'

# Shuffle list in-place
items = [1, 2, 3]
random.shuffle(items)  # items → [3, 1, 2]

# Seeded randomness (reproducible)
random.seed(42)
random.random()  # → always 0.3745...
```

### Mathematical Operations
```python
import math

# Sigmoid (probability function)
def sigmoid(z):
    if z > 100:
        return 1.0
    if z < -100:
        return 0.0
    return 1.0 / (1.0 + math.exp(-z))

sigmoid(0)   # → 0.5
sigmoid(5)   # → 0.993
sigmoid(-5)  # → 0.007

# Exponent
math.exp(1)  # → e ≈ 2.718

# Square root
math.sqrt(16)  # → 4.0

# Power
2 ** 3  # → 8 (2 to power 3)
```

### String Formatting
```python
# f-strings (recommended)
name = "Alice"
age = 25
f"{name} is {age} years old"  # → "Alice is 25 years old"

# Padding with zeros
patient_id = 42
f"P{patient_id:06d}"  # → "P000042" (pad to 6 digits)

# Rounding
pi = 3.14159
f"{pi:.2f}"  # → "3.14" (2 decimal places)
```

### List and Dictionary Operations
```python
# List
numbers = [1, 2, 3, 4, 5]
numbers[0]    # → 1 (first element)
numbers[-1]   # → 5 (last element)
numbers[1:4]  # → [2, 3, 4] (slice)
len(numbers)  # → 5 (length)
sum(numbers)  # → 15
max(numbers)  # → 5
min(numbers)  # → 1

# More list operations
numbers.append(6)  # → [1, 2, 3, 4, 5, 6]
numbers.pop()      # → removes 6, returns it
[x*2 for x in numbers]  # → [2, 4, 6, 8, 10]

# Dictionary
person = {'name': 'Alice', 'age': 25}
person['name']     # → 'Alice'
person['age'] = 26  # change value
'age' in person    # → True
person.keys()      # → ['name', 'age']
person.values()    # → ['Alice', 26]

# Iterate
for key, value in person.items():
    print(f"{key}: {value}")
```

### Functions
```python
# Define function
def greet(name):
    """Say hello to someone."""
    return f"Hello, {name}!"

greet("Alice")  # → "Hello, Alice!"

# Function with default argument
def add(a, b=0):
    return a + b

add(5)      # → 5 (uses default b=0)
add(5, 3)   # → 8

# Multiple return values
def divmod_custom(a, b):
    return a // b, a % b

quotient, remainder = divmod_custom(10, 3)
# quotient=3, remainder=1

# Anonymous function (lambda)
square = lambda x: x**2
square(5)  # → 25

# Use in list operations
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
# → [1, 4, 9, 16, 25]
```

### Control Flow
```python
# if-elif-else
age = 25

if age < 18:
    print("Minor")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# for loop
for i in range(3):  # 0, 1, 2
    print(i)

for item in ['a', 'b', 'c']:
    print(item)

# while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Boolean logic
if age > 18 and age < 65:
    print("Working age")
    
if value is None:
    print("No value")
    
if x in [1, 2, 3]:
    print("x is 1, 2, or 3")
```

---

## Machine Learning Snippets

### Sigmoid Function
```python
import math

def sigmoid(z):
    """Convert number to probability (0-1)."""
    if z > 100:
        return 1.0
    elif z < -100:
        return 0.0
    else:
        return 1.0 / (1.0 + math.exp(-z))
```

### Logistic Regression Training
```python
def train_logistic_regression(X, y, lr=0.01, epochs=100):
    """Train logistic regression model."""
    n_features = len(X[0])
    weights = [0.0] * n_features
    bias = 0.0
    
    for epoch in range(epochs):
        for x, y_true in zip(X, y):
            # Forward pass
            z = bias + sum(w*v for w,v in zip(weights, x))
            y_pred = sigmoid(z)
            
            # Backward pass
            error = y_pred - y_true
            bias -= lr * error
            for i in range(n_features):
                weights[i] -= lr * error * x[i]
    
    return weights, bias
```

### Prediction
```python
def predict_proba(X, weights, bias):
    """Get probability predictions."""
    predictions = []
    for x in X:
        z = bias + sum(w*v for w,v in zip(weights, x))
        pred = sigmoid(z)
        predictions.append(pred)
    return predictions

def predict_class(proba, threshold=0.5):
    """Convert probabilities to class (0 or 1)."""
    return [1 if p >= threshold else 0 for p in proba]
```

### Evaluation Metrics
```python
def compute_metrics(y_true, y_pred):
    """Calculate TP, FP, FN, TN."""
    TP = sum(1 for yt, yp in zip(y_true, y_pred) if yt==1 and yp==1)
    FP = sum(1 for yt, yp in zip(y_true, y_pred) if yt==0 and yp==1)
    FN = sum(1 for yt, yp in zip(y_true, y_pred) if yt==1 and yp==0)
    TN = sum(1 for yt, yp in zip(y_true, y_pred) if yt==0 and yp==0)
    
    accuracy = (TP + TN) / (TP+FP+FN+TN) if (TP+FP+FN+TN) > 0 else 0
    precision = TP / (TP+FP) if (TP+FP) > 0 else 0
    recall = TP / (TP+FN) if (TP+FN) > 0 else 0
    f1 = 2 * precision * recall / (precision+recall) if (precision+recall) > 0 else 0
    
    return {
        'TP': TP, 'FP': FP, 'FN': FN, 'TN': TN,
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1,
    }
```

### Normalization
```python
def normalize_min_max(values):
    """Scale values to 0-1 range."""
    min_val = min(values)
    max_val = max(values)
    return [(v - min_val) / (max_val - min_val) for v in values]

def normalize_z_score(values):
    """Scale to mean=0, std=1."""
    mean = sum(values) / len(values)
    std = (sum((v - mean)**2 for v in values) / len(values)) ** 0.5
    return [(v - mean) / std for v in values]
```

---

## Streamlit Snippets

### Basic Layout
```python
import streamlit as st

# Title and text
st.title("My Dashboard")
st.header("Section 1")
st.subheader("Subsection")
st.text("Regular text")
st.write("Markdown **bold** and *italic*")

# Divider
st.divider()

# Layout
col1, col2 = st.columns(2)
with col1:
    st.write("Left column")
with col2:
    st.write("Right column")
```

### Interactive Components
```python
import streamlit as st

# Slider
age = st.slider("Select age", 0, 100, 25)  # min, max, default

# Range slider
age_range = st.slider("Age range", 0, 100, (20, 80))  # (min, max)

# Text input
name = st.text_input("Enter name", "Alice")

# Dropdown
gender = st.selectbox("Gender", ["M", "F", "Other"])

# Multi-select
diseases = st.multiselect("Select diseases", ["Diabetes", "Heart", "Lung"])

# Checkbox
agree = st.checkbox("I agree")

# Radio buttons
choice = st.radio("Pick one", ["A", "B", "C"])

# Number input
count = st.number_input("Count", min_value=0, max_value=100, value=50)
```

### Display Data
```python
import streamlit as st
import pandas as pd

# Metrics (big numbers)
st.metric("Total Patients", 200)
st.metric("Accuracy", "87%", "+3%")  # with change indicator

# Table
df = pd.DataFrame({'Age': [25, 35, 45], 'Gender': ['M', 'F', 'M']})
st.table(df)

# More readable table
st.dataframe(df)

# JSON
st.json({'name': 'Alice', 'age': 25})

# Code
st.code("print('Hello')", language='python')
```

### Caching
```python
import streamlit as st
import pandas as pd

@st.cache_data
def load_data():
    """Load data once, reuse (fast)."""
    return pd.read_csv('data.csv')

df = load_data()  # First call: reads file
df = load_data()  # Second call: uses cache (instant)
```

### Charts
```python
import streamlit as st
import plotly.express as px
import pandas as pd

df = pd.read_csv('data.csv')

# Histogram
fig = px.histogram(df, x='age', nbins=30, title='Age Distribution')
st.plotly_chart(fig)

# Scatter
fig = px.scatter(df, x='age', y='lab_value', color='gender')
st.plotly_chart(fig)

# Bar chart
fig = px.bar(df, x='diagnosis', y='count', title='Diagnoses')
st.plotly_chart(fig)

# Line chart
fig = px.line(df, x='time', y='value', title='Trend')
st.plotly_chart(fig)
```

### Sidebar
```python
import streamlit as st

# All sidebar components
st.sidebar.title("Filters")
age = st.sidebar.slider("Age", 0, 100, 50)
gender = st.sidebar.selectbox("Gender", ["M", "F"])

# Use filters
st.write(f"Selected: Age={age}, Gender={gender}")
```

---

## Data Analysis Snippets

### Basic Statistics
```python
import statistics

data = [1, 2, 3, 4, 5, 5, 5]

statistics.mean(data)      # → 3.57
statistics.median(data)    # → 4
statistics.mode(data)      # → 5
statistics.stdev(data)     # → 1.81
min(data)                  # → 1
max(data)                  # → 5
sum(data)                  # → 28
len(data)                  # → 7
```

### Counting/Grouping
```python
from collections import Counter

genders = ['M', 'F', 'M', 'M', 'F', 'F', 'F']
counts = Counter(genders)
# → Counter({'F': 4, 'M': 3})

counts['M']  # → 3
dict(counts)  # → {'M': 3, 'F': 4}

# Manual grouping
data = [
    {'gender': 'M', 'age': 25},
    {'gender': 'F', 'age': 30},
    {'gender': 'M', 'age': 35},
]

by_gender = {}
for row in data:
    g = row['gender']
    if g not in by_gender:
        by_gender[g] = []
    by_gender[g].append(row)

by_gender['M']  # → [{'gender': 'M', 'age': 25}, ...]
```

### One-Hot Encoding
```python
def one_hot_encode(categories, value):
    """Convert categorical value to one-hot vector."""
    return {cat: 1 if cat == value else 0 for cat in categories}

categories = ['N18', 'R07', 'G47', 'J18', 'Other']
one_hot_encode(categories, 'N18')
# → {'N18': 1, 'R07': 0, 'G47': 0, 'J18': 0, 'Other': 0}
```

---

## File Operations

### Check if File Exists
```python
import os

if os.path.exists('data.csv'):
    print("File exists")
else:
    print("File not found")

# Check if directory
if os.path.isdir('data'):
    print("Directory exists")
```

### Create Directories
```python
import os

os.makedirs('data/processed', exist_ok=True)
# Creates data/processed if doesn't exist
# exist_ok=True means don't error if already exists
```

### List Files
```python
import os

# List files in directory
files = os.listdir('data')
print(files)  # → ['file1.csv', 'file2.csv', ...]

# List all Python files recursively
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.py'):
            print(os.path.join(root, f))
```

### File Paths
```python
import os

# Get directory of file
path = 'data/sample/patients.csv'
dirname = os.path.dirname(path)   # → 'data/sample'
basename = os.path.basename(path) # → 'patients.csv'

# Join paths (cross-platform)
path = os.path.join('data', 'sample', 'file.csv')
# → 'data\\sample\\file.csv' (Windows) or 'data/sample/file.csv' (Linux)

# Get absolute path
abs_path = os.path.abspath('data/file.csv')
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError` | Package not installed | `pip install package_name` |
| `FileNotFoundError` | File doesn't exist | Generate data first |
| `KeyError` | Dictionary key missing | Check column name spelling |
| `IndexError` | List index out of range | Check list length |
| `TypeError` | Wrong data type | Convert with int(), str(), etc |
| `ValueError` | Invalid value for operation | Check input data format |
| `ZeroDivisionError` | Division by zero | Add `if denominator != 0` check |
| `IndentationError` | Wrong indentation | Use 4 spaces, not tabs |

---

## Keyboard Shortcuts

### Python/VS Code
```
Ctrl+S        Save file
Ctrl+C        Stop running program
Ctrl+/        Comment/uncomment line
F5            Run current file/debug
Shift+Tab     Unindent
Tab           Indent
Ctrl+F        Find
Ctrl+H        Find and replace
Ctrl+Z        Undo
Ctrl+Shift+Z  Redo
```

### Terminal
```
cls           Clear screen (Windows)
python -V    Check Python version
pip list     List installed packages
pip install  Install package
python -m venv .venv   Create virtual environment
.venv\Scripts\activate  Activate (Windows)
deactivate   Exit virtual environment
```

---

## Useful One-Liners

```python
# Count lines in file
len(open('file.py').readlines())

# Quick random sample
import random
random.sample(range(100), 10)  # 10 random numbers 0-99

# Check string length
len("hello")  # → 5

# Reverse string/list
"hello"[::-1]  # → "olleh"
[1,2,3][::-1]  # → [3,2,1]

# All same?
all(x == 5 for x in [5, 5, 5])  # → True

# Any true?
any(x > 5 for x in [1, 2, 10])  # → True

# Flatten list
[item for sublist in [[1,2],[3,4]] for item in sublist]  # → [1,2,3,4]

# Dict from two lists
dict(zip(['a','b','c'], [1, 2, 3]))  # → {'a':1, 'b':2, 'c':3}
```

---

Happy coding! 🎉
