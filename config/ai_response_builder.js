import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const gemini_api_key = process.env.API_KEY;
// console.log("🚀 ~ gemini_api_key:", gemini_api_key);

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

const generate = async (subject, body) => {
  try {
    const prompt = `You are an AI language model specialized in crafting professional 
    email responses. Please read the following email carefully and generate a professional and well-structured response. The response should reference the details provided in the email and address any questions or concerns mentioned. 
    Ensure the tone is polite, formal, and clear. Do not leave any blank fields in the generated response,Also add ---- at the end of subject, give me a well aligned response email which could directly be send 
    via email without any formatting 
    Email :
    Subject:${subject}
    ${body}
    response should be in this format:
    Subject:<subject> ----
    <body of email>`;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response.text();
    // console.log(`Generative AI response : `, response);
    return response;
  } catch (err) {
    console.error("response error", err);
  }
};

export { generate };
