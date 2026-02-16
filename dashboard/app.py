"""Hospital Data Dashboard using Streamlit.

Interactive visualization and exploration of hospital patient cohorts,
demographic distributions, diagnoses, and readmission outcomes.

Usage:
  streamlit run dashboard/app.py
"""
import csv
import json
from pathlib import Path

import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd


# ============================================================================
# Configuration & Setup
# ============================================================================

st.set_page_config(
    page_title="Hospital Data Dashboard",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("🏥 Hospital Data Analytics Dashboard")
st.markdown("*Exploratory analysis and model performance for patient readmission prediction*")


# ============================================================================
# Data Loading (with caching)
# ============================================================================

@st.cache_data
def load_deid_data():
    """Load de-identified patient data."""
    path = "data/sample_deid.csv"
    if not Path(path).exists():
        return None
    
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    
    return pd.DataFrame(rows)


@st.cache_data
def load_model_report():
    """Load baseline model report."""
    path = "reports/baseline_model.json"
    if not Path(path).exists():
        return None
    
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


# Load data
df = load_deid_data()
model_report = load_model_report()

if df is None:
    st.error("❌ Data file not found. Please run `python src/etl/dataset_builder.py` first.")
    st.stop()

# Convert numeric columns
numeric_cols = ["age", "lab_value", "outcome_readmit"]
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")


# ============================================================================
# Sidebar Filters
# ============================================================================

with st.sidebar:
    st.header("🔍 Filters")
    
    age_min, age_max = int(df["age"].min()), int(df["age"].max())
    age_range = st.slider("Age Range", age_min, age_max, (age_min, age_max))
    
    genders = st.multiselect("Gender", df["gender"].unique(), default=df["gender"].unique())
    
    diagnosis_codes = st.multiselect(
        "Diagnosis Codes",
        sorted(df["diagnosis_code"].unique()),
        default=sorted(df["diagnosis_code"].unique())
    )
    
    lab_range = st.slider(
        "Lab Value Range",
        float(df["lab_value"].min()),
        float(df["lab_value"].max()),
        (float(df["lab_value"].min()), float(df["lab_value"].max())),
    )

# Apply filters
df_filtered = df[
    (df["age"] >= age_range[0])
    & (df["age"] <= age_range[1])
    & (df["gender"].isin(genders))
    & (df["diagnosis_code"].isin(diagnosis_codes))
    & (df["lab_value"] >= lab_range[0])
    & (df["lab_value"] <= lab_range[1])
]

# ============================================================================
# Main Dashboard Tabs
# ============================================================================

tab1, tab2, tab3, tab4 = st.tabs(
    ["📊 Cohort Summary", "📈 Demographics & Outcomes", "🔬 Clinical Features", "🤖 Model Performance"]
)

# ============================================================================
# TAB 1: Cohort Summary
# ============================================================================

with tab1:
    st.header("Cohort Summary")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Patients", len(df_filtered))
    
    with col2:
        readmit_rate = (df_filtered["outcome_readmit"].sum() / len(df_filtered) * 100) if len(df_filtered) > 0 else 0
        st.metric("Readmission Rate", f"{readmit_rate:.1f}%")
    
    with col3:
        mean_age = df_filtered["age"].mean()
        st.metric("Mean Age (years)", f"{mean_age:.1f}")
    
    with col4:
        mean_lab = df_filtered["lab_value"].mean()
        st.metric("Mean Lab Value", f"{mean_lab:.1f}")
    
    st.divider()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Demographics")
        demo_df = pd.DataFrame({
            "Metric": ["Patient Count", "Mean Age", "Lab Value (Mean)", "Readmitted", "Not Readmitted"],
            "Value": [
                len(df_filtered),
                f"{df_filtered['age'].mean():.1f}",
                f"{df_filtered['lab_value'].mean():.1f}",
                int(df_filtered["outcome_readmit"].sum()),
                int((1 - df_filtered["outcome_readmit"]).sum()),
            ]
        })
        st.table(demo_df)
    
    with col2:
        st.subheader("Outcome Breakdown")
        outcome_counts = df_filtered["outcome_readmit"].value_counts().reset_index()
        outcome_counts.columns = ["Readmitted", "Count"]
        outcome_counts["Readmitted"] = outcome_counts["Readmitted"].map({0: "No", 1: "Yes"})
        
        fig = px.pie(
            outcome_counts,
            values="Count",
            names="Readmitted",
            title="Readmission Outcome Distribution",
            color_discrete_map={"Yes": "#ef553b", "No": "#00cc96"},
        )
        st.plotly_chart(fig, use_container_width=True)


# ============================================================================
# TAB 2: Demographics & Outcomes
# ============================================================================

with tab2:
    st.header("Demographics & Outcomes Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Age Distribution")
        fig_age = px.histogram(
            df_filtered,
            x="age",
            nbins=20,
            title="Age Distribution (All Patients)",
            labels={"age": "Age (years)", "count": "Number of Patients"},
            color_discrete_sequence=["#636EFA"],
        )
        fig_age.update_layout(showlegend=False, height=400)
        st.plotly_chart(fig_age, use_container_width=True)
    
    with col2:
        st.subheader("Age Distribution by Readmission Status")
        fig_age_readmit = px.box(
            df_filtered,
            x="outcome_readmit",
            y="age",
            title="Age vs. Readmission Outcome",
            labels={"outcome_readmit": "Readmitted", "age": "Age (years)"},
            color="outcome_readmit",
            color_discrete_map={0: "#00cc96", 1: "#ef553b"},
        )
        fig_age_readmit.update_xaxes(tickvals=[0, 1], ticktext=["No", "Yes"])
        st.plotly_chart(fig_age_readmit, use_container_width=True)
    
    col3, col4 = st.columns(2)
    
    with col3:
        st.subheader("Gender Distribution")
        gender_counts = df_filtered["gender"].value_counts().reset_index()
        gender_counts.columns = ["Gender", "Count"]
        
        fig_gender = px.bar(
            gender_counts,
            x="Gender",
            y="Count",
            title="Patient Count by Gender",
            color_discrete_sequence=["#636EFA"],
        )
        fig_gender.update_layout(showlegend=False, height=400)
        st.plotly_chart(fig_gender, use_container_width=True)
    
    with col4:
        st.subheader("Readmission Rate by Gender")
        readmit_by_gender = df_filtered.groupby("gender")["outcome_readmit"].agg(["sum", "count"])
        readmit_by_gender["rate"] = (readmit_by_gender["sum"] / readmit_by_gender["count"] * 100).round(1)
        readmit_by_gender = readmit_by_gender.reset_index()
        readmit_by_gender.columns = ["Gender", "Readmitted", "Total", "Rate (%)"]
        
        fig_readmit_gender = px.bar(
            readmit_by_gender,
            x="Gender",
            y="Rate (%)",
            title="Readmission Rate by Gender",
            color_discrete_sequence=["#FF6692"],
        )
        fig_readmit_gender.update_layout(showlegend=False, height=400)
        st.plotly_chart(fig_readmit_gender, use_container_width=True)


# ============================================================================
# TAB 3: Clinical Features
# ============================================================================

with tab3:
    st.header("Clinical Features Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Lab Value Distribution")
        fig_lab = px.histogram(
            df_filtered,
            x="lab_value",
            nbins=20,
            title="Lab Value Distribution",
            labels={"lab_value": "Lab Value", "count": "Number of Patients"},
            color_discrete_sequence=["#AB63FA"],
        )
        fig_lab.update_layout(showlegend=False, height=400)
        st.plotly_chart(fig_lab, use_container_width=True)
    
    with col2:
        st.subheader("Lab Value vs. Readmission")
        fig_lab_readmit = px.box(
            df_filtered,
            x="outcome_readmit",
            y="lab_value",
            title="Lab Value by Readmission Outcome",
            labels={"outcome_readmit": "Readmitted", "lab_value": "Lab Value"},
            color="outcome_readmit",
            color_discrete_map={0: "#00cc96", 1: "#ef553b"},
        )
        fig_lab_readmit.update_xaxes(tickvals=[0, 1], ticktext=["No", "Yes"])
        st.plotly_chart(fig_lab_readmit, use_container_width=True)
    
    st.divider()
    
    col3, col4 = st.columns(2)
    
    with col3:
        st.subheader("Diagnosis Code Distribution")
        diag_counts = df_filtered["diagnosis_code"].value_counts().reset_index()
        diag_counts.columns = ["Diagnosis", "Count"]
        
        fig_diag = px.bar(
            diag_counts,
            x="Diagnosis",
            y="Count",
            title="Top Diagnosis Codes",
            color_discrete_sequence=["#FFA15A"],
        )
        fig_diag.update_layout(height=400)
        st.plotly_chart(fig_diag, use_container_width=True)
    
    with col4:
        st.subheader("Readmission Rate by Diagnosis")
        readmit_by_diag = df_filtered.groupby("diagnosis_code")["outcome_readmit"].agg(["sum", "count"])
        readmit_by_diag["rate"] = (readmit_by_diag["sum"] / readmit_by_diag["count"] * 100).round(1)
        readmit_by_diag = readmit_by_diag.reset_index().sort_values("rate", ascending=False)
        readmit_by_diag.columns = ["Diagnosis", "Readmitted", "Total", "Rate (%)"]
        
        fig_readmit_diag = px.bar(
            readmit_by_diag,
            x="Diagnosis",
            y="Rate (%)",
            title="Readmission Rate by Diagnosis",
            color_discrete_sequence=["#00CC96"],
        )
        fig_readmit_diag.update_layout(height=400)
        st.plotly_chart(fig_readmit_diag, use_container_width=True)


# ============================================================================
# TAB 4: Model Performance
# ============================================================================

with tab4:
    st.header("🤖 Baseline Model Performance")
    
    if model_report:
        # Extract metrics
        train_metrics = model_report.get("train_metrics", {})
        val_metrics = model_report.get("val_metrics", {})
        test_metrics = model_report.get("test_metrics", {})
        feature_cols = model_report.get("feature_cols", [])
        
        st.subheader("Model Type & Features")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Model", model_report.get("model_type", "Unknown"))
        with col2:
            st.metric("Training Epochs", "100")
        with col3:
            st.metric("Number of Features", len(feature_cols))
        
        st.divider()
        
        # Metrics comparison
        st.subheader("Metrics by Data Split")
        
        metrics_data = {
            "Split": ["Train", "Validation", "Test"],
            "Accuracy": [
                train_metrics.get("accuracy", 0),
                val_metrics.get("accuracy", 0),
                test_metrics.get("accuracy", 0),
            ],
            "Precision": [
                train_metrics.get("precision", 0),
                val_metrics.get("precision", 0),
                test_metrics.get("precision", 0),
            ],
            "Recall": [
                train_metrics.get("recall", 0),
                val_metrics.get("recall", 0),
                test_metrics.get("recall", 0),
            ],
            "F1 Score": [
                train_metrics.get("f1", 0),
                val_metrics.get("f1", 0),
                test_metrics.get("f1", 0),
            ],
        }
        
        metrics_df = pd.DataFrame(metrics_data)
        st.dataframe(metrics_df, use_container_width=True)
        
        st.divider()
        
        # Visualize metrics
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("Accuracy Across Splits")
            fig_acc = px.bar(
                metrics_df,
                x="Split",
                y="Accuracy",
                title="Model Accuracy by Data Split",
                color_discrete_sequence=["#636EFA"],
            )
            fig_acc.update_layout(showlegend=False, height=400)
            st.plotly_chart(fig_acc, use_container_width=True)
        
        with col2:
            st.subheader("All Metrics Comparison (Test Set)")
            test_metrics_data = {
                "Metric": ["Accuracy", "Precision", "Recall", "F1"],
                "Score": [
                    test_metrics.get("accuracy", 0),
                    test_metrics.get("precision", 0),
                    test_metrics.get("recall", 0),
                    test_metrics.get("f1", 0),
                ],
            }
            fig_test = px.bar(
                test_metrics_data,
                x="Metric",
                y="Score",
                title="Test Set Metrics",
                color_discrete_sequence=["#AB63FA"],
            )
            fig_test.update_layout(showlegend=False, height=400, yaxis_range=[0, 1])
            st.plotly_chart(fig_test, use_container_width=True)
        
        st.divider()
        
        # Confusion Matrix for Test Set
        st.subheader("Confusion Matrix (Test Set)")
        
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("True Positives (TP)", test_metrics.get("tp", 0))
        with col2:
            st.metric("False Positives (FP)", test_metrics.get("fp", 0))
        with col3:
            st.metric("False Negatives (FN)", test_metrics.get("fn", 0))
        with col4:
            st.metric("True Negatives (TN)", test_metrics.get("tn", 0))
        
        # Confusion matrix heatmap
        cm_data = [
            [test_metrics.get("tn", 0), test_metrics.get("fp", 0)],
            [test_metrics.get("fn", 0), test_metrics.get("tp", 0)],
        ]
        
        fig_cm = go.Figure(
            data=go.Heatmap(
                z=cm_data,
                x=["Predicted: No Readmit", "Predicted: Readmit"],
                y=["Actual: No Readmit", "Actual: Readmit"],
                text=cm_data,
                texttemplate="%{text}",
                colorscale="Blues",
            )
        )
        fig_cm.update_layout(title="Confusion Matrix (Test Set)", height=400)
        st.plotly_chart(fig_cm, use_container_width=True)
        
        st.divider()
        
        # Features
        st.subheader("Model Features")
        st.write(f"**Total features**: {len(feature_cols)}")
        
        feature_df = pd.DataFrame({"Feature": feature_cols, "Index": range(len(feature_cols))})
        st.dataframe(feature_df, use_container_width=True)
        
        # -------------------------
        # CatBoost Large Tabular Model
        # -------------------------
        catboost_model_path = Path("reports/catboost_model.pkl")
        if catboost_model_path.exists():
            st.divider()
            st.subheader("🚀 CatBoost Large Tabular Model")
            model_obj = None
            # Try joblib first, then pickle
            try:
                import joblib

                model_obj = joblib.load(catboost_model_path)
            except Exception:
                try:
                    import pickle

                    with open(catboost_model_path, "rb") as fh:
                        model_obj = pickle.load(fh)
                except Exception:
                    st.warning("Found CatBoost model file but could not load it. Ensure it's a pickled model compatible with sklearn API.")

            if model_obj is not None:
                st.write("✓ Loaded CatBoost model from reports/catboost_model.pkl")
                st.caption("State-of-the-art gradient boosting model for tabular data")
                if st.button("Run CatBoost predictions on filtered cohort"):
                    try:
                        X_feat = df_filtered[feature_cols].apply(pd.to_numeric, errors="coerce").fillna(0)
                        if hasattr(model_obj, "predict_proba"):
                            probs = model_obj.predict_proba(X_feat)
                            if hasattr(probs, "ndim") and probs.ndim == 2 and probs.shape[1] == 2:
                                probs = probs[:, 1]
                            df_filtered = df_filtered.copy()
                            df_filtered["_catboost_prob"] = probs
                            mean_prob = float(df_filtered["_catboost_prob"].mean())
                            st.metric("Mean predicted readmit probability (CatBoost)", f"{mean_prob:.3f}")
                        else:
                            preds = model_obj.predict(X_feat)
                            df_filtered = df_filtered.copy()
                            df_filtered["_catboost_pred"] = preds
                            mean_pred = float(df_filtered["_catboost_pred"].mean())
                            st.metric("Mean predicted class (CatBoost)", f"{mean_pred:.3f}")

                        st.subheader("Sample predictions (first 50 rows)")
                        st.dataframe(df_filtered.head(50), use_container_width=True)
                    except Exception as e:
                        st.error(f"Error running CatBoost model on filtered data: {e}")
        else:
            st.info("No CatBoost model found at reports/catboost_model.pkl. Train one with: `python src/models/train_catboost.py --train data/processed/train.parquet --val data/processed/val.parquet --test data/processed/test.parquet`")
        
    else:
        st.warning("⚠️ Model report not found. Please run `python src/models/train_baseline.py` first.")


# ============================================================================
# Footer
# ============================================================================

st.divider()
st.markdown(
    """
    **Hospital Data Analytics Dashboard**
    
    Data source: `data/sample_deid.csv` (de-identified)  
    Model: Logistic Regression (`reports/baseline_model.json`)  
    
    For more information, see [README.md](https://github.com/your-repo) | 
    [Implementation Summary](IMPLEMENTATION_SUMMARY.md)
    """
)
