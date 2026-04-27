-- Create subscriptions table for email newsletter
-- Run this migration in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  categories TEXT[] DEFAULT ARRAY['design', 'ai'],
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_subscribed ON subscriptions(subscribed);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to check subscription status
CREATE POLICY "Allow public read access for subscription check" ON subscriptions
  FOR SELECT USING (true);

-- Allow public insert for new subscriptions
CREATE POLICY "Allow public insert for subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (true);

-- Allow public update for unsubscribe
CREATE POLICY "Allow public update for unsubscribe" ON subscriptions
  FOR UPDATE USING (true);
