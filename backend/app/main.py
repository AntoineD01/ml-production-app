from fastapi import FastAPI
from pydantic import BaseModel
from .model_utils import load_latest_model

app = FastAPI()

class IrisFeatures(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.get("/")
def read_root():
    return {"message": "Welcome to the Iris Classifier API!"}

@app.post("/predict")
def predict(features: IrisFeatures):
    model = load_latest_model()
    input_data = [[
        features.sepal_length,
        features.sepal_width,
        features.petal_length,
        features.petal_width
    ]]
    prediction = model.predict(input_data)
    return {"prediction": prediction[0]}
