import OpenAI from "openai";
import type { Category } from "./types";

const miniMaxApiKey = process.env.MINIMAX_API_KEY;
const miniMaxBaseUrl = "https://api.minimax.chat/v1";

function getClient(): OpenAI {
  if (!miniMaxApiKey) {
    throw new Error("MINIMAX_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey: miniMaxApiKey,
    baseURL: miniMaxBaseUrl,
    defaultHeaders: {
      "Authorization": `Bearer ${miniMaxApiKey}`,
    },
  });
}

export interface ProcessArticleInput {
  title: string;
  description?: string;
  content?: string;
  category: Category;
  language: "zh" | "en";
}

export interface ProcessArticleOutput {
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  tags: string[];
}

const TRANSLATE_PROMPT = `You are a professional translator. Translate the following text from {sourceLang} to {targetLang}.
Only return the translation, nothing else.

Text: {text}`;

const SUMMARIZE_PROMPT = `You are a professional content analyst. Analyze the following article and provide:
1. A concise summary (3-5 sentences in {lang})
2. Relevant tags (3-5 tags, in {lang}, separated by commas)

Article Title: {title}
Article Description: {description}

Respond in JSON format:
{{
  "summary": "your summary here",
  "tags": ["tag1", "tag2", "tag3"]
}}`;

async function translateText(
  client: OpenAI,
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const prompt = TRANSLATE_PROMPT.replace("{sourceLang}", sourceLang)
    .replace("{targetLang}", targetLang)
    .replace("{text}", text);

  const response = await client.chat.completions.create({
    model: "MiniMax-M2.5",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content?.trim() || text;
  // Remove thinking tags if present
  return content.replace(/<think>[\s\S]*?<\/think>/g, "").trim() || text;
}

async function summarizeArticle(
  client: OpenAI,
  title: string,
  description: string,
  lang: string
): Promise<{ summary: string; tags: string[] }> {
  const prompt = SUMMARIZE_PROMPT.replace("{title}", title)
    .replace("{description}", description || "")
    .replace("{lang}", lang);

  const response = await client.chat.completions.create({
    model: "MiniMax-M2.5",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  let content = (response.choices[0]?.message?.content?.trim() || "")
    .replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  // Strip markdown code block wrappers if present
  content = content.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();

  try {
    const result = JSON.parse(content);
    return {
      summary: result.summary || "",
      tags: Array.isArray(result.tags) ? result.tags : [],
    };
  } catch {
    return {
      summary: content.substring(0, 300),
      tags: [],
    };
  }
}

export async function processArticle(
  input: ProcessArticleInput
): Promise<ProcessArticleOutput> {
  const client = getClient();

  const { title, description, category, language } = input;

  if (language === "zh") {
    const [titleEn, zhSummaryResult, enSummaryResult] = await Promise.all([
      translateText(client, title, "Chinese", "English"),
      summarizeArticle(client, title, description || "", "Chinese"),
      language === "zh"
        ? summarizeArticle(client, title, description || "", "English")
        : Promise.resolve({ summary: "", tags: [] }),
    ]);

    return {
      title,
      titleEn,
      summary: zhSummaryResult.summary,
      summaryEn: enSummaryResult.summary || description?.substring(0, 200) || "",
      tags: [...new Set([category, ...zhSummaryResult.tags])],
    };
  } else {
    const [titleZh, enSummaryResult, zhSummaryResult] = await Promise.all([
      translateText(client, title, "English", "Chinese"),
      summarizeArticle(client, title, description || "", "English"),
      summarizeArticle(client, title, description || "", "Chinese"),
    ]);

    return {
      title: titleZh,
      titleEn: title,
      summary: zhSummaryResult.summary,
      summaryEn: enSummaryResult.summary,
      tags: [...new Set([category, ...enSummaryResult.tags])],
    };
  }
}

export async function translateToEnglish(text: string): Promise<string> {
  const client = getClient();
  return translateText(client, text, "Chinese", "English");
}

export async function translateToChinese(text: string): Promise<string> {
  const client = getClient();
  return translateText(client, text, "English", "Chinese");
}
