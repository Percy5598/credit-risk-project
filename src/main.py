from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.staticfiles import StaticFiles


# Load model when the application starts
model = joblib.load(
    "notebooks/credit_risk_model.pkl"
)

threshold = float(
    joblib.load(
        "notebooks/best_threshold.pkl"
    )
)


app = FastAPI(
    title="Credit Risk Prediction API",
    description="Credit risk prediction using machine learning.",
    version="1.0.0"
)


class LoanApplication(BaseModel):
    person_age: int
    person_income: float
    person_home_ownership: str
    person_emp_length: float
    loan_intent: str
    loan_grade: str
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_default_on_file: str
    cb_person_cred_hist_length: int


@app.post("/predict")
def predict(data: LoanApplication):

    input_df = pd.DataFrame([
        data.model_dump()
    ])

    probability = float(
        model.predict_proba(input_df)[0, 1]
    )

    prediction = int(
        probability >= threshold
    )

    return {
        "default_probability": probability,
        "default_prediction": prediction,
        "threshold": threshold,
        "Result": (
            "High Risk"
            if prediction == 1
            else "Low Risk"
        )
    }


app.mount(
    "/",
    StaticFiles(
        directory="static",
        html=True
    ),
    name="static"
)