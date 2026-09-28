import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || "0.0.0.0";

  app.use(express.json());

  app.get("/api/quote", (req, res) => {
    const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return res.json({
      quote: randomQuote,
      author: "Inspiratie voor HBO-studenten",
      source: "fallback",
    });
  });

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

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
