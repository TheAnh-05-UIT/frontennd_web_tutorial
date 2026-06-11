-- -- Tutorials table
-- CREATE TABLE tutorials (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   title TEXT NOT NULL,
--   description TEXT,
--   category TEXT NOT NULL,
--   cover_image TEXT,
--   author_id UUID,
--   read_time INTEGER DEFAULT 0,
--   views INTEGER DEFAULT 0,
--   content TEXT,
--   status TEXT DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft', 'Scheduled')),
--   publish_date DATE DEFAULT CURRENT_DATE,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Projects table
-- CREATE TABLE projects (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   title TEXT NOT NULL,
--   description TEXT,
--   thumbnail TEXT,
--   tech_stack TEXT[] DEFAULT '{}',
--   difficulty TEXT DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
--   github_url TEXT,
--   demo_url TEXT,
--   status TEXT DEFAULT 'Planned' CHECK (status IN ('Planned', 'In Progress', 'Review', 'Completed')),
--   user_id UUID,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Roadmaps table
-- CREATE TABLE roadmaps (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   title TEXT NOT NULL,
--   description TEXT,
--   icon TEXT,
--   color TEXT DEFAULT 'primary',
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Roadmap steps table
-- CREATE TABLE roadmap_steps (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
--   title TEXT NOT NULL,
--   description TEXT,
--   resources TEXT[] DEFAULT '{}',
--   step_order INTEGER DEFAULT 0,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- User progress table
-- CREATE TABLE user_progress (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID,
--   tutorial_id UUID REFERENCES tutorials(id) ON DELETE CASCADE,
--   completed BOOLEAN DEFAULT FALSE,
--   progress INTEGER DEFAULT 0,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   UNIQUE(user_id, tutorial_id)
-- );

-- -- Profiles table (extends auth.users)
-- CREATE TABLE profiles (
--   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   name TEXT,
--   avatar_url TEXT,
--   role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
--   courses_completed INTEGER DEFAULT 0,
--   articles_read INTEGER DEFAULT 0,
--   projects_finished INTEGER DEFAULT 0,
--   learning_streak INTEGER DEFAULT 0,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Enable RLS on all tables
-- ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE roadmap_steps ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- -- RLS Policies for tutorials (public read, authenticated write)
-- CREATE POLICY "tutorials_select" ON tutorials FOR SELECT
--   TO public USING (status = 'Published');

-- CREATE POLICY "tutorials_select_auth" ON tutorials FOR SELECT
--   TO authenticated USING (true);

-- CREATE POLICY "tutorials_insert" ON tutorials FOR INSERT
--   TO authenticated WITH CHECK (auth.uid() = author_id);

-- CREATE POLICY "tutorials_update" ON tutorials FOR UPDATE
--   TO authenticated USING (auth.uid() = author_id);

-- CREATE POLICY "tutorials_delete" ON tutorials FOR DELETE
--   TO authenticated USING (auth.uid() = author_id);

-- -- RLS Policies for projects
-- CREATE POLICY "projects_select" ON projects FOR SELECT
--   TO authenticated USING (true);

-- CREATE POLICY "projects_insert" ON projects FOR INSERT
--   TO authenticated WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "projects_update" ON projects FOR UPDATE
--   TO authenticated USING (auth.uid() = user_id);

-- CREATE POLICY "projects_delete" ON projects FOR DELETE
--   TO authenticated USING (auth.uid() = user_id);

-- -- RLS Policies for roadmaps (public read)
-- CREATE POLICY "roadmaps_select" ON roadmaps FOR SELECT
--   TO public USING (true);

-- CREATE POLICY "roadmap_steps_select" ON roadmap_steps FOR SELECT
--   TO public USING (true);

-- -- RLS Policies for user_progress
-- CREATE POLICY "user_progress_select" ON user_progress FOR SELECT
--   TO authenticated USING (auth.uid() = user_id);

-- CREATE POLICY "user_progress_insert" ON user_progress FOR INSERT
--   TO authenticated WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "user_progress_update" ON user_progress FOR UPDATE
--   TO authenticated USING (auth.uid() = user_id);

-- -- RLS Policies for profiles
-- CREATE POLICY "profiles_select" ON profiles FOR SELECT
--   TO authenticated USING (true);

-- CREATE POLICY "profiles_update" ON profiles FOR UPDATE
--   TO authenticated USING (auth.uid() = id);

-- CREATE POLICY "profiles_insert" ON profiles FOR INSERT
--   TO authenticated WITH CHECK (auth.uid() = id);

-- -- Create indexes for performance
-- CREATE INDEX idx_tutorials_category ON tutorials(category);
-- CREATE INDEX idx_tutorials_status ON tutorials(status);
-- CREATE INDEX idx_projects_user ON projects(user_id);
-- CREATE INDEX idx_user_progress_user ON user_progress(user_id);
-- CREATE INDEX idx_roadmap_steps_roadmap ON roadmap_steps(roadmap_id);