import express from 'express';
import path from 'path';
import cors from 'cors';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  const upload = multer({ dest: 'uploads/' });

  // Try to initialize Gemini, if key missing it's okay, handled in routes
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Failed to init Gemini API", err);
    }
  }

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', usingGemini: !!ai });
  });

  // Multimodal AI - "What should I do today"
  app.post('/api/ai/daily-plan', async (req, res) => {
    const { crop, stage, weather, diseaseRisk } = req.body;
    
    if (!ai) {
      return res.json({
        isDemo: true,
        plan: `**TODAY'S FARM PLAN (DEMO)**\n\n🌧️ **Weather:** ${weather.summary}\n\n💧 **Irrigation:** Delay irrigation due to incoming rain.\n\n🐛 **Disease:** ${diseaseRisk} risk for Fungal disease.\n\n🌱 **Crop:** ${crop} - ${stage}\n\n### AI RECOMMENDATION\n"Delay irrigation for 12 hours, inspect leaves for fungal symptoms, and consider harvesting 20% of mature tomatoes tomorrow if the market trend continues."`
      });
    }

    try {
      const prompt = `Act as an expert agricultural AI. Create a daily farm action plan for a farmer. 
Current conditions:
Crop: ${crop} (${stage})
Weather: ${weather.summary}, Temp: ${weather.temp}°C, Rain Prob: ${weather.rainProb}%
Disease Risk: ${diseaseRisk}

Provide a short, highly structured plan with headings for Weather, Irrigation, Disease, Crop, Market, and a final concise "AI RECOMMENDATION" explaining what to do today and why. Use emojis.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ isDemo: false, plan: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // AI Crop Health Detection (Image)
  app.post('/api/ai/analyze-crop', upload.single('image'), async (req, res) => {
    if (!ai) {
      // Simulate delay
      await new Promise(r => setTimeout(r, 1500));
      return res.json({
        isDemo: true,
        analysis: {
          crop: 'Tomato',
          possibleIssue: 'Early blight',
          confidence: 91,
          severity: 'Moderate',
          recommendedAction: 'Remove heavily affected leaves and monitor nearby plants. Apply appropriate organic fungicide if permitted.'
        }
      });
    }
    // Note: Full image analysis with Gemini requires uploading the file or passing base64. 
    // In a real hackathon, we would pass the base64 image to Gemini.
    res.json({ isDemo: true, error: "Image processing requires Gemini implementation." });
  });

  // Mock Market Data
  app.get('/api/market', (req, res) => {
    res.json([
      { crop: 'Tomato', current: 32, previous: 29, trend: 'Increasing', nearby: [{name: 'Coimbatore', price: 32}, {name: 'Erode', price: 35}] },
      { crop: 'Onion', current: 45, previous: 48, trend: 'Decreasing', nearby: [{name: 'Coimbatore', price: 44}, {name: 'Erode', price: 46}] }
    ]);
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
