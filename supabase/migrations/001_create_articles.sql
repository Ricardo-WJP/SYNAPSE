-- Create articles table for DesignAI Knowledge
-- Run this migration in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  title_en VARCHAR(500),
  description TEXT,
  description_en TEXT,
  summary TEXT,
  summary_en TEXT,
  content TEXT,
  content_en TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('design', 'ai')),
  source VARCHAR(200) NOT NULL,
  source_url TEXT,
  author VARCHAR(200),
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  language VARCHAR(20) DEFAULT 'zh' CHECK (language IN ('zh', 'en', 'bilingual')),
  slug VARCHAR(200) UNIQUE NOT NULL,
  is_processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_language ON articles(language);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional, based on your needs)
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (example - adjust based on your needs)
-- CREATE POLICY "Allow public read access" ON articles
--   FOR SELECT USING (true);
