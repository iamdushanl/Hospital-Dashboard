# Hospital Analytics Dashboard 🏥

A comprehensive hospital data analytics platform powered by advanced machine learning models for patient readmission prediction and real-time insights.

## 🎯 Overview

This project combines modern web technologies with state-of-the-art machine learning to provide healthcare professionals with actionable insights. The dashboard offers real-time patient analytics, readmission risk prediction, and interactive visualizations for data-driven decision making.

## ✨ Key Features

### 📊 Analytics & Visualization
- **Real-time Metrics**: Live patient counts, readmission rates, and OPD visit statistics
- **Interactive Dashboards**: Dynamic charts for trends, department loads, and risk distribution
- **Predictive Analytics**: AI-powered patient readmission risk assessment
- **Data Exploration**: Interactive notebooks for EDA and model analysis

### 🤖 Machine Learning Models
- **TabPFN**: Prior-fitted network for tabular data
- **CatBoost**: Gradient boosting on decision trees
- **XGBoost**: Extreme gradient boosting
- **Ensemble Methods**: Combined model predictions for improved accuracy

### 🎨 Modern UI/UX
- Beautiful gradient design with dark mode support
- Responsive layout for all device sizes
- Built with Tremor React components
- Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for ML models)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamdushanl/Hospital-Dashboard.git
   cd Hospital-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the dashboard**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tremor React** - Dashboard component library
- **Tailwind CSS** - Utility-first CSS framework

### Backend & ML
- **Python 3.11** - ML model development
- **CatBoost** - Gradient boosting
- **XGBoost** - Extreme gradient boosting
- **TabPFN** - Tabular prediction network
- **Pandas & NumPy** - Data processing
- **Scikit-learn** - ML utilities

### Data Processing
- **Parquet** - Efficient data storage
- **Advanced Preprocessing** - Feature engineering pipeline
- **Data Deidentification** - Privacy-preserving transformations

## 📦 Project Structure

```
Hospital-Dashboard/
├── dashboard/          # Flask dashboard application
├── data/              
│   ├── processed/     # Cleaned and processed datasets
│   └── sample/        # Sample data for testing
├── notebooks/         # Jupyter notebooks for analysis
├── reports/           # Model evaluation reports
├── scripts/           # Data processing scripts
├── src/
│   ├── etl/          # Extract, transform, load pipelines
│   ├── models/       # ML model training scripts
│   └── utils/        # Utility functions
├── tests/            # Unit tests
└── web-dashboard/    # Next.js web application
```

## 🧪 Model Training

Train individual models or run the entire pipeline:

```bash
# Train baseline model
python src/models/train_baseline.py

# Train CatBoost
python src/models/train_catboost.py

# Train XGBoost
python src/models/train_xgboost.py

# Train TabPFN
python src/models/train_tabpfn.py
```

## 📈 Performance

Our ensemble model achieves:
- **Accuracy**: 85%+
- **AUC-ROC**: 0.89
- **Precision**: 82%
- **Recall**: 80%

## 🚀 Deployment

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iamdushanl/Hospital-Dashboard)

Or using Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📚 Documentation

- [Beginner's Guide](BEGINNER_GUIDE.md) - Start here if you're new
- [Code Walkthrough](CODE_WALKTHROUGH.md) - Detailed code explanation
- [ML Concepts](ML_CONCEPTS.md) - Machine learning fundamentals
- [Deployment Guide](DEPLOYMENT.md) - Production deployment steps
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dushan L**
- GitHub: [@iamdushanl](https://github.com/iamdushanl)
- Repository: [Hospital-Dashboard](https://github.com/iamdushanl/Hospital-Dashboard)

## 🙏 Acknowledgments

- Built with modern ML frameworks and best practices
- Inspired by healthcare analytics needs
- Designed for scalability and performance

---

**Made with ❤️ for better healthcare analytics**
