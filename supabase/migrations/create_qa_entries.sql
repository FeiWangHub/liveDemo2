-- Create qa_entries table
CREATE TABLE IF NOT EXISTS public.qa_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.qa_entries(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- Add index for parent_id to speed up lookups
CREATE INDEX IF NOT EXISTS idx_qa_entries_parent_id ON public.qa_entries(parent_id);
-- Enable RLS
ALTER TABLE public.qa_entries ENABLE ROW LEVEL SECURITY;
-- Allow anyone to read
CREATE POLICY "Allow public read access" ON public.qa_entries FOR
SELECT USING (true);
-- Allow anyone to insert (since it's a community Q&A without mandatory auth)
CREATE POLICY "Allow public insert access" ON public.qa_entries FOR
INSERT WITH CHECK (true);