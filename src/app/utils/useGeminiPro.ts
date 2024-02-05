"use server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function runGemini(yourText: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = yourText;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
