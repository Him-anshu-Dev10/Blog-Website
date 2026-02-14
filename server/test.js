import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}

const test = async () => {
  try {
    const result = await main("Say hello");
    console.log("Gemini response:", result);
  } catch (error) {
    console.error("Test error:", error.message);
  }
};

test();
