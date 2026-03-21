import { useState } from "react";
import axios from "axios";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://fixmate-ai.onrender.com/api/debug",
        { input }
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 FixMate AI</h1>

      <textarea
        style={styles.textarea}
        placeholder="Paste your error or code..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button style={styles.button} onClick={handleAnalyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {data && (
        <div style={styles.output}>
          <Card title="🔍 Explanation" text={data.explanation} />
          <Card title="⚠️ Root Cause" text={data.cause} />
          <Card title="🛠 Fix" text={data.fix} />

          <Card
            title="💻 Corrected Code"
            text={data.correctedCode}
            code
          />

          <Card title="💡 Tips" text={data.tips} />

          <div style={styles.confidence}>
            Confidence: {data.confidence}%
          </div>

          <div style={styles.learning}>
            <p><b>🟢 Basic:</b> {data.learning?.basic}</p>
            <p><b>🟡 Intermediate:</b> {data.learning?.intermediate}</p>
            <p><b>🔴 Advanced:</b> {data.learning?.advanced}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, text, code }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      {code ? <pre>{text}</pre> : <p>{text}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "sans-serif",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    height: "150px",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  output: {
    marginTop: "30px",
  },
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
  },
  confidence: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  learning: {
    marginTop: "10px",
  },
};