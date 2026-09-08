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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    const prompt = `
      Jesteś przyjacielskim, motywacyjnym mentorem z "Synapse Creative".
      Użytkownik podał temat: "${topic}".
      Wygeneruj krótką, inspirującą myśl (max 2 zdania) oraz jeden kreatywny pomysł na działanie związane z tym tematem.
      Styl: ciepły, energetyczny, wspierający, po polsku.
    `;

    const response: GenerateContentResponse = await retryOperation(() => 
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    );

    return response.text || "Brak odpowiedzi z synapsy. Spróbuj ponownie!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Moje synapsy są chwilowo przeciążone. Spróbuj za chwilę!";
  }
};

export interface EbookOutlineResult {
  title: string;
  subtitle: string;
  targetAudience: string;
  coverDescription: string;
  hook: string;
  chapters: Array<{ number: number; title: string; takeaway: string }>;
  leadMagnetIdea: string;
}

export const generateEbookOutline = async (
  topic: string,
  audience: string
): Promise<EbookOutlineResult> => {
  const fallback: EbookOutlineResult = {
    title: `Kompletny Przewodnik: ${topic}`,
    subtitle: "Jak połączyć psychologię decyzji z nowoczesnymi narzędziami cyfrowymi",
    targetAudience: audience || "Przedsiębiorcy i liderzy biznesu",
    coverDescription: "Minimalistyczny styl cyberpunk / dark luxury, neonowe akcenty cyan i głęboki fiolet na tle struktury sieci neuronowej 3D.",
    hook: "Większość tradycyjnych poradników trafia do kosza po 3 stronach. Ten konspekt zaprojektowano według zasad narracji hipnotycznej, która prowadzi czytelnika prosto do konwersji.",
    chapters: [
      { number: 1, title: "Nowy Paradygmat w Twojej Branży", takeaway: "Zrozumienie dlaczego stare metody przestały przynosić zyski." },
      { number: 2, title: "Psychologia Decyzji Współczesnego Klienta", takeaway: "Co naprawdę wywołuje impuls zakupowy." },
      { number: 3, title: "Fundamenty Architektury Informacji", takeaway: "Projektowanie ścieżki czytelnika z zerowym tarciem poznawczym." },
      { number: 4, title: "Agenci AI jako Dźwignia Efektywności", takeaway: "Delegowanie powtarzalnych etapów generowania treści." },
      { number: 5, title: "Storytelling, który Buduje Niepodważalny Autorytet", takeaway: "Struktura monomitu w komunikacji B2B." },
      { number: 6, title: "Wizualna Hipnoza: Skład i Typografia 2030", takeaway: "Jak layout wpływa na postrzeganą wartość oferty." },
      { number: 7, title: "System Dystrybucji i Lejek Konwersji", takeaway: "Zamiana czytelnika w lojalnego, płacącego klienta." },
      { number: 8, title: "Analiza Metryk i Skalowanie Wdrożenia", takeaway: "Automatyzacja pomiaru zaangażowania i lead nurturing." }
    ],
    leadMagnetIdea: "Interaktywny arkusz audytu wdrożenia oraz gotowe checklisty promptów dla zespołu."
  };

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `
      Jesteś Dyrektorem Kreatywnym agencji Synapse Creative specjalizującej się w e-bookach premium, storytellingu i automatyzacjach AI.
      Klient chce stworzyć prestiżowy e-book.
      Temat: "${topic}"
      Grupa docelowa: "${audience || 'Klienci biznesowi B2B'}"

      Wygeneruj kompletny, porywający konspekt e-booka w czystym formacie JSON (bez bloków markdown \`\`\`json, wyłącznie poprawny obiekt JSON):
      {
        "title": "Chwytliwy, magnetyczny tytuł",
        "subtitle": "Profesjonalny podtytuł obiecujący transformację",
        "targetAudience": "Opis grupy docelowej",
        "coverDescription": "Opis stylistyki okładki (paleta kolorów, kompozycja, typografia)",
        "hook": "Wstęp narracyjny (2 zdania) rozpalający ciekawość",
        "chapters": [
          {"number": 1, "title": "Tytuł rozdziału", "takeaway": "Główna korzyść / lekcja"},
          ... (dokładnie 8 rozdziałów)
        ],
        "leadMagnetIdea": "Pomysł na dodatek / bonus generujący leady wewnątrz książki"
      }
    `;

    const response: GenerateContentResponse = await retryOperation(() => 
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          responseMimeType: 'application/json'
        }
      })
    );

    const text = response.text?.trim();
    if (!text) return fallback;

    // Clean any markdown formatting if present
    const cleanJson = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      title: parsed.title || fallback.title,
      subtitle: parsed.subtitle || fallback.subtitle,
      targetAudience: parsed.targetAudience || fallback.targetAudience,
      coverDescription: parsed.coverDescription || fallback.coverDescription,
      hook: parsed.hook || fallback.hook,
      chapters: Array.isArray(parsed.chapters) ? parsed.chapters : fallback.chapters,
      leadMagnetIdea: parsed.leadMagnetIdea || fallback.leadMagnetIdea
    };
  } catch (err) {
    console.warn("Gemini Ebook Outline error, using curated fallback:", err);
    return fallback;
  }
};

export interface BusinessAuditResult {
  healthScore: number;
  summary: string;
  quickWins: string[];
  automationSteps: Array<{ title: string; tech: string; impact: string }>;
  storytellingAdvice: string;
}

export const generateBusinessAudit = async (
  businessOrUrl: string,
  challenges: string[]
): Promise<BusinessAuditResult> => {
  const fallback: BusinessAuditResult = {
    healthScore: 74,
    summary: `Analiza dla "${businessOrUrl}": Zidentyfikowano znaczny potencjał oszczędności czasu poprzez wdrożenie agentów obsługi klienta i nowoczesnej architektury PWA z redukcją czasu ładowania.`,
    quickWins: [
      "Wdrożenie automatycznego autorespondera z kwalifikacją leadów w CRM",
      "Kompresja multimediów do formatu WebP z asynchronicznym ładowaniem skryptów analitycznych",
      "Dodanie wyrazistych mikro-interakcji i CTA nad linią zanurzenia (Above The Fold)"
    ],
    automationSteps: [
      { title: "Inteligentny Asystent FAQ & Oferty", tech: "Gemini 2.5 + Make/n8n", impact: "Zaoszczędzone ~18h tygodniowo na powtarzalnych mailach" },
      { title: "Zintegrowany Lejek Leadów w Firestore", tech: "Firebase Firestore + PWA Sync", impact: "Zero utraconych zapytań nawet w trybie offline" },
      { title: "Automatyczny Generator Wycen PDF", tech: "Node.js + Szablony HTML/CSS", impact: "Odpowiedź do klienta w 3 minuty zamiast 24h" }
    ],
    storytellingAdvice: "Zastąp generyczne komunikaty o doświadczeniu konkretnymi case studies pokazującymi metamorfozę klienta w formacie 'Przed vs Po'."
  };

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `
      Jesteś Głównym Konsultantem Transformacji Cyfrowej w Synapse Creative.
      Klient zgłosił biznes/stronę: "${businessOrUrl}".
      Wyzwania: ${challenges.join(', ')}.

      Wygeneruj natychmiastowy mini-audyt biznesowo-techniczny w czystym JSON (bez markdown \`\`\`json):
      {
        "healthScore": liczba od 55 do 85,
        "summary": "Krótkie podsumowanie stanu obecnego (2 zdania)",
        "quickWins": ["Szybki zysk 1 (do 48h)", "Szybki zysk 2", "Szybki zysk 3"],
        "automationSteps": [
          {"title": "Nazwa automatyzacji", "tech": "Użyta technologia AI / no-code", "impact": "Mierzalny efekt dla biznesu"},
          {"title": "Nazwa automatyzacji 2", "tech": "Technologia", "impact": "Efekt"},
          {"title": "Nazwa automatyzacji 3", "tech": "Technologia", "impact": "Efekt"}
        ],
        "storytellingAdvice": "Jedna kluczowa rekomendacja narracyjno-wizualna zwiększająca konwersję"
      }
    `;

    const response: GenerateContentResponse = await retryOperation(() => 
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          responseMimeType: 'application/json'
        }
      })
    );

    const text = response.text?.trim();
    if (!text) return fallback;

    const cleanJson = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      healthScore: parsed.healthScore || fallback.healthScore,
      summary: parsed.summary || fallback.summary,
      quickWins: Array.isArray(parsed.quickWins) ? parsed.quickWins : fallback.quickWins,
      automationSteps: Array.isArray(parsed.automationSteps) ? parsed.automationSteps : fallback.automationSteps,
      storytellingAdvice: parsed.storytellingAdvice || fallback.storytellingAdvice
    };
  } catch (err) {
    console.warn("Gemini Audit error, using fallback:", err);
    return fallback;
  }
};
