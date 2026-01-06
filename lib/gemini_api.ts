
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Inisialisasi klien Gemini
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
import {
  GoogleGenAI,
  GoogleGenAIOptions,
  Content,
  Part,
  CreateChatParameters,
  FunctionDeclaration,
  FunctionCallingConfigMode,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentParameters,
  GenerateImagesParameters,
  EmbedContentParameters,
  SafetySetting,
  Tool,
  UploadFileParameters,
  DownloadFileParameters,
} from '@google/genai';

// Konfigurasi SDK
const options: GoogleGenAIOptions = {
  apiKey: process.env.GEMINI_API_KEY || "",
  vertexai: false,
};
const ai = new GoogleGenAI(options);

// Contoh input chat/text/image
const content: Content = {
  role: 'user',
  parts: [{ text: 'Halo Gemini, buat puisi tentang AI.' } as Part],
};

// Function Calling
const functionDeclaration: FunctionDeclaration = {
  name: 'getWeather',
  parametersJsonSchema: {
    type: 'object',
    properties: { location: { type: 'string' } },
    required: ['location'],
  },
};
const functionConfig = {
  mode: FunctionCallingConfigMode.ANY,
  allowedFunctionNames: ['getWeather'],
};

// Generate text
const textParams: GenerateContentParameters = {
  model: 'gemini-pro',
  contents: [content],
};

// Generate image
const imageParams: GenerateImagesParameters = {
  model: 'gemini-pro-vision',
  prompt: 'Halo Gemini, buat puisi tentang AI.',
};

// Embedding
const embedParams: EmbedContentParameters = {
  model: 'text-embedding-004',
  contents: [content],
};

// Safety
const safety: SafetySetting = {
  category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
};

// Tool (Google Search)
const tool: Tool = {
  googleSearch: {},
};

// File upload/download
const uploadConfig: UploadFileParameters = {
  file: new File(["isi file"], "file.txt"),
};
const downloadConfig: DownloadFileParameters = {
  file: "file_id",
  downloadPath: "output.txt",
};

// Implementasi API
// Fungsi image AI yang menerima prompt dari client dan membalas otomatis
export async function generateImageFromClientPrompt(clientPrompt: string) {
  const imageParams = {
    model: 'models/gemini-1.5-pro',
    prompt: clientPrompt,
  };
  return await ai.models.generateImages(imageParams);
}

/**
 * Generate teks dengan Gemini
 * @param prompt string
 * @returns Promise<string>
 */
export async function generateGeminiText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
  return result.response.text();
}

/**
 * Generate gambar dengan Gemini
 * @param prompt string
 * @returns Promise<string> (base64 image)
 */
export async function generateGeminiImage(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
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
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
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
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
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
