#!/usr/bin/env node

/**
 * Feed Update Script
 *
 * This script fetches articles from RSS sources, processes them with AI,
 * and stores them in the database.
 *
 * Usage:
 *   node scripts/update-feed.js [options]
 *
 * Options:
 *   --category=design|ai   Filter by category
 *   --skipAI               Skip AI processing (faster, no translations)
 *   --limit=N              Limit number of articles per source
 *
 * Examples:
 *   node scripts/update-feed.js                    # Update all sources
 *   node scripts/update-feed.js --category=design  # Only design news
 *   node scripts/update-feed.js --skipAI          # Skip AI processing
 */

interface UpdateOptions {
  category?: "design" | "ai";
  limit?: number;
  skipAI?: boolean;
}

const API_BASE = process.env.API_BASE || "http://localhost:3000";
const AUTH_TOKEN = process.env.FEED_UPDATE_TOKEN;

async function updateFeed(options: UpdateOptions = {}): Promise<unknown> {
  const params = new URLSearchParams();
  if (options.category) params.set("category", options.category);
  if (options.skipAI) params.set("skipAI", "true");

  const url = `${API_BASE}/api/feed?${params.toString()}`;

  console.log(`Updating feed from: ${url}`);

  return new Promise((resolve, reject) => {
    const http = require("http");

    const request = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: `/api/feed?${params.toString()}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(AUTH_TOKEN && { Authorization: `Bearer ${AUTH_TOKEN}` }),
        },
      },
      (response: { on: (event: string, callback: (chunk: Buffer) => void) => void; statusCode?: number }) => {
        let data = "";

        response.on("data", (chunk: Buffer) => {
          data += chunk.toString();
        });

        response.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error}`));
          }
        });
      }
    );

    request.on("error", (error: Error) => {
      reject(error);
    });

    request.end();
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: UpdateOptions = {};

for (const arg of args) {
  if (arg.startsWith("--")) {
    const [key, value] = arg.slice(2).split("=");
    if (key === "category") {
      options.category = value as "design" | "ai";
    } else if (key === "limit") {
      options.limit = parseInt(value, 10);
    } else if (key === "skipAI") {
      options.skipAI = true;
    }
  }
}

// Run if called directly
if (require.main === module) {
  updateFeed(options)
    .then((result: unknown) => {
      const r = result as { processed?: { total: number; success: number; errors: number } };
      console.log("\n Feed update completed!");
      console.log(`   Total processed: ${r.processed?.total}`);
      console.log(`   Success: ${r.processed?.success}`);
      console.log(`   Errors: ${r.processed?.errors}`);
      process.exit(0);
    })
    .catch((error: Error) => {
      console.error("\n Feed update failed:", error.message);
      process.exit(1);
    });
}

module.exports = { updateFeed };
