# Credit Risk Prediction

An end-to-end data science project for predicting customer credit default risk.

## Business Problem

A financial institution wants to identify customers who are at higher risk of defaulting on their credit payments.

The objective of this project is to build a machine learning pipeline that:

1. Understands customer financial data
2. Performs data quality checks
3. Explores relationships between customer characteristics and default
4. Engineers predictive features
5. Builds baseline and advanced machine learning models
6. Evaluates predictive performance
7. Examines probability calibration
8. Explains model predictions
9. Evaluates financial implications
10. Considers responsible AI and model risk
11. Prepares the model for deployment and monitoring

## Dataset

The initial dataset is the UCI Credit Card Default dataset.

The raw dataset is intentionally excluded from Git because the repository stores code, documentation, and analysis rather than distributing the original dataset.

## Project Structure

```text
credit-risk-project/
│
├── data/
│   ├── raw/          # Original datasets (not committed)
│   ├── processed/    # Cleaned datasets
│   └── external/     # External reference data
│
├── notebooks/        # Exploratory and analytical notebooks
├── src/              # Reusable Python source code
├── models/           # Trained model artifacts
├── reports/          # Analysis and project reports
├── dashboard/        # Business-facing dashboard
├── tests/            # Unit and data-quality tests
│
├── .gitignore
├── requirements.txt
└── README.md

