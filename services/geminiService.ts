import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeSpark = async (topic: string): Promise<string> => {
  try {
    const prompt = `
      Jesteś przyjacielskim, motywacyjnym mentorem z "Synapse Creative".
      Użytkownik podał temat: "${topic}".
      Wygeneruj krótką, inspirującą myśl (max 2 zdania) oraz jeden kreatywny pomysł na działanie związane z tym tematem.
      Styl: ciepły, energetyczny, wspierający, po polsku.
      Nie używaj markdown, po prostu czysty tekst.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep thought for this interaction
      }
    });

    return response.text || "Brak odpowiedzi z synapsy. Spróbuj ponownie!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Moje synapsy są chwilowo przeciążone. Spróbuj za chwilę!";
  }
};