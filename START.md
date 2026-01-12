# How to Start the Snowflake Novel Planner App

## Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including Next.js, React, TypeScript, and Tailwind CSS.

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This starts the Next.js development server.

3. **Open in Browser**
   The app will be available at:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (after build)
- `npm run lint` - Run ESLint

## First Time Setup

1. Navigate to `http://localhost:3000`
2. Click "New Project" to create your first novel planning project
3. Follow the Discovery Mode wizard to set up your project
4. Start planning your novel using the Snowflake Method!

## Troubleshooting

If you encounter issues:

1. **Port 3000 already in use**: 
   - Kill the process using port 3000, or
   - Set a different port: `PORT=3001 npm run dev`

2. **Dependencies not installing**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **TypeScript errors**:
   - Run `npm run build` to see all errors
   - Check that all files are properly saved

## Project Structure

- `/app` - Next.js app router pages
- `/src/components` - React components
- `/src/data` - Framework definitions, genres, quiz modules
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions (storage, scoring, etc.)

