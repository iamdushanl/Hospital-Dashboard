# Hospital Data Dashboard

Interactive Streamlit dashboard for exploring hospital patient cohorts, demographics, and model performance.

## Quick Start

### Install dependencies

```powershell
pip install -r ..\requirements.txt
# or, if you already have venv activated:
pip install streamlit plotly
```

### Run the dashboard

```powershell
cd C:\Users\HP\Documents\Datamining
streamlit run dashboard\app.py
```

The app will open in your browser at `http://localhost:8501`

## Features

### 📊 Cohort Summary Tab
- Total patient count and readmission rate
- Mean age and lab values
- Outcome distribution (readmitted vs. not readmitted)

### 📈 Demographics & Outcomes Tab
- Age distribution histogram
- Age vs. readmission outcome (box plot)
- Gender distribution
- Readmission rate by gender

### 🔬 Clinical Features Tab
- Lab value distribution
- Lab value vs. readmission outcome
- Diagnosis code frequency
- Readmission rate by diagnosis

### 🤖 Model Performance Tab
- Model metrics across train/val/test splits (accuracy, precision, recall, F1)
- Confusion matrix heatmap
- Feature list and count
- Visual comparison of model metrics

## Interactive Filters (Left Sidebar)

- **Age Range**: Filter patients by age
- **Gender**: Select one or more genders
- **Diagnosis Codes**: Filter by diagnosis codes
- **Lab Value Range**: Filter by lab value range

All charts and metrics update in real-time based on selected filters.

## Data Requirements

The dashboard expects:
- `data/sample_deid.csv` — De-identified patient data (output from `scripts/deidentify_csv.py`)
- `reports/baseline_model.json` — Model weights and metrics (output from `src/models/train_baseline.py`)

If these files are missing, run the pipeline setup first:

```powershell
python scripts\generate_synthetic.py --out data\sample\patients.csv --n 200
python scripts\deidentify_csv.py --input data\sample\patients.csv --output data\sample_deid.csv --drop-cols patient_name,ssn --hash-cols patient_id --date-cols dob,admission_date,discharge_date --shift-days 365
python src\etl\dataset_builder.py
python src\models\train_baseline.py
```

## Deployment

### Local Streamlit Server (Development)

```powershell
streamlit run dashboard\app.py
```

### Streamlit Cloud (Production)

1. Push your repo to GitHub (with `.gitignore` excluding `data/` and `.venv/`)
2. Go to https://streamlit.io/cloud
3. Connect your GitHub repo and deploy

### Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["streamlit", "run", "dashboard/app.py"]
```

Build and run:

```powershell
docker build -t hospital-dashboard .
docker run -p 8501:8501 hospital-dashboard
```

## Customization

Edit `dashboard/app.py` to:
- Add more visualizations (SHAP plots, calibration curves, etc.)
- Change color schemes
- Add model comparison tabs
- Integrate real-time data feeds
- Add export/download functionality

## Troubleshooting

**"Data file not found"**
- Ensure `data/sample_deid.csv` exists
- Run `python scripts/deidentify_csv.py` first

**"Model report not found"**
- Ensure `reports/baseline_model.json` exists
- Run `python src/models/train_baseline.py` first

**Port already in use**
```powershell
streamlit run dashboard\app.py --server.port 8502
```

**Slow performance**
- Reduce dataset size (filter in sidebar)
- Use `--client.toolbarMode=minimal` to reduce UI overhead
- Cache data with `@st.cache_data` (already done in app.py)

## References

- [Streamlit Documentation](https://docs.streamlit.io/)
- [Plotly Python](https://plotly.com/python/)
- [Streamlit Components](https://streamlit.io/components)
