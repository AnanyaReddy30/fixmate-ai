import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeError = async (input) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
Return ONLY valid JSON. No explanation outside JSON.

Analyze this code/error:
${input}

Return in this format:

{
  "explanation": "",
  "cause": "",
  "fix": "",
  "correctedCode": "",
  "tips": "",
  "confidence": 0,
  "learning": {
    "basic": "",
    "intermediate": "",
    "advanced": ""
  }
}
      `,
    });

    const text = response.output[0].content[0].text;

    // 🧠 SAFE PARSE
    try {
      return JSON.parse(text);
    } catch (err) {
      console.log("JSON parse failed, raw output:", text);

      return {
        explanation: "AI returned non-JSON response.",
        cause: "Model formatting issue.",
        fix: "Improve prompt or parsing.",
        correctedCode: text,
        tips: "Check logs for raw output.",
        confidence: 60,
        learning: {
          basic: "Ensure correct format",
          intermediate: "Use structured prompts",
          advanced: "Use JSON schema validation"
        }
      };
    }

  } catch (error) {
    console.log("OPENAI ERROR:", error.message);

    return {
      explanation: "AI request failed.",
      cause: error.message,
      fix: "Check API key or quota.",
      correctedCode: "",
      tips: "Verify environment variables.",
      confidence: 30,
      learning: {
        basic: "Check API",
        intermediate: "Handle errors",
        advanced: "Implement retries"
      }
    };
  }
};