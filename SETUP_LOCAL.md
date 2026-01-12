# Setting Up the Project Locally

The project files are currently in your Cursor workspace. You need to copy them to a local directory on your machine to run the app.

## Option 1: Copy Files Manually (Recommended)

1. **Create a local project directory:**
   ```powershell
   mkdir C:\Users\josht\Snowflake
   cd C:\Users\josht\Snowflake
   ```

2. **Copy all project files** from the Cursor workspace to this directory:
   - All files in the root (package.json, tsconfig.json, etc.)
   - The `app` folder
   - The `src` folder
   - All config files

3. **Install dependencies:**
   ```powershell
   npm install
   ```

4. **Start the app:**
   ```powershell
   npm run dev
   ```

## Option 2: Use Git (If you have a repo)

If you have this in a Git repository:

```powershell
cd C:\Users\josht
git clone <your-repo-url> Snowflake
cd Snowflake
npm install
npm run dev
```

## Option 3: Export from Cursor

1. In Cursor, you can use "File > Export" or copy the entire workspace
2. Save it to a local directory like `C:\Users\josht\Snowflake`
3. Then run `npm install` and `npm run dev`

## Quick Start After Setup

Once files are local:

```powershell
cd C:\Users\josht\Snowflake
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

