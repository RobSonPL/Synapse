import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Executes an async operation with exponential backoff retry logic.
 * @param operation The async function to execute
 * @param maxRetries Maximum number of retries (default 3)
 * @param baseDelay Base delay in ms (default 1000ms)
 */
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
      
      // Determine if error is retryable.
      // Usually we retry on 5xx (server errors) or 429 (too many requests).
      // Assuming generic network errors don't have a status or have specific codes.
      const status = error.status || error.response?.status;
      const isRetryable = !status || status >= 500 || status === 429;

      if (!isRetryable || i === maxRetries - 1) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, i); // 1s, 2s, 4s...
      console.warn(`Gemini API attempt ${i + 1} failed. Retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

export const generateCreativeSpark = async (topic: string): Promise<string> => {
  try {
    const prompt = `
      Jesteś przyjacielskim, motywacyjnym mentorem z "Synapse Creative".
      Użytkownik podał temat: "${topic}".
      Wygeneruj krótką, inspirującą myśl (max 2 zdania) oraz jeden kreatywny pomysł na działanie związane z tym tematem.
      Styl: ciepły, energetyczny, wspierający, po polsku.
      Nie używaj markdown, po prostu czysty tekst.
    `;

    // Wrap the API call with the retry logic
    const response: GenerateContentResponse = await retryOperation(() => 
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 } // Speed over deep thought for this interaction
        }
      })
    );

    return response.text || "Brak odpowiedzi z synapsy. Spróbuj ponownie!";
  } catch (error) {
    console.error("Gemini Error after retries:", error);
    return "Moje synapsy są chwilowo przeciążone. Spróbuj za chwilę!";
  }
};