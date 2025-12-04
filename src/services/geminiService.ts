import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY // đặt trong .env

const genAI = new GoogleGenerativeAI(API_KEY)

// Hàm sinh text từ prompt
export const generateText = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) // hoặc gemini-pro
  const result = await model.generateContent(prompt)
  return result.response.text()
}
