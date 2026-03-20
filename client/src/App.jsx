import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!input) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5005/api/debug", {
        input,
      });

      setResponse(res.data);
    } catch (err) {
      alert("Error connecting to server");
    }

    setLoading(false);
  };

  const demoInput = () => {
    setInput(`let users;

async function load() {
  const res = await fetch("/api");
  const data = await res.json();
  users = data.users;
}

console.log(users.map(user => user.name));`);
  };

  return (
    <div className="app">

      <h1>⚡ FixMate AI</h1>
      <p className="tagline">
        Your AI partner for debugging, explaining, and fixing code intelligently
      </p>

      <div className="top-bar">
        <button onClick={demoInput}>Try Demo</button>
      </div>

      <textarea
        placeholder="Paste your error or code here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="analyze-btn" onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && <div className="loader"></div>}

      {response && (
        <div className="output">

          <div className="card">
            <h3>🔍 Explanation</h3>
            <p>{response.explanation}</p>
          </div>

          <div className="card">
            <h3>⚠️ Root Cause</h3>
            <p>{response.cause}</p>
          </div>

          <div className="card">
            <h3>🛠 Fix</h3>
            <p>{response.fix}</p>
          </div>

          <div className="card code">
            <h3>💻 Corrected Code</h3>
            <pre>
              {response.correctedCode?.split("\n").map((line, i) => (
                <div key={i}>
                  <span className="line">{i + 1}</span> {line}
                </div>
              ))}
            </pre>
          </div>

          <div className="card">
            <h3>💡 Tips</h3>
            <p>{response.tips}</p>
          </div>

          <div className="card">
            <h3>📊 Confidence</h3>
            <p>{response.confidence}%</p>
          </div>

          <div className="levels">
            <div className="level green">
              <h4>🟢 Basic</h4>
              <p>{response.learning?.basic}</p>
            </div>

            <div className="level yellow">
              <h4>🟡 Intermediate</h4>
              <p>{response.learning?.intermediate}</p>
            </div>

            <div className="level red">
              <h4>🔴 Advanced</h4>
              <p>{response.learning?.advanced}</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;