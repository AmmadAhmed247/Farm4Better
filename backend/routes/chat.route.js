import express from "express";
import axios from "axios";

const router = express.Router();

// Free Hugging Face DialoGPT model
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small";

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "Message is required" });

    const response = await axios.post(
      HF_MODEL_URL,
      { inputs: message },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    // Extract the generated reply
    const reply = response.data?.[0]?.generated_text || "Sorry, I can't answer that.";
    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err.response?.data || err.message);

    const errorMessage = err.response?.data?.error || "Chatbot service unavailable";
    res.status(500).json({ reply: errorMessage });
  }
});

export default router;
