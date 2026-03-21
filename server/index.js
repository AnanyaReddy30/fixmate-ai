import express from "express";
import cors from "cors";
import { analyzeError } from "./services/aiService.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("FixMate AI Server Running 🚀");
});

// ✅ Main API route
app.post("/api/debug", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        error: "Input is required",
      });
    }

    const result = await analyzeError(input);

    res.json(result);
  } catch (err) {
    console.log("SERVER ERROR:", err.message);

    res.status(500).json({
      explanation: "Server error occurred.",
      cause: err.message,
      fix: "Check backend logs.",
      correctedCode: "",
      tips: "Ensure server is running correctly.",
      confidence: 50,
      learning: {
        basic: "Check request input.",
        intermediate: "Handle errors properly.",
        advanced: "Improve backend stability.",
      },
    });
  }
});

// ✅ PORT (CRITICAL for Render)
const PORT = process.env.PORT || 5005;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});