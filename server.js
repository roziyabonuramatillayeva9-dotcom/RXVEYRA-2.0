require("dotenv").config();

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const plants = [];

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "RXVEYRA 2.0" });
});

app.get("/api/plants", (req, res) => {
  res.json(plants);
});

app.post("/api/plants", (req, res) => {
  const { name, ph, soilMoisture, water, temperature, humidity } = req.body;

  if (!name) {
    return res.status(400).json({ error: "O'simlik nomi kerak." });
  }

  const plant = {
    id: Date.now(),
    name,
    ph: ph ?? null,
    soilMoisture: soilMoisture ?? null,
    water: water ?? null,
    temperature: temperature ?? null,
    humidity: humidity ?? null,
    createdAt: new Date().toISOString()
  };

  plants.unshift(plant);
  res.status(201).json(plant);
});

app.post("/api/analyze", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY .env faylida topilmadi."
      });
    }

    const { name, ph, soilMoisture, water, temperature, humidity } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O'simlik nomi kerak." });
    }

    const prompt = `
RXVEYRA 2.0 o'simlik monitoring yordamchisisan.
Quyidagi ma'lumotlarni o'zbek tilida tahlil qil:
O'simlik: ${name}
Tuproq pH: ${ph ?? "berilmagan"}
Tuproq namligi: ${soilMoisture ?? "berilmagan"}
Sug'orish: ${water ?? "berilmagan"}
Harorat: ${temperature ?? "berilmagan"} °C
Havo namligi: ${humidity ?? "berilmagan"} %

Javobni qisqa va tushunarli ber:
1. Holat
2. Muammo bo'lishi mumkin bo'lgan jihatlar
3. Tavsiya
Agar ma'lumot yetarli bo'lmasa, buni aniq ayt.
`;

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: "Sen ehtiyotkor va foydali o'simlik monitoring AI yordamchisisan. Tibbiy yoki xavfli xulosalar bermaysan.",
      input: prompt
    });

    res.json({
      success: true,
      plant: name,
      analysis: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI tahlilida xatolik yuz berdi.",
      details: error.message
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`RXVEYRA 2.0 server started on port ${PORT}`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://YOUR-PC-IP:${PORT}`);
});
