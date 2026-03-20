import express from "express";
import { analyzeError } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    const result = await analyzeError(input);

    // ✅ SEND CLEAN STRUCTURED DATA (NOT STRING)
    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      explanation: "Server error",
      cause: "",
      fix: "",
      correctedCode: "",
      tips: "",
      confidence: 0
    });
  }
});

export default router;