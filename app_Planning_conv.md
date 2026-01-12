Skip to content
Chat history

You said:
I want to create a personal novel planning app. I want it to have a modern feel and look. The app to use the snowflake method as the outline frame work. The attached pdf provides details on this process. Give me a plan on how to build this. 

https://gwuwi.com/wp-content/uploads/2016/04/snowflake-method-summaries3.pdf#page=3
ChatGPT said:

Thought for 31s
Here’s a concrete plan to build a modern, personal “Snowflake Method” novel planner based on that PDF.

1. Translate the Snowflake Method into App Structure
Your core backbone is the 10-step Snowflake process. Each step becomes a “module” or “stage” in the app.

From the PDF, the steps are: 
gwuwi.com

Step 1 – 1-Sentence Plot Summary

PLOT, ~1 hour

“Write a one-sentence summary of your novel” (≤15 words, no character names). 
gwuwi.com

Step 2 – 1-Paragraph Plot Summary

PLOT, ~1 hour

Expand the sentence into a paragraph: setup, 3 major disasters (each a quarter of the book), and ending. 
gwuwi.com

Step 3 – 1-Page Character Summaries

CHARACTER, ~1 hour per character

For each major character: one-page sheet with name, one-sentence storyline, motivation, goal, conflict, epiphany, 1-paragraph storyline. 
gwuwi.com

Step 4 – 1-Page Plot Synopsis

PLOT, several hours

Expand each sentence of Step 2’s paragraph into a paragraph (ending in disasters, except last). 
gwuwi.com

Step 5 – Extended Character Synopses

CHARACTER, 1–2 days

One-page description for each major character, half-page for others, from their POV. 
gwuwi.com

Step 6 – 4-Page Plot Synopsis

PLOT, ~1 week

Expand the 1-page synopsis to 4 pages (each paragraph → 1 page). 
gwuwi.com

Step 7 – Full Character Charts

CHARACTER, 1–4 weeks

Detailed character charts: bio, history, motivation, goals, and especially how they change by the end. 
gwuwi.com

Step 8 – Scene List (Spreadsheet)

PLOT, ~1 week

Convert the 4-page synopsis into a scene list: one line per scene, with at least POV character + scene description, then group into chapters. 
gwuwi.com

Step 9 – Scene Expansions (Optional)

Optional, ~1 week

Expand each line in the scene list into multi-paragraph scene outlines, including key dialogue and conflict. 
gwuwi.com

Step 10 – Drafting

Write the first draft, updating design docs as you discover changes. 
gwuwi.com

The PDF also explicitly encourages cycling back to earlier steps as you learn more about your story. 
gwuwi.com

Your app should embrace that: nothing is “locked”; everything is revisable.

2. Core Product Vision & Features
Assume a single-user, web-based app you can run locally (but this maps fine to desktop or mobile later).

2.1 Core Concepts
Project (Novel) – a container for one story.

Snowflake Step Docs – one or more documents per step.

Characters – linked to Steps 3, 5, 7 and to scenes.

Scenes & Chapters – structured list (spreadsheet view).

Draft Links (optional) – link out to your writing tool (Scrivener, Word, Obsidian, etc.).

2.2 High-Level Features
Project Dashboard

List novels with:

Title, short tagline (from Step 1 sentence).

Progress bar across 10 steps (percent complete).

Last edited time.

Quick actions: “Continue Snowflake,” “Jump to Scenes,” “Open Characters.”

Guided Snowflake Wizard

A stepper UI (1 → 10) with:

Left: navigation list of steps.

Center: rich editor for the current step.

Right: contextual tips pulled from the PDF (e.g., Step 1 tips: “fewer than 15 words,” “no character names”). 
gwuwi.com

Allow jumping between steps freely while tracking what’s “rough draft” vs “revised.”

Character Hub

Card/grid view of characters.

Per-character page with:

Step 3 basics: motivation, goal, conflict, epiphany, one-sentence storyline. 
gwuwi.com

Step 5 and 7 extended sections (bio, history, arc, notes).

Show where each character appears in the scene list.

Scene Spreadsheet (Snowflake Step 8)

Table/grid with columns:

Scene # (order index)

POV character

Chapter

Short description

Status (planned / drafted / revised)

Drag & drop to reorder scenes.

“Group by chapter” view + chapter word count estimates (optional).

Scene Detail (Step 9)

Click a scene line to open a detail drawer:

Multi-paragraph outline.

Key conflict description.

Cool lines of dialogue (a little scratchpad area). 
gwuwi.com

Revision-Friendly Design

Each step has:

Version history or at least “snapshot” functionality (“Save snapshot before major changes”).

Visual cue if later steps are out of sync (e.g., Step 6 changed after scene list was generated).

Data Safety

Autosave locally every few seconds.

Export/import all data as a single JSON file (or zipped folder) so you can back it up anywhere.

3. Data Model (Rough Schema)
Assume TypeScript interfaces for a React/Next.js app:

type SnowflakeStepId =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Project {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  stepStatus: Record<SnowflakeStepId, 'not_started' | 'in_progress' | 'done'>;
}

interface StepDocument {
  id: string;
  projectId: string;
  step: SnowflakeStepId;
  title: string;        // e.g., "Step 2 - Main Plot"
  content: string;      // markdown / rich text
  createdAt: string;
  updatedAt: string;
}

interface Character {
  id: string;
  projectId: string;
  name: string;
  oneSentenceStory: string;
  motivation: string;
  goal: string;
  conflict: string;
  epiphany: string;
  shortSynopsis: string;   // Step 3 paragraph
  longSynopsis: string;    // combined Step 5/7 text
}

interface Chapter {
  id: string;
  projectId: string;
  index: number;
  title: string;
  notes?: string;
}

interface Scene {
  id: string;
  projectId: string;
  index: number;           // global ordering
  chapterId?: string;
  povCharacterId?: string;
  shortDescription: string;
  status: 'planned' | 'drafted' | 'revised';
  detailOutline?: string;  // Step 9 text
}
Storage can start as local-only (localStorage / IndexedDB) and later be swapped for Supabase/Postgres if you want syncing.

4. UX & Visual Design
4.1 Layout
Global layout:

Left sidebar: Projects + quick step navigation.

Top bar: Current project title, step breadcrumbs, theme toggle (light/dark).

Main area: Step content.

Right sidebar (collapsible): tips, word count, linked entities (characters, scenes).

4.2 Per-Step UX Patterns
Step 1 & 2 (Plot Summary)

Big, centered text box.

Live word counter for Step 1; highlight if >15 words.

A small checklist of tip bullets from the PDF right beside the editor. 
gwuwi.com

Step 3 / 5 / 7 (Characters)

Wizard-like form per character:

Name, one-sentence storyline, motivation, goal, conflict, epiphany, etc. 
gwuwi.com

Show small badges for which steps each character has completed.

Step 4 & 6 (Plot Pages)

Rich text editor with page-ish feel.

Visual hints to end paragraphs with disasters except the last one.

Step 8 (Scene List)

Spreadsheet surface:

Click to edit in-place.

Keyboard-friendly navigation (up/down arrows).

Add row button at top or bottom.

Drag handle at left of each row to reorder.

Step 9 (Scene Detail)

Split view:

Left: scene detail outline.

Right: reference snippet from Step 6 / character charts.

Step 10 (Drafting)

Rather than being a full word processor, this step can:

Summarize your design.

Let you mark scenes/chapters as “drafted”.

Provide links to external writing tools or a simple writing pane if you want.

4.3 Modern Look & Feel
Visual style:

Clean, card-based layout.

Neutral background, subtle accent color for each story element type:

Plot = blue

Character = orange

Scene = purple

Typography:

One strong display font for titles, one readable mono or sans for body.

Microinteractions:

Smooth transitions when switching steps.

Subtle check animations when marking a step complete.

5. Suggested Tech Stack
Given your experience with web dev:

Frontend framework: Next.js + React + TypeScript

Styling: Tailwind CSS for quick, modern, responsive UI.

State management: React Query or simple context/hooks (it’s mostly CRUD + autosave).

Persistence (MVP):

Local: localStorage / IndexedDB (via a wrapper like Dexie) so it’s completely personal and offline-first.

Persistence (Later):

Supabase or similar, for sync across devices and backups.

Optional nice-to-haves:

Markdown editor for Step documents (e.g., tiptap, Lexical, or a lightweight markdown textarea with preview).

Electron / Tauri wrapper to ship it as a desktop app if you want.

6. Implementation Roadmap
Phase 1 – Barebones MVP
Set up Next.js + Tailwind skeleton.

Implement:

Project model.

Simple StepDocument editor for Steps 1–4.

Persist to localStorage:

Single JSON blob keyed by project ID.

Build a basic stepper UI and autosave.

Outcome: You can create a project and get through Steps 1–4 with a clean UI.

Phase 2 – Characters & Scenes
Implement Character model and UI:

Character list page.

Character editor integrating Step 3 & 5.

Implement Scene and Chapter models:

Step 8 scene list table.

Drag & drop ordering (using something like @dnd-kit).

Step 9 scene detail panel ( optional at first).

Outcome: Full Snowflake planning through Step 8, with linkages between plot, character, and scene.

Phase 3 – Refinement & Quality of Life
Add:

Step 6 four-page synopsis view.

Step 7 full character charts area.

Optional Step 9 expansions.

Add:

Export/import (JSON).

Dark mode.

“Snapshots” (simple versioning; e.g., store timestamped copies).

Outcome: A robust Snowflake design studio for your novels.

Phase 4 – Nice Extras (If You Want to Go Further)
Analytics:

Count scenes per POV.

Visualize character presence vs chapters.

AI Helpers (if you want to integrate an LLM):

Suggest rephrasing the Step 1 sentence.

Generate test scenes from your outline.

Find inconsistencies (e.g., character goal vs scenes).

If you’d like, next step I can:

Draft the initial Next.js page/component structure (file tree + a couple of key components), or

Design a more detailed data schema + TypeScript types tailored to whichever storage option you prefer (pure local vs Supabase).



No file chosenNo file chosen
ChatGPT can make mistakes. Check important info.
