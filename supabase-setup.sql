-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  business_type TEXT,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the landing page)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist (created_at DESC);
