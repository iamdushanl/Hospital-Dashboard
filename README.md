<<<<<<< HEAD
# 🏥 Hospital Analytics Dashboard
### AI-Powered Healthcare Insights & Patient Readmission Prediction

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

> A production-ready healthcare analytics platform that combines ensemble machine learning with a modern web interface — built to help clinical teams make faster, data-informed decisions.

🔗 **[Live Demo](https://hospital-dashboard-blush.vercel.app)** · [Report a Bug](https://github.com/iamdushanl/Hospital-Dashboard/issues) · [Request a Feature](https://github.com/iamdushanl/Hospital-Dashboard/issues)

---

## 📸 Preview

<p align="center">
  <img src="C:\Users\HP\Documents\Datamining\src\Images\Dashboard_preview.png" alt="Hospital Dashboard Preview" width="900"/>
</p>

---

## 🎯 What It Does

Hospital Analytics Dashboard gives healthcare professionals a single, intelligent view of patient data. At its core it predicts **30-day readmission risk** using an ensemble of state-of-the-art ML models, while surfacing real-time metrics, interactive visualizations, and a forward-looking predictive analytics tab.

Key outcomes it supports:
- Identifying high-risk patients before discharge
- Tracking department load, OPD visits, and occupancy in real time
- 30-day forecasting of patient volume, costs, and revenue for strategic planning

---

## ✨ Features

**📊 Live Analytics**
- Real-time patient count, readmission rates, and OPD statistics
- Department occupancy heatmaps and trend charts
- Time-series analysis with interactive drill-down

**🤖 AI-Powered Risk Prediction**
- Patient readmission probability scoring using an ensemble of TabPFN, CatBoost, and XGBoost
- Confidence intervals for transparent uncertainty quantification
- Feature-level explainability for clinical teams

**🔮 Predictive Analytics**
- 30-day AI-driven forecasts for patient volume, revenue, and operational costs
- Visual confidence bands for scenario planning

**🎨 Modern UX**
- Server-side rendering via Next.js 14 for fast load times
- Fully responsive — desktop, tablet, and mobile
- Dark mode support for extended monitoring sessions
- WCAG 2.1 accessible

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript 5, Tremor, Tailwind CSS |
| Backend | Flask (Python 3.11) |
| ML Models | TabPFN, CatBoost, XGBoost, Scikit-learn |
| Data | Pandas, NumPy, Parquet |
| Infra | Vercel, Git LFS |

---

## 🧠 Machine Learning

The prediction engine uses a **stacked ensemble** approach, combining three complementary algorithms:

| Model | Strength |
|---|---|
| **TabPFN** | Excellent on smaller clinical datasets; zero training overhead |
| **CatBoost** | Handles categorical features (diagnosis codes, departments) natively |
| **XGBoost** | High throughput with strong regularization |

**Ensemble accuracy: 85.2% · AUC-ROC: 0.89**

```
Baseline:    76.2%
CatBoost:    82.5%
XGBoost:     81.8%
TabPFN:      79.3%
─────────────────────
Ensemble:    85.2% ✨
```

Features fed into the models include patient demographics, clinical indicators (labs, vitals, diagnosis codes), temporal admission patterns, and hospital operational metrics.

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+, Python 3.11+, npm

```bash
# Clone the repo
git clone https://github.com/iamdushanl/Hospital-Dashboard.git
cd Hospital-Dashboard

# Install frontend dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live. 🎉
=======
# Hospital Analytics Dashboard

Production-focused healthcare analytics workspace with:
- a Next.js executive dashboard (`web-dashboard/`),
- a Python data/ML pipeline (`src/`, `scripts/`, `notebooks/`),
- sample datasets and model reports (`data/`, `reports/`).

## Current Status

- Frontend deployed on Vercel
- Dashboard includes chart-topic labels above all major charts
- UI copy and styling polished for a cleaner enterprise look
- Visibility/contrast issues fixed for light-card content
- Vercel deployment fixed for monorepo layout (`web-dashboard` as build target)

## Workspace Structure

```text
Datamining/
├── web-dashboard/            # Next.js 14 frontend (deployed app)
├── dashboard/                # Python dashboard app
├── src/                      # ETL + model training code
├── scripts/                  # Data generation/de-identification scripts
├── notebooks/                # Analysis notebooks/scripts
├── data/                     # Sample + processed datasets
├── reports/                  # Model output reports
├── tests/                    # Python tests
└── *.md                      # Guides and documentation
```

## Quick Start

### 1) Frontend (Next.js)

From repo root:

```bash
cd web-dashboard
npm install
npm run dev
```

Open `http://localhost:3000`.

### 2) Python pipeline (optional)

From repo root:
>>>>>>> b7588274 (Final changes)

**Prefer Docker?**
```bash
<<<<<<< HEAD
docker-compose up --build
=======
python -m venv .venv
source .venv/Scripts/activate   # Windows (Git Bash)
pip install -r requirements.txt
>>>>>>> b7588274 (Final changes)
```

## Key Frontend Features

<<<<<<< HEAD
## 📁 Project Structure

```
Hospital-Dashboard/
├── web-dashboard/       # Next.js frontend (App Router)
│   ├── app/             # Pages and layouts
│   └── components/      # Reusable UI components
├── dashboard/           # Flask API backend
│   ├── routes/          # API endpoints
│   └── services/        # Business logic
├── src/                 # ML pipeline
│   ├── etl/             # Data ingestion & processing
│   ├── models/          # Training scripts (per model + ensemble)
│   └── utils/           # Shared helpers
├── data/
│   ├── processed/       # Clean Parquet datasets
│   └── sample/          # Demo/test data
├── notebooks/           # Jupyter analysis notebooks
├── reports/             # Model evaluation results
└── tests/               # Unit & integration tests
```
=======
- Multi-tab hospital analytics dashboard:
  - Executive Summary
  - Financial Performance
  - Clinical Quality
  - Operations
  - Patient Analytics
  - Workforce
  - Resource Utilization
  - Predictive Analytics
- Chart-topic badges above charts for better readability
- Consistent professional copy (reduced symbolic/emoji noise)
- Improved table/header/legend contrast and visibility

## Deployment (Vercel)
>>>>>>> b7588274 (Final changes)

This repository is a multi-folder workspace, so deployment is configured at repo root using `vercel.json`.

<<<<<<< HEAD
## 🏋️ Training the Models

```bash
# Train individual models
python src/models/train_catboost.py
python src/models/train_xgboost.py
python src/models/train_tabpfn.py

# Run the full ensemble pipeline
python src/models/train_ensemble.py
```

---

## 🚢 Deployment

**One-click deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamdushanl/Hospital-Dashboard)

**Required environment variables:**
```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_API_KEY=your_api_key
=======
Current setup:

- `installCommand`: `cd web-dashboard && npm install`
- `buildCommand`: `cd web-dashboard && npm run build`
- `devCommand`: `cd web-dashboard && npm run dev`
- `outputDirectory`: `web-dashboard/.next`

### Deploy with CLI

```bash
npm install -g vercel
vercel link
vercel --prod
```

## Validation Commands

Frontend checks:

```bash
cd web-dashboard
npm run lint
npm run build
>>>>>>> b7588274 (Final changes)
```

Python checks:

<<<<<<< HEAD
## 📚 Documentation

| Guide | Description |
|---|---|
| [Beginner's Guide](BEGINNER_GUIDE.md) | New to the project? Start here |
| [Code Walkthrough](CODE_WALKTHROUGH.md) | Deep dive into the architecture |
| [ML Concepts](ML_CONCEPTS.md) | How the prediction pipeline works |
| [Deployment Guide](DEPLOYMENT.md) | Production setup instructions |
| [Contributing](CONTRIBUTING.md) | How to contribute |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push and open a Pull Request

Please make sure tests pass and documentation is updated before submitting.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
=======
```bash
pytest
```
>>>>>>> b7588274 (Final changes)

## Documentation

<<<<<<< HEAD
## 👤 Author

**Dushan L**
- GitHub: [@iamdushanl](https://github.com/iamdushanl)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-handle)

---

_Built with a focus on real-world clinical impact — because better data leads to better patient outcomes._
=======
- [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md)
- [CODE_WALKTHROUGH.md](CODE_WALKTHROUGH.md)
- [ML_CONCEPTS.md](ML_CONCEPTS.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- [LEARNING_PATH.md](LEARNING_PATH.md)
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

## License

MIT — see [LICENSE](LICENSE).
>>>>>>> b7588274 (Final changes)
