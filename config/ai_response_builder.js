import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const gemini_api_key = process.env.API_KEY;

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2000,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

const generate = async () => {
  try {
    const prompt = "Tell me about google.";
    const result = await geminiModel.generateContent(prompt);
    const response = result.response.text();
    console.log(`Generative AI response : `, response);
    return response;
  } catch (err) {
    console.error("response error", err);
  }
};

generate();
