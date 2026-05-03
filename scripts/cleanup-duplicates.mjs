#!/usr/bin/env node
/**
 * SYNAPSE Duplicate Cleanup Script
 *
 * Removes duplicate articles from the database, keeping only the most recent
 * article for each source_url.
 *
 * Usage:
 *   node scripts/cleanup-duplicates.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Supabase credentials not configured.");
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanupDuplicates() {
  console.log("Fetching all articles from database...");

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, source_url, published_at")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    process.exit(1);
  }

  console.log(`Total articles in database: ${articles.length}`);

  // Group by source_url
  const groups = new Map();
  for (const article of articles) {
    const key = article.source_url || `__no_url_${article.id}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(article);
  }

  const idsToDelete = [];
  let duplicateGroups = 0;
  let keptCount = 0;

  for (const [sourceUrl, group] of groups) {
    if (group.length > 1) {
      duplicateGroups++;
      // Keep the first one (most recent due to ordering), delete the rest
      const [, ...rest] = group;
      for (const article of rest) {
        idsToDelete.push(article.id);
      }
    }
    keptCount++;
  }

  console.log(`Found ${duplicateGroups} groups with duplicates`);
  console.log(`Unique articles to keep: ${keptCount}`);
  console.log(`Duplicate articles to delete: ${idsToDelete.length}`);

  if (idsToDelete.length === 0) {
    console.log("\nNo duplicates found. Database is already clean!");
    return;
  }

  // Batch delete in chunks of 100 (Supabase limit for .in())
  const batchSize = 100;
  let deletedCount = 0;

  for (let i = 0; i < idsToDelete.length; i += batchSize) {
    const batch = idsToDelete.slice(i, i + batchSize);
    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .in("id", batch);

    if (deleteError) {
      console.error(`Failed to delete batch ${Math.floor(i / batchSize) + 1}:`, deleteError.message);
    } else {
      deletedCount += batch.length;
      console.log(`Deleted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} articles`);
    }
  }

  console.log("\n========================================");
  console.log("Cleanup complete!");
  console.log(`Deleted: ${deletedCount} duplicate articles`);
  console.log(`Kept:    ${keptCount} unique articles`);
  console.log("========================================");
}

cleanupDuplicates().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
