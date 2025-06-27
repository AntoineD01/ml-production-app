'use client';

import { useState } from 'react';

export default function Home() {
  const [features, setFeatures] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: ""
  });
  const [prediction, setPrediction] = useState<string | null>(null);

  async function handleSubmit() {
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sepal_length: parseFloat(features.sepal_length),
        sepal_width: parseFloat(features.sepal_width),
        petal_length: parseFloat(features.petal_length),
        petal_width: parseFloat(features.petal_width)
      })
    });
    const data = await res.json();
    setPrediction(data.prediction);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Iris Classifier</h1>
      <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
        <input placeholder="Sepal Length" value={features.sepal_length} onChange={e => setFeatures({...features, sepal_length: e.target.value})} />
        <input placeholder="Sepal Width" value={features.sepal_width} onChange={e => setFeatures({...features, sepal_width: e.target.value})} />
        <input placeholder="Petal Length" value={features.petal_length} onChange={e => setFeatures({...features, petal_length: e.target.value})} />
        <input placeholder="Petal Width" value={features.petal_width} onChange={e => setFeatures({...features, petal_width: e.target.value})} />
        <button onClick={handleSubmit}>Predict</button>
      </div>
      {prediction && <p>Prediction: {prediction}</p>}
    </main>
  );
}
