import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 👉 your existing rule-based function (keep it)
function ruleEngine(input, rawInput) {
  // ...your existing conditions...
  // return null if no strong match
  return null;
}

export const analyzeError = async (input) => {
  const rawInput = input;
  const lower = input.toLowerCase();

  // 1. Try rules first (fast + cheap)
  const ruleResult = ruleEngine(lower, rawInput);
  if (ruleResult) return ruleResult;

  // 2. Fallback to AI (smart)
  try {
    const prompt = `
You are FixMate AI.

Analyze this code/error:
${rawInput}

Return STRICT JSON:
{
 "explanation": "...",
 "cause": "...",
 "fix": "...",
 "correctedCode": "...",
 "tips": "...",
 "confidence": number,
 "learning": {
   "basic": "...",
   "intermediate": "...",
   "advanced": "..."
 }
}
`;

    const res = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt
    });

    const text = res.output[0].content[0].text;

    // safe parse
    const parsed = JSON.parse(text);

    return parsed;

  } catch (e) {
    return {
      explanation: "AI fallback failed.",
      cause: "Parsing or API issue.",
      fix: "Check API key or response format.",
      correctedCode: rawInput,
      tips: "Retry with valid input.",
      confidence: 50,
      learning: {
        basic: "Check input format.",
        intermediate: "Validate API response.",
        advanced: "Handle JSON parsing safely."
      }
    };
  }
};