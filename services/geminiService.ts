import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      const status = error.status || error.response?.status;
      const isRetryable = !status || status >= 500 || status === 429;

      if (!isRetryable || i === maxRetries - 1) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

export const generateCreativeSpark = async (topic: string): Promise<string> => {
  try {
    // Initialize GoogleGenAI right before the call to ensure the latest API key from process.env is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      Jesteś przyjacielskim, motywacyjnym mentorem z "Synapse Creative".
      Użytkownik podał temat: "${topic}".
      Wygeneruj krótką, inspirującą myśl (max 2 zdania) oraz jeden kreatywny pomysł na działanie związane z tym tematem.
      Styl: ciepły, energetyczny, wspierający, po polsku.
    `;

    const response: GenerateContentResponse = await retryOperation(() => 
      ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    );

    // Using .text property directly as it is the standard way to extract output in the latest SDK.
    return response.text || "Brak odpowiedzi z synapsy. Spróbuj ponownie!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Moje synapsy są chwilowo przeciążone. Spróbuj za chwilę!";
  }
};