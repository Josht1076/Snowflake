# Supabase Setup Guide

This guide will help you set up Supabase for authentication and database storage.

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `snowflake-novel-planner` (or your preferred name)
   - Database Password: Choose a strong password (save it!)
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`)

## 3. Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key-here
   ```

## 4. Enable Email Authentication

1. In your Supabase project, go to **Authentication** → **Providers**
2. Find **Email** in the list (it should be enabled by default)
3. Make sure **Enable Email Provider** is turned on
4. (Optional) Configure email templates in **Authentication** → **Email Templates** if you want to customize confirmation emails

## 5. Run Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Open the file `supabase/migrations/001_create_projects_table.sql`
3. Copy the entire SQL content
4. Paste it into the SQL Editor in Supabase
5. Click **Run** to execute the migration

This will create:
- The `projects` table
- Row Level Security (RLS) policies
- Indexes for performance
- Automatic timestamp updates

## 6. Verify Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `http://localhost:3000`
3. You should be redirected to `/login`
4. Sign up with your email and password, or sign in if you already have an account
5. After authentication, you should be redirected back to the home page

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct values
- Restart your development server after changing environment variables

### "Table doesn't exist" error
- Make sure you ran the database migration in step 5

### Email authentication not working
- Make sure Email provider is enabled in Supabase Authentication settings
- Check your email spam folder for confirmation emails (if email confirmation is enabled)
- Verify your email and password are correct

### Projects not syncing
- Check browser console for errors
- Verify you're authenticated (check if user email appears in header)
- Check Supabase dashboard → Table Editor → projects to see if data is being saved

## Security Notes

- The `anon` key is safe to use in client-side code (it's public)
- Row Level Security (RLS) ensures users can only access their own projects
- Never commit `.env.local` to version control (it's already in `.gitignore`)
