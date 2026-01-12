Got it—that helps a lot. Here’s an updated, tighter plan that bakes in your answers and the specific suggestions (A, D, simple F, G).

---

## 1. Refined Product Shape

**High-level:**

* **Audience:** Primarily you, but keep it “clean enough” that others *could* use it one day.
* **Mode:** Offline-first, no backend. Everything stored locally (localStorage/IndexedDB).
* **Backbone:** **Snowflake is primary**.
* **Support:** **Save the Cat as a secondary guide** (overlay, not mandatory).
* **Depth:** Up through Snowflake Step 7–8, with **basic scene cards** (title, purpose, beat linkage), but *not* full drafting yet.
* **Tips:** Neutral tone, simple examples.

  * Primary STC archetype drives main tips.
  * Secondary archetype gives occasional “extra thoughts”.

You’ll structure the app into **three modes** (Suggestion A):

1. **Discovery Mode** – idea, genre, quiz (optional).
2. **Structure Mode** – Snowflake + STC overlay + scene cards.
3. **Revision Mode** – simple “health check” pass over the outline.

Snowflake and STC are represented as **separate frameworks** with a mapping (Suggestion D).

---

## 2. Core Modes & Flows

### 2.1 Discovery Mode

**Goal:** Capture core idea, clarify genre & story type without over-structuring.

**Key screens:**

1. **New Project**

   * Fields: `Title`, `Working logline`, `One-sentence idea dump`.
   * Options:

     * “I know my genre/story type” → pick from your curated list.
     * “Help me confirm (Quiz)” → go to quiz.

2. **Optional Genre Quiz**

   * Uses your Module 1 (20 questions).
   * At end:

     * Show **top 2–3 genres** + **primary/secondary STC archetypes**.
     * Explicit text: “Use this as a confirmation, adjust manually if needed.”

3. **Genre & Story Type Confirmation**

   * Show:

     * Primary Genre (selectable dropdown).
     * Secondary Genre(s) (optional).
     * Primary STC archetype.
     * Secondary STC archetype (optional).
   * User can **override** quiz choices.

**Exit of Discovery Mode**: Project now has:

* `primary_genre`, optional `secondary_genres`.
* `primary_stc`, optional `secondary_stc`.
* Snowflake Step 1 seeded with idea/logline.

---

### 2.2 Structure Mode (Main Workspace)

**Goal:** Build the story’s structure using Snowflake 1–8 + STC overlay + simple scene cards.

**Layout:**

* **Top:** Simple **timeline ribbon** (small add from F)

  * Left–right: Act I / II / III.
  * Markers for major STC beats.
  * Highlights current “focus” step/beat.

* **Left Sidebar:**

  * Tabs:

    * `Snowflake`
    * `Scenes`
  * Snowflake tab: Steps 1–8 listed vertically with completion state.
  * Scenes tab: List of scene cards (we’ll keep this basic).

* **Main Panel:**

  * When a Snowflake step is selected:

    * Title + neutral description.
    * Rich text area (your notes).
    * For Steps 3, 7, 8: inline boxes to reference key STC beats.

* **Right Sidebar: “Tips & Notes”**

  * Uses tip engine:

    * **Primary tip block**: Based on Snowflake step + primary STC + primary genre.
    * **Secondary note block**: If secondary STC exists, show occasional “alternate angle” note (e.g., “If you lean into [secondary archetype], you might also…”).
    * All neutral tone, simple examples.

**Scenes (within Structure Mode):**

* **Scene cards (first-pass):**

  * `id`
  * `title`
  * `brief_purpose` (why this scene exists)
  * `related_step` (usually 7–8)
  * Optional: `stc_beat_id` (if scene centers on a beat)
* UI:

  * Simple list + detail panel for editing.
* This is *planning-level* scenes, not drafting text.

---

### 2.3 Revision Mode

**Goal:** Provide a lightweight “story health check” for long-term projects.

**Features (keep it simple):**

* Checklist view:

  * ✅ Snowflake Steps 1–3 filled in.
  * ✅ Key beats (Opening, Catalyst, Midpoint, All Is Lost, Finale) have content.
  * ⚠️ No scenes linked to [specific beat].
  * ⚠️ Snowflake Step 1 logline and Finale beat share *no* major common nouns (simple keyword check).
* This isn’t “AI smart”—just rule-based checks using your data.

Result: A quick pass at the end of a planning cycle to see obvious gaps.

---

## 3. Data Model with Framework Abstraction (Suggestion D + G)

We’ll define a generic **Framework** layer so Snowflake and STC stay modular.

### 3.1 Framework Types

```ts
type FrameworkId = 'snowflake' | 'stc';

interface Framework {
  id: FrameworkId;
  name: string;
  steps: FrameworkStep[];
}

interface FrameworkStep {
  id: string;      // e.g. 'sf_step_1', 'stc_opening_image'
  frameworkId: FrameworkId;
  title: string;
  description: string;
  order: number;
  group?: string;  // e.g. "Act I"
}
```

Snowflake and STC are each a `Framework`. The “mapping” is separate:

```ts
interface FrameworkMapping {
  snowflakeStepId: string;
  stcBeatIds: string[];
}
```

This mapping is used to:

* Show relevant beats in a Snowflake step.
* Show which Snowflake steps relate to a given beat.

### 3.2 Project Schema (with versioning – Suggestion G)

```ts
interface Project {
  schemaVersion: number;          // Start with 1
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  primaryGenreId: string | null;
  secondaryGenreIds: string[];

  primaryStcId: string | null;
  secondaryStcId: string | null;

  // Snowflake-focused content
  snowflakeContent: Record<string, SnowflakeStepContent>; // keyed by step id

  // STC beat notes
  stcContent: Record<string, StcBeatContent>;

  // Scene planning
  scenes: SceneCard[];

  // For quiz audit/history if you care
  quizResultId?: string;
}

interface SnowflakeStepContent {
  stepId: string;
  text: string;
  status: 'not_started' | 'in_progress' | 'complete';
}

interface StcBeatContent {
  beatId: string;
  text: string;
  status: 'not_started' | 'in_progress' | 'complete';
}

interface SceneCard {
  id: string;
  title: string;
  briefPurpose: string;
  relatedSnowflakeStepId?: string; // usually Step 7–8
  relatedStcBeatId?: string;
}
```

Add a simple migration hook early:

```ts
function migrateProject(p: any): Project {
  if (!p.schemaVersion) {
    // Upgrade from pre-versioning format to v1
    p.schemaVersion = 1;
  }

  // Future: if (p.schemaVersion === 1) { ... upgrade to 2 ... }
  return p as Project;
}
```

---

## 4. Tip Engine (Aligned with Your Choices)

* Neutral voice, simple examples only.
* Primary STC + genre drives the main content.

```ts
interface Tip {
  id: string;
  title: string;
  body: string;
  appliesToFrameworkSteps?: string[]; // e.g. ['sf_step_1']
  appliesToGenres?: string[];
  appliesToPrimaryStc?: string[];
  appliesToSecondaryStc?: string[];
}
```

**Logic per step:**

* Resolve tips as:

  1. Base Snowflake step tips (no genre/STC filters).
  2. Filter those where `appliesToGenres` includes primary genre (or is empty).
  3. Filter those where `appliesToPrimaryStc` includes primary STC (or is empty).
* For secondary STC:

  * Fetch a **small subset** of tips where `appliesToSecondaryStc` includes that ID.
  * Present them as “Alternate angle” or “If you lean into [secondary]…” in a separate block.

---

## 5. Simple UX Enhancements to Include (from F)

Keep these minimal but effective:

1. **Timeline Ribbon (top of Structure mode)**

   * Visual bands for Acts I/II/III.
   * Markers for major STC beats.
   * Highlight where current Snowflake step normatively sits (can be approximate).

2. **Smart “Next Suggestion” Button**

   * At bottom of each step:

     * Reads project state:

       * Next incomplete Snowflake step.
       * Or, if step is done, next key STC beat or unlinked scene.
     * Shows button: “Next recommended step: Fill in [Midpoint] beat.”
   * Implementation: simple priority rules, no AI.

Skip more complex mini-maps, etc. for now.

---

## 6. Dev Workflow & Content Strategy (Suggestion G)

### 6.1 Schema Versioning

* Start with `schemaVersion = 1` on every new project.
* Always run `migrateProject()` when loading from storage.
* For now, no real migrations, but the hook is there for future.

### 6.2 Fixture Data

Create a small folder like `fixtures/` with JSON samples:

* `epic_quest_golden_fleece.json`
* `mystery_whydunnit.json`

Use these for:

* Testing UI rendering.
* Validating the mapping between Snowflake and STC.
* Tuning tips.

### 6.3 Content Separation

* Keep all framework definitions, mappings, genres, tips, and quiz questions in separate data files (JSON or TS modules).

  * `data/frameworks/snowflake.ts`
  * `data/frameworks/stc.ts`
  * `data/frameworks/mapping_snowflake_stc.ts`
  * `data/genres.ts`
  * `data/tips.ts`
  * `data/quiz/module1.ts`
* UI imports these as configuration.
* That way, you can adjust tips/genre mappings separately from logic.

---

## 7. Suggested Implementation Order (Updated)

1. **Set up project + basic routing.**
2. **Implement Framework + Project schema (with `schemaVersion`).**
3. **Discovery Mode (New project + manual genre/STC selection).**
4. **Structure Mode:**

   * Snowflake step list.
   * Editor for Steps 1–3.
   * Add Steps 4–8 later.
   * Add simple timeline ribbon.
5. **STC framework + mapping + beat editor.**
6. **Scene cards (minimal).**
7. **Tip engine (with primary genre + primary STC focus).**
8. **Add quiz in Discovery Mode (optional path).**
9. **Revision Mode with a couple of simple checks.**
10. **Smart “Next Suggestion” button.**
11. **Fixture data + polish.**

---

If you’d like, next I can:

* Draft the **actual TypeScript interfaces and starter data files** for `frameworks`, `mapping`, `genres`, and `tips`, or
* Sketch a concrete **Next.js file/folder structure** (pages/components/hooks) tailored to this plan so you can drop it straight into your repo.
