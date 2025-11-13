import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from Backend/.env regardless of where the script is run
dotenv.config({ path: path.join(__dirname, ".env") });

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error(
    "Missing GOOGLE_API_KEY. Add it to Backend/.env as GOOGLE_API_KEY=your_key"
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt =
      "Hello nice to meet you";

    const result = await model.generateContent(prompt);

    const text = result.response?.text?.() ?? "(no content)";
    console.log("Google AI API Response:\n");
    console.log(text);
  } catch (err) {
    console.error("Error calling the Google AI API:");
    // The client throws standard Errors; include message and any available details
    console.error(err?.message || String(err));
    if (err?.response) {
      try {
        console.error(JSON.stringify(err.response, null, 2));
      } catch {}
    }
    process.exitCode = 1;
  }
}

main();
