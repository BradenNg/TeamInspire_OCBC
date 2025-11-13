import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini API client

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error(
      "Missing GOOGLE_API_KEY. Add it to Backend/.env as GOOGLE_API_KEY=your_key"
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Conversation memory
let conversation = [];

// Hidden system instruction (not sent to frontend)
const SYSTEM_PROMPT = `
You are an professional OCBC Virtual Assistant.
You help customers with general OCBC-related enquiries, help them solve any problem relate to OCBC.
Provide accurate and clear guidance to the user.
Use clear, polite, and concise language.
If you are unsure or the question involves confidential data,
ask the user to contact official OCBC support.
Never make up financial advice or numbers.
`;

// Endpoint to handle chat messages
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Add user message to memory
    conversation.push({ role: "user", content: message });

    // Construct the chat history text
    let chatHistory = `${SYSTEM_PROMPT}\n\n`;
    for (const msg of conversation) {
      chatHistory += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
    }
    chatHistory += "Assistant:";

    // Generate response
    const result = await model.generateContent(chatHistory);
    const aiResponse = result.response.text();

    // Save AI reply to conversation
    conversation.push({ role: "assistant", content: aiResponse });

    // Send back only the AI reply
    res.json({ reply: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating response" });
  }
});

// Optional: clear chat
// app.post("/clear", (req, res) => {
//   conversation = [];
//   res.json({ status: "cleared" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Gemini backend running on port ${PORT}`));
