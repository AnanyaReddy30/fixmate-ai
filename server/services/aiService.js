export const analyzeError = async (input) => {
  try {
    input = input.toLowerCase();

    // 🔥 CASE 1: map of undefined
    if (input.includes("map") && input.includes("undefined")) {
      return {
        explanation: "You are trying to use map() on an undefined variable.",
        cause: "The array is not initialized or data is not loaded yet.",
        fix: "Ensure the variable is an array before using map.",
        correctedCode: `const arr = [];
arr.map(x => x);`,
        tips: "Use optional chaining or default values.",
        confidence: 95,
        learning: {
          basic: "Check if variable exists before using it.",
          intermediate: "Use Array.isArray() for validation.",
          advanced: "Handle async data before rendering.",
        },
      };
    }

    // 🔥 CASE 2: async / fetch issue
    if (input.includes("fetch") || input.includes("async")) {
      return {
        explanation: "You may be accessing data before it loads.",
        cause: "Async data not handled properly.",
        fix: "Use async/await and wait for response.",
        correctedCode: `async function load() {
  const res = await fetch("/api");
  const data = await res.json();
  console.log(data);
}`,
        tips: "Always await API responses.",
        confidence: 90,
        learning: {
          basic: "Understand async functions.",
          intermediate: "Use try/catch.",
          advanced: "Handle loading states.",
        },
      };
    }

    // 🔥 CASE 3: syntax error
    if (input.includes("unexpected") || input.includes("syntax")) {
      return {
        explanation: "There is a syntax error in your code.",
        cause: "Missing bracket, comma, or incorrect structure.",
        fix: "Check syntax carefully.",
        correctedCode: `function add(a, b) {
  return a + b;
}`,
        tips: "Use code editor linting.",
        confidence: 85,
        learning: {
          basic: "Check brackets.",
          intermediate: "Use ESLint.",
          advanced: "Use TypeScript.",
        },
      };
    }

    // 🔥 DEFAULT (SMART GENERIC RESPONSE)
    return {
      explanation: "General issue detected in code.",
      cause: "Possible logic or runtime issue.",
      fix: "Debug step-by-step and check variables.",
      correctedCode: `// Review your code carefully
console.log("Debugging...");`,
      tips: "Use console.log to trace values.",
      confidence: 70,
      learning: {
        basic: "Check inputs.",
        intermediate: "Validate data flow.",
        advanced: "Use debugging tools.",
      },
    };

  } catch (error) {
    return {
      explanation: "Unexpected error occurred.",
      cause: error.message,
      fix: "Check logs and inputs.",
      correctedCode: "",
      tips: "Handle edge cases.",
      confidence: 50,
      learning: {
        basic: "Check errors.",
        intermediate: "Use try/catch.",
        advanced: "Improve error handling.",
      },
    };
  }
};