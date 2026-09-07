import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const FALLBACK_QUOTES = [
  "Onderzoek doen is niet alleen het vinden van pasklare antwoorden, maar vooral het leren stellen van de juiste vragen.",
  "Echte professionele vooruitgang ontstaat op het snijvlak waar theorie, technologie en praktijk elkaar ontmoeten.",
  "Kritisch reflecteren en gestructureerd onderzoeken zijn de meest waardevolle skills voor de marketeer van morgen.",
  "Wie durft te experimenteren met nieuwe AI-tools én oog houdt voor ethiek, bouwt aan een toekomstbestendige basis.",
  "Elke bron die je verifieert en elke reflectie die je opschrijft, brengt je dichter bij gefundeerd vakmanschap.",
  "Blijf nieuwsgierig: een goede HBO-professional analyseert niet alleen wat kan, maar vraagt zich af wat écht waarde toevoegt.",
  "Succesvol studeren is geen sprint van deadlines, maar een continu proces van doelgericht leren en bijsturen.",
  "De beste data is waardeloos zonder een scherpe, ethisch verantwoorde interpretatie door de marketeer.",
  "Kwaliteit begint waar aannames stoppen: verifieer, onderbouw en leer elke dag iets nieuws bij.",
  "Technologie verandert razendsnel, maar een kritische academische houding blijft altijd actueel en relevant."
];

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Fast timeout helper to avoid hanging on slow/unavailable models
function withTimeout<T>(promise: Promise<T>, ms = 3500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)),
  ]);
}

// Resilient generation with fallback across stable flash models
async function generateQuoteWithAi(ai: GoogleGenAI): Promise<string | null> {
  const models = ["gemini-2.5-flash", "gemini-3.8-flash", "gemini-flash-latest"];
  const prompt =
    "Genereer één enkele, korte, krachtige en motiverende spreuk in het Nederlands (maximaal 25 woorden) die past bij een HBO-student die bezig is met leren, praktijkgericht onderzoek en persoonlijke professionele ontwikkeling. Geef ALLEEN de spreuktekst terug, zonder aanhalingstekens en zonder inleidende tekst.";

  for (const model of models) {
    try {
      const response = await withTimeout(
        ai.models.generateContent({
          model,
          contents: prompt,
        }),
        3500
      );

      const text = response.text ? response.text.trim().replace(/^["'«»“”„]+|["'«»“”„]+$/g, '') : null;
      if (text && text.length > 8) {
        return text;
      }
    } catch (err: any) {
      const status = err?.status || err?.code || err?.message || 'unavailable';
      console.warn(`[Quote Service] Model ${model} unavailable (${status}).`);
    }
  }

  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for daily quote
  app.get("/api/quote", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        return res.json({
          quote: randomQuote,
          author: "Inspiratie voor HBO-studenten",
          source: "fallback",
        });
      }

      const generatedQuote = await generateQuoteWithAi(ai);

      if (!generatedQuote) {
        const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
        return res.json({
          quote: randomQuote,
          author: "Inspiratie voor HBO-studenten",
          source: "fallback",
        });
      }

      return res.json({
        quote: generatedQuote,
        author: "Google AI",
        source: "gemini",
      });
    } catch (error: any) {
      console.warn("[Quote Service] Gemini unavailable, served curated motivational quote seamlessly:", error?.message || error);
      const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      return res.json({
        quote: randomQuote,
        author: "Inspiratie voor HBO-studenten",
        source: "fallback",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
