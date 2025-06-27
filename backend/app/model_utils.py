import mlflow.pyfunc

def load_latest_model():
    return mlflow.pyfunc.load_model("models:/iris_classifier/latest")
