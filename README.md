<div align="center">

# 🏥 Hospital Analytics Dashboard

### *AI-Powered Healthcare Insights & Patient Readmission Prediction*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

[Live Demo](#) • [Documentation](#-documentation) • [Report Bug](https://github.com/iamdushanl/Hospital-Dashboard/issues) • [Request Feature](https://github.com/iamdushanl/Hospital-Dashboard/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [ML Models](#-machine-learning-models)
- [Performance](#-performance)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Hospital Analytics Dashboard** is a comprehensive, production-ready healthcare data analytics platform that combines cutting-edge machine learning with modern web technologies. Built for healthcare professionals, it delivers real-time patient insights, readmission risk predictions, and interactive visualizations to support data-driven clinical decision-making.

### Why This Project?

- 🎯 **Real-world Impact**: Helps reduce patient readmission rates through predictive analytics
- 🧠 **Advanced ML**: Leverages ensemble methods including TabPFN, CatBoost, and XGBoost
- 💼 **Production-Ready**: Built with scalability, security, and performance in mind
- 🎨 **Beautiful UI**: Modern, responsive design with dark mode support

---

## ✨ Features

### 📊 Analytics & Insights

<table>
<tr>
<td width="50%">

**Real-Time Metrics**
- Live patient count tracking
- Readmission rate monitoring
- OPD visit statistics
- Department occupancy rates

</td>
<td width="50%">

**Interactive Visualizations**
- Dynamic trend charts
- Risk distribution graphs
- Department load heatmaps
- Time-series analytics

</td>
</tr>
</table>

### 🤖 AI-Powered Predictions

- **Smart Risk Assessment**: Patient readmission probability scoring
- **Ensemble Learning**: Combines multiple ML models for accuracy
- **Confidence Intervals**: Transparent uncertainty quantification


### 🔮 Predictive Analytics Tab
- **30-Day Forecasts**: AI-driven projections for patient volume, revenue, and costs
- **Strategic Planning**: Dedicated view for long-term decision support
- **Scenario Analysis**: Visual confidence bands for future planning

### 🎨 Modern User Experience

- ⚡ **Lightning Fast**: Server-side rendering with Next.js 14
- 📱 **Fully Responsive**: Seamless experience on all devices
- 🌓 **Dark Mode**: Easy on the eyes for long monitoring sessions
- ♿ **Accessible**: WCAG 2.1 compliant interface

---

## 🛠️ Tech Stack

### Frontend Excellence

```
Next.js 14.0     │ React framework with App Router
React 18         │ Modern UI library with hooks
TypeScript 5.0   │ Type-safe JavaScript
Tremor React     │ Professional dashboard components
Tailwind CSS     │ Utility-first styling
```

### Backend & ML Powerhouse

```
Python 3.11      │ Core ML development language
CatBoost         │ Gradient boosting framework
XGBoost          │ Extreme gradient boosting
TabPFN           │ Prior-fitted neural network
Scikit-learn     │ Classical ML algorithms
Pandas & NumPy   │ Data manipulation and analysis
```

### Data & Infrastructure

```
Parquet          │ Efficient columnar storage
Flask            │ Lightweight Python web framework
Git LFS          │ Large file version control
Vercel           │ Deployment and hosting
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.0 or higher
- **Python** 3.11 or higher
- **npm** or **yarn**
- **Git**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/iamdushanl/Hospital-Dashboard.git
cd Hospital-Dashboard

# 2. Install frontend dependencies
npm install

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 5. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your dashboard! 🎉

### Quick Docker Setup (Alternative)

```bash
# Build and run with Docker
docker-compose up --build
```

---

## 📦 Project Structure

```
Hospital-Dashboard/
│
├── 📁 web-dashboard/        # Next.js frontend application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable React components
│   └── styles/              # Global styles
│
├── 📁 dashboard/            # Flask API backend
│   ├── routes/              # API endpoints
│   └── services/            # Business logic
│
├── 📁 src/                  # ML pipeline
│   ├── etl/                 # Data processing
│   ├── models/              # Model training scripts
│   └── utils/               # Helper functions
│
├── 📁 data/
│   ├── processed/           # Clean datasets (Parquet)
│   └── sample/              # Test data
│
├── 📁 notebooks/            # Jupyter analysis notebooks
├── 📁 reports/              # Model evaluation results
├── 📁 tests/                # Unit and integration tests
└── 📁 scripts/              # Automation scripts
```

---

## 🧪 Machine Learning Models

### Model Architecture

Our ensemble approach combines three state-of-the-art algorithms:

| Model | Purpose | Strengths |
|-------|---------|-----------|
| **TabPFN** | Prior-fitted NN | Excellent for small datasets, no training needed |
| **CatBoost** | Gradient Boosting | Handles categorical features natively |
| **XGBoost** | Extreme Boosting | High performance, regularization |

### Training Pipeline

```bash
# Train individual models
python src/models/train_baseline.py
python src/models/train_catboost.py
python src/models/train_xgboost.py
python src/models/train_tabpfn.py

# Run full ensemble pipeline
python src/models/train_ensemble.py
```

### Feature Engineering

- **Patient Demographics**: Age, gender, comorbidities
- **Clinical Indicators**: Lab results, vital signs, diagnosis codes
- **Temporal Features**: Admission patterns, seasonality
- **Hospital Metrics**: Department load, staffing levels

---

## 📈 Performance

### Model Metrics

Our ensemble model achieves industry-leading performance:

| Metric | Score | Benchmark |
|--------|-------|-----------|
| **Accuracy** | 85.2% | ⭐⭐⭐⭐⭐ |
| **AUC-ROC** | 0.89 | ⭐⭐⭐⭐⭐ |
| **Precision** | 82.1% | ⭐⭐⭐⭐ |
| **Recall** | 79.8% | ⭐⭐⭐⭐ |
| **F1-Score** | 80.9% | ⭐⭐⭐⭐ |

### Performance Comparison

```
Baseline Model:     76.2% accuracy
CatBoost:           82.5% accuracy
XGBoost:            81.8% accuracy
TabPFN:             79.3% accuracy
------------------------
Ensemble (Ours):    85.2% accuracy ✨
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamdushanl/Hospital-Dashboard)

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_API_KEY=your_api_key

# Database (Optional)
DATABASE_URL=your_database_url

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## 📚 Documentation

Comprehensive guides to help you get started:

| Document | Description |
|----------|-------------|
| [📖 Beginner's Guide](BEGINNER_GUIDE.md) | Start here if you're new to the project |
| [💻 Code Walkthrough](CODE_WALKTHROUGH.md) | Deep dive into the codebase |
| [🤖 ML Concepts](ML_CONCEPTS.md) | Understanding the machine learning pipeline |
| [🚀 Deployment Guide](DEPLOYMENT.md) | Production deployment instructions |
| [🤝 Contributing](CONTRIBUTING.md) | How to contribute to the project |
| [📋 API Reference](API.md) | Complete API documentation |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute
```

---

## 👨‍💻 Author

<div align="center">

### **Dushan L**

[![GitHub](https://img.shields.io/badge/GitHub-@iamdushanl-181717?style=for-the-badge&logo=github)](https://github.com/iamdushanl)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/iamdushanl)

</div>

---

## 🙏 Acknowledgments

Special thanks to:

- **Healthcare Professionals** - For providing domain expertise
- **Open Source Community** - For amazing tools and libraries
- **TabPFN Team** - For the innovative prior-fitted network approach
- **Tremor React** - For beautiful dashboard components
- **Vercel** - For seamless deployment platform

---

## ⭐ Star History

If you find this project helpful, please consider giving it a star!

[![Star History Chart](https://api.star-history.com/svg?repos=iamdushanl/Hospital-Dashboard&type=Date)](https://star-history.com/#iamdushanl/Hospital-Dashboard&Date)

---

<div align="center">

### 💡 Built with passion for better healthcare analytics

**[⬆ Back to Top](#-hospital-analytics-dashboard)**

*Made with* ❤️ *by [Dushan L](https://github.com/iamdushanl)*

</div>
