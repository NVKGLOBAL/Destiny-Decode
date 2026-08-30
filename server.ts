import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Gemini client to prevent crashing if the key is missing at load time
  let aiClient: GoogleGenAI | null = null;
  const getAi = () => {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  };

  // Safe API health/status check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini API Proxy Route
  app.post("/api/classify", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Missing text parameter" });
      }

      const ai = getAi();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Classify the following spiritual/soulful response into exactly ONE of these archetypes: Visionary, Creator, Mystic, Alchemist, Sovereign, Oracle, Empath. 
Response: "${text}"
Return ONLY the name of the archetype.`,
      });

      const responseText = response.text?.trim() || "";
      res.json({ result: responseText });
    } catch (error: any) {
      console.error("Gemini API classification error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Gemini Daily Transit Proxy Route
  app.post("/api/daily-transit", async (req, res) => {
    const { userName, archetype, zodiacSign, birthday, transitDate } = req.body || {};
    try {
      if (!archetype || !zodiacSign) {
        return res.status(400).json({ error: "Missing archetype or zodiacSign parameter" });
      }

      const ai = getAi();
      const prompt = `You are the Elder Star Council. Generate today's personalized Celestial Daily Transit for:
- Soul Name: ${userName || "Beloved Soul"}
- Archetype: ${archetype}
- Zodiac: ${zodiacSign}
- Birthday: ${birthday || "Unknown"}
- Date of Transit: ${transitDate || new Date().toDateString()}

Write in the premium, soulful, poetic, and highly encouraging tone of Lisa Garcia Ruiz (spiritual teacher and cosmic guide). Detail the cosmic alignments of today, how they affect this specific soul's archetype, and what actions/rituals are recommended.

Provide your response in JSON format matching the schema exactly. Do not include markdown selectors outside of the JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT" as any,
            properties: {
              transitTitle: { type: "STRING" as any },
              prediction: { type: "STRING" as any },
              dailyRitual: { type: "STRING" as any },
              powerWord: { type: "STRING" as any }
            },
            required: ["transitTitle", "prediction", "dailyRitual", "powerWord"]
          }
        }
      });

      const responseText = response.text?.trim() || "{}";
      const resultObj = JSON.parse(responseText);
      res.json(resultObj);
    } catch (error: any) {
      console.error("Gemini API daily transit error:", error);
      // Fallback is handled gracefully so the app does not break if API keys are missing during dev/prod
      const dayHash = (new Date().getDate() + (archetype || "Visionary").length + (zodiacSign || "Aries").length) % 5;
      const genericTransits = [
        {
          transitTitle: "The Solar Golden Alignment",
          prediction: `Today's celestial gateway aligns the brilliant solar aspect directly with your ${archetype} frequency. You will feel a strong impulse to express your inner truth without hesitation. The cosmos is expanding your high-resonance channels, inviting you to speak Lisa's sacred golden keys over your lineage.`,
          dailyRitual: "Stand facing the sun or imagine a golden sphere in your chest for 60 seconds. Breathe in golden spark light, hold for 4 counts, and roar-sigh out through the mouth.",
          powerWord: "PRASADA ✧"
        },
        {
          transitTitle: "The Lunar Ocean Gate",
          prediction: `The tides of the deep Moon are calling your ${archetype} essence to receive before giving. Under the cover of this lunar shift, secret pathways in your standard energetic template are decoding themselves. Listen to the high whistle of your soul's guides and allow deep relaxation.`,
          dailyRitual: "Rest a warm palm over your heart center and repeat three times: 'I allow my vessel to fill before I empty it.' Drink a glass of water structured with high loving intention.",
          powerWord: "SOUMYA ✧"
        },
        {
          transitTitle: "The Mercurial Spark Transit",
          prediction: `Crystalline communication streams are pulsing between Saturn and your Zodiac sign ${zodiacSign}. This is an optimal day to write down your unvarnished visions or decode a sacred contract. Your mind acts as a high-fidelity spiritual transceiver today.`,
          dailyRitual: "Write down three major dreams on a blank paper, draw a circle of light around them, and speak them out loud to the room to seal the energetic creation.",
          powerWord: "VAKRU ✧"
        },
        {
          transitTitle: "Sovereign Galactic Octave",
          prediction: `The star Sirius is sending high-frequency light-codes to the center of your path. As a ${archetype}, you are being attuned to the Galactic Council's supreme octave of unconditional love. Let go of historic generational weights—they are falling away like stellar dust.`,
          dailyRitual: "Extend your hands outward with palms turning skyward. Interlock your thumbs, forming the wings of an eagle, and hold this mudra over your throat for 5 deep cycles of breathing.",
          powerWord: "GARUDA ✧"
        },
        {
          transitTitle: "The Obsidian Earth Integration",
          prediction: `Deep root integration is demanded of you today, beloved ${archetype}. Mars and Pluto are testing your structural alignment. Do not fly into mental spaces; descend into the red, rich loam of the Earth to ground your highest-grade star wisdom in physical space.`,
          dailyRitual: "Walk barefoot on natural ground or press both feet firmly into the floor. Imagine thick crystalline roots extending 100 meters deep, grounding you directly to Earth's core.",
          powerWord: "BHUMI ✧"
        }
      ];
      res.json(genericTransits[dayHash]);
    }
  });

  app.post("/api/oracle", async (req, res) => {
    // Local dev mock since Cloudflare AI isn't available in standard Express
    const { question } = req.body;
    setTimeout(() => {
      res.json({ 
        answer: `*(Local Dev Mock)* The cosmos hears your inquiry: "${question}". When you deploy this application to Cloudflare Pages, this will be answered by the live, free Cloudflare Llama 3 AI Oracle. For now, trust that the stars are aligning perfectly in your favor.` 
      });
    }, 1500);
  });

  // Vite middleware for development, serving assets & handling index.html mapping
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
