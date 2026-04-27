import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

const miniMaxApiKey = process.env.MINIMAX_API_KEY;

if (!miniMaxApiKey) {
  console.error("MINIMAX_API_KEY not found in environment");
  process.exit(1);
}

const prompt = `Dark luxury architectural photography, modern minimalist building with dramatic geometric lines, deep dark background (#0C0C10), subtle golden/bronze accent lighting on edges, wide-angle perspective, cinematic atmosphere, ultra-clean composition, high contrast between shadow and light, professional editorial photography, no people, 16:9 aspect ratio, extremely high quality, photorealistic`;

async function generateHeroImage() {
  try {
    console.log("Generating hero background image...");

    const response = await fetch("https://api.minimax.chat/v1/image_generation", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${miniMaxApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "image-01",
        prompt: prompt,
        n: 1,
        size: "1280x720",
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error);
      process.exit(1);
    }

    const imageUrl = data.data?.image_urls?.[0];

    if (!imageUrl) {
      console.error("No image URL returned:", JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log("Image generated successfully!");
    console.log("Image URL:", imageUrl);

    // Save URL to a text file for reference
    const urlPath = path.join(process.cwd(), "hero-bg-url.txt");
    fs.writeFileSync(urlPath, imageUrl);
    console.log("URL saved to:", urlPath);
  } catch (error) {
    console.error("Error generating image:", error);
    process.exit(1);
  }
}

generateHeroImage();
