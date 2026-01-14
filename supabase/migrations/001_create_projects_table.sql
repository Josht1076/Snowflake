-- Create projects table (improved)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  schema_version INTEGER NOT NULL DEFAULT 1,

  -- Genre and STC settings
  primary_genre_id TEXT,
  secondary_genre_ids TEXT[] DEFAULT ARRAY[]::text[],
  primary_stc_id TEXT,
  secondary_stc_id TEXT,

  -- Content stored as JSONB for flexibility
  snowflake_content JSONB DEFAULT '{}'::jsonb,
  stc_content JSONB DEFAULT '{}'::jsonb,
  scenes JSONB DEFAULT '[]'::jsonb,

  -- Quiz result reference
  quiz_result_id TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_updated_at_idx ON projects(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS policies (restrict to authenticated users; use SELECT auth.uid() for planner friendliness)
CREATE POLICY users_can_view_own_projects
  ON projects FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY users_can_insert_own_projects
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY users_can_update_own_projects
  ON projects FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY users_can_delete_own_projects
  ON projects FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Trigger function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();