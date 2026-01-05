
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCX0WNAy9nlYQPbc_qDpSL_a3Rpv-KodQY";

// Inisialisasi klien Gemini
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Generate teks dengan Gemini
 * @param prompt string
 * @returns Promise<string>
 */
export async function generateGeminiText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/**
 * Generate gambar dengan Gemini
 * @param prompt string
 * @returns Promise<string> (base64 image)
 */
export async function generateGeminiImage(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
  // result.response.candidates[0].content.parts[0].inlineData.data (base64)
  return result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
}

/**
 * Pemahaman gambar (image understanding)
 * @param imageBase64 string
 * @returns Promise<string>
 */
export async function understandGeminiImage(imageBase64: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ inlineData: { data: imageBase64, mimeType: "image/png" } }] }],
  });
  return result.response.text();
}

/**
 * Function calling (panggilan fungsi)
 * @param prompt string
 * @param functions array
 * @returns Promise<any>
 */
export async function geminiFunctionCalling(prompt: string, functions: any[]): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    tools: functions,
  });
  return result.response;
}

/**
 * Embedding (representasi vektor)
 * @param text string
 * @returns Promise<number[]>
 */
export async function geminiEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.embedContent({ content: { role: "user", parts: [{ text }] } });
  return result.embedding.values;
}

/**
 * Penanganan error Gemini API
 * @param fn async function
 * @returns Promise<any>
 */
export async function safeGeminiCall<T>(fn: () => Promise<T>): Promise<T | { error: string }> {
  try {
    return await fn();
  } catch (err: any) {
    return { error: err?.message || "Unknown Gemini API error" };
  }
}

/**
 * Dokumentasi Gemini API
 *
 * 1. Dapatkan API key di Google AI Studio
 * 2. Install SDK: npm install @google/genai
 * 3. Set env: GEMINI_API_KEY=your_api_key
 * 4. Fitur utama:
 *    - generateGeminiText(prompt)
 *    - generateGeminiImage(prompt)
 *    - understandGeminiImage(imageBase64)
 *    - geminiFunctionCalling(prompt, functions)
 *    - geminiEmbedding(text)
 *    - safeGeminiCall(fn)
 * 5. Referensi resmi:
 *    - https://ai.google.dev/gemini-api/docs/quickstart?hl=id
 *    - https://ai.google.dev/gemini-api/docs/text-generation?hl=id
 *    - https://ai.google.dev/gemini-api/docs/image-generation?hl=id
 *    - https://ai.google.dev/gemini-api/docs/function-calling?hl=id
 *    - https://ai.google.dev/gemini-api/docs/embeddings?hl=id
 */
