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

```bash
python -m venv .venv
source .venv/Scripts/activate   # Windows (Git Bash)
pip install -r requirements.txt
```

## Key Frontend Features

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

This repository is a multi-folder workspace, so deployment is configured at repo root using `vercel.json`.

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
```

Python checks:

```bash
pytest
```

## Documentation

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
