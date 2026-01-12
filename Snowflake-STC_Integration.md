Skip to content
Chat history

You said:
I like the snowflake method for its modular approach to plotting a novel. I also like the Save the Cat plot archetypes and beat sheet. Is there a way to incorporate that into this?
ChatGPT said:

Thought for 15s
Yep, you can absolutely mash those together—and they actually complement each other really nicely.

Think of it like this:

Snowflake = how you grow the story (depth, detail).

Save the Cat = how you shape the story (beats, pacing, emotional flow).

You let Snowflake handle the expansion and Save the Cat handle the rhythm.

1. High-level integration idea
Use Snowflake as the backbone of your app’s “outline builder”, and layer Save the Cat (StC) on top as a structural grid:

Each Snowflake step becomes a module in your app.

Each module shows relevant Save the Cat beats/archetype prompts alongside it.

Scenes/chapters are tagged with both:

Which Snowflake piece they belong to (e.g., "Step 4: Scene 12")

Which Save the Cat beat they fulfill (e.g., "Midpoint")

So the user never has to choose “Snowflake or Save the Cat”—they just move through Snowflake, and your app quietly ensures they’re hitting the StC beats.

2. Mapping Snowflake Steps to Save the Cat beats
Here’s a practical mapping you can bake into the app logic.

Step 1 – One-Sentence Summary
Snowflake: 1-line summary of the novel.
Save the Cat tie-in:

Build this as a logline builder using StC-style fields:

Protagonist

Flaw/need

Goal

Antagonistic force

Stakes

Also tie to:

Opening Image vs. Final Image (how the world starts vs. ends)

Theme Stated (what truth the story will test)

App idea: a “Logline + Theme” mini-wizard labeled “Step 1 (Snowflake + Save the Cat)”.

Step 2 – One-Paragraph Summary (Three Acts)
Snowflake: 5-ish sentences for the whole story.
Save the Cat tie-in:

This is where you quietly shape that paragraph around the big beats:

Act I: Opening Image, Setup, Theme Stated, Catalyst, Debate

Act II: Break into Two, Fun & Games, Midpoint, Bad Guys Close In

Act III: All Is Lost, Dark Night of the Soul, Break into Three, Finale, Final Image

App idea: When the user writes their paragraph, show a 3-column layout (Act I, II, III) with subtle beat labels and character counters/prompt text inside each column.

Step 3 – Character Summaries
Snowflake: 1-page summary per major character.
Save the Cat tie-in:

Give each character a StC-focused mini-template:

Six Things That Need Fixing (flaws shown in Setup)

Wants vs Needs

Ghost/Wound

How they appear in key beats:

Catalyst impact

Midpoint shift

All Is Lost moment

Role in Finale

App idea: For each character, have a “Beat Presence” checklist: the app lists the beats and lets the user tick where this character plays a role.

Step 4 – Full-Page Plot Synopses (per major character or storyline)
Here you expand plots into 4–5 pages.

Save the Cat tie-in:

Convert the user’s earlier Act-based paragraph into a full Save the Cat beat outline:

Setup → Fun & Games → Midpoint → Bad Guys Close In → All Is Lost → Finale

Your app can show:

A beat-by-beat template down the left.

A text area for each beat.

Little “progress dots” as beats are filled in.

Steps 5–9 – Expanding to scene list, then full draft
These are very scene-heavy in Snowflake; that’s where StC beats shine as labels.

Save the Cat tie-in:

Each scene record in your app has fields like:

Belongs to: Snowflake Step (or Act/Sequence)

Beat tag: e.g., Catalyst, Midpoint, Fun & Games, Bad Guys Close In, etc.

POV character

Location

You can use this to:

Warn if critical beats are empty (“You don’t have a Midpoint yet”)

Warn if one beat is overloaded (e.g., 20 scenes in Fun & Games, 1 in Finale)

Provide a Beat Timeline View that shows how the scenes line up across the book.

3. Incorporating Save the Cat genres (archetypes)
Save the Cat “genres” (e.g., Whydunit, Fool Triumphant, Golden Fleece, Buddy Love) can be a project-level choice at creation:

When user creates a new project:

Choose Snowflake-based novel

Choose StC Genre / Archetype (optional but recommended)

The chosen genre can:

Change the prompts in each beat.

Adjust emphasis:

Golden Fleece → stronger prompts around journey, trials, team.

Whydunit → stronger prompts about secrets, revelations, and truth.

App idea: store each genre as a JSON config with:

Required beats

A short description

Extra guiding questions per beat
Then your UI wires those questions into tooltips / side panels.

4. How your app could present this in practice
Just to make this concrete, here’s a simple structure you can build toward.

Views
Snowflake View

Step-based sidebar (1–10).

Center panel for content.

Right panel: StC prompts relevant to that step:

Step 1: Logline builder + Theme

Step 2: Acts and major beats

Step 3: Character arcs + six things that need fixing

Later: mapping scenes to beats

Beat Sheet View

Horizontal timeline or vertical list of Save the Cat beats.

Under each beat:

Linked scenes

Short summary text

Color-coded “completeness” badges (empty / rough / solid).

Scene Board / Chapter List

Scenes as cards/rows.

Each card shows:

Chapter/scene name

Assigned beat

POV

Status (idea / drafted / revised)

Filters: “Show only Midpoint scenes”, “Show Act II only”, etc.

5. Workflow for a user inside your system
A nice integrated flow might look like:

Create Project

Choose: Snowflake + Save the Cat.

Choose: StC Genre (optional).

Step 1 + StC

Build logline and theme.

Step 2 + StC

Expand into Act-based paragraph guided by beat prompts.

Step 3

Build character profiles with StC emotional/arc questions.

Step 4–6

Generate extended synopses and scene list.

Assign each scene to a beat as you go.

Beat Sheet View

Check coverage and pacing.

Adjust scene order/beat assignments visually.

Step 7–10

Use all of that as the spine for drafting.

If you’d like, next step I can:

Draft a data model (e.g., JSON / TypeScript interfaces) that bakes in Snowflake + Save the Cat.

Or design a wizard flow specifically for “Create a new Snowflake+StC novel” with step-by-step screens and prompts.

You said:
Make the data model 
ChatGPT said:

Thought for 16s
Here’s a concrete, opinionated TypeScript data model that bakes in:

Snowflake steps

Save the Cat beats

Save the Cat genres (story archetypes)

Scenes & characters tied into both

You can use this for a local web app (React/Next/etc.) or adapt to another language.

1. Core enums
// --- Snowflake ---

export enum SnowflakeStepNumber {
  Step1 = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  Step5 = 5,
  Step6 = 6,
  Step7 = 7,
  Step8 = 8,
  Step9 = 9,
  Step10 = 10,
}

// --- Save the Cat Beats ---

export enum SaveTheCatBeatType {
  OpeningImage = "OpeningImage",
  ThemeStated = "ThemeStated",
  Setup = "Setup",
  Catalyst = "Catalyst",
  Debate = "Debate",
  BreakIntoTwo = "BreakIntoTwo",
  BStory = "BStory",
  FunAndGames = "FunAndGames",
  Midpoint = "Midpoint",
  BadGuysCloseIn = "BadGuysCloseIn",
  AllIsLost = "AllIsLost",
  DarkNightOfTheSoul = "DarkNightOfTheSoul",
  BreakIntoThree = "BreakIntoThree",
  Finale = "Finale",
  FinalImage = "FinalImage",
}

// Handy for filtering/pacing views
export enum StoryAct {
  Act1 = 1,
  Act2 = 2,
  Act3 = 3,
}

// High-level categories of characters
export enum CharacterRole {
  Protagonist = "Protagonist",
  Antagonist = "Antagonist",
  Ally = "Ally",
  Mentor = "Mentor",
  LoveInterest = "LoveInterest",
  Other = "Other",
}

// Scene / beat completeness for UI
export enum DraftStatus {
  Idea = "Idea",
  Outline = "Outline",
  Draft = "Draft",
  Revised = "Revised",
  Final = "Final",
}
2. Save the Cat genres (archetypes)
Each STC “genre” (Golden Fleece, Whydunit, etc.) is a config object that can change prompts and emphasis.

export interface SaveTheCatGenreConfig {
  id: string;            // e.g. "golden-fleece"
  name: string;          // "Golden Fleece"
  description: string;
  // Which beats are especially important / emphasized
  keyBeats: SaveTheCatBeatType[];
  // Beat-specific guiding questions for this genre
  beatPrompts: {
    [beat in SaveTheCatBeatType]?: string[];
  };
}
You can ship some built-in configs and store them in JSON.

3. Project-level model
This is the main “novel” object.

export interface StoryProject {
  id: string;
  title: string;
  workingTitle?: string;

  logline?: Logline;
  themeStatement?: string;

  createdAt: string; // ISO
  updatedAt: string;

  settings: ProjectSettings;

  snowflake: SnowflakeState;
  saveTheCat: SaveTheCatState;

  // Core content
  characters: Character[];
  scenes: Scene[];
  locations: Location[];

  // Free-form notes or scratchpads
  notes?: ProjectNote[];
}

export interface ProjectSettings {
  wordCountTarget?: number;
  saveTheCatGenreId?: string;    // references SaveTheCatGenreConfig.id
  enableSnowflake: boolean;
  enableSaveTheCat: boolean;
}
4. Logline + theme (Snowflake Step 1 + STC)
export interface Logline {
  oneSentenceSummary: string;  // classic Snowflake Step 1
  protagonist: string;
  flawOrNeed: string;
  goal: string;
  antagonisticForce: string;
  stakes: string;

  // Optional links to beats
  openingImageIdea?: string;
  finalImageIdea?: string;
}
5. Snowflake state
You get a generic step model plus strongly-typed payloads for the early steps that matter most.

export interface SnowflakeState {
  steps: SnowflakeStep[];
}

export interface SnowflakeStep {
  stepNumber: SnowflakeStepNumber;
  label: string; // "One Sentence Summary", etc.
  status: DraftStatus;
  lastEditedAt?: string;

  // Type-specific content; only one should be populated for each step
  step1Data?: SnowflakeStep1Data;
  step2Data?: SnowflakeStep2Data;
  step3Data?: SnowflakeStep3Data;
  // Steps 4–10 can be more generic, but still captured:
  genericText?: string;
}

// Step 1: one sentence + logline + theme
export interface SnowflakeStep1Data {
  oneSentenceSummary: string;
  logline: Logline;
  themeStatement: string;
}

// Step 2: one paragraph summary split into acts
export interface SnowflakeStep2Data {
  actSummaries: {
    act: StoryAct;
    paragraph: string;
  }[];

  // Optional mapping to major beats in each act
  highlightedBeats?: {
    beat: SaveTheCatBeatType;
    shortSummary: string;
  }[];
}

// Step 3: high-level character summaries
export interface SnowflakeStep3Data {
  characterSummaries: CharacterSnowflakeSummary[];
}

export interface CharacterSnowflakeSummary {
  characterId: string;
  oneParagraphBio: string;
  storyRole: CharacterRole;
  arcSummary: string;
}
For Steps 4–10 you can keep it loose (big text blobs) but still track status/version; if you want, you can later specialize them too.

6. Save the Cat state (beats + coverage)
export interface SaveTheCatState {
  genreId?: string;  // selected genre; used to pull prompts

  // One instance of each “canonical” beat (Opening Image, Midpoint, etc.)
  beats: SaveTheCatBeatInstance[];
}

export interface SaveTheCatBeatInstance {
  id: string;
  type: SaveTheCatBeatType;

  act: StoryAct;
  // 0–1 position in story (e.g. 0.12 = 12% in)
  targetStoryPosition?: number;

  // High-level summary of what happens at this beat
  summary: string;

  // Which scenes currently fulfill this beat
  sceneIds: string[];

  status: DraftStatus;

  notes?: string;
}
This is what powers a “Beat Sheet View” in your UI.

7. Characters with Save the Cat arc fields
export interface Character {
  id: string;
  name: string;
  role: CharacterRole;

  // Core concept
  shortDescription?: string;
  imageUrl?: string;

  // STC-flavored arc info
  wants?: string;   // surface goal
  needs?: string;   // deeper emotional truth
  ghostOrWound?: string;
  sixThingsThatNeedFixing?: string[];  // STC classic

  // Optional map: how this character appears in key beats
  beatInvolvement?: CharacterBeatInvolvement[];

  // General bio for Snowflake Step 3 / 4+
  background?: string;
  internalConflict?: string;
  externalConflict?: string;

  notes?: string;
}

export interface CharacterBeatInvolvement {
  beatType: SaveTheCatBeatType;
  description: string;        // what they do here
  emotionalShift?: string;    // how they change in this beat
}
8. Scenes as the glue (Snowflake Step 7+ and STC beats)
Scenes/cards are where everything meets: act, beat, POV, origin step, etc.

export interface Scene {
  id: string;
  index: number;            // order in book
  chapter?: number;         // optional group

  title: string;
  act: StoryAct;

  // Core outline content
  shortSummary: string;     // 1–2 sentence
  detailedOutline?: string; // more Snowflake detail

  povCharacterId?: string;
  locationId?: string;

  // Primary Save the Cat beat this scene serves
  primaryBeat?: SaveTheCatBeatType;
  // Additional beats if it carries more than one function
  secondaryBeats?: SaveTheCatBeatType[];

  // Which Snowflake step this scene came from (provenance)
  originSnowflakeStep?: SnowflakeStepNumber;

  targetWordCount?: number;
  status: DraftStatus;

  // For reordering / timeline visual
  timelinePosition?: number; // e.g., 1..n or 0..1

  notes?: string;
}
This is the model that will drive:

A scene list / table view

A Kanban-style board by beat or act

A Beat Sheet view by grouping scenes by primaryBeat

9. Locations & notes (supporting objects)
export interface Location {
  id: string;
  name: string;
  shortDescription?: string;
  notes?: string;
}

export interface ProjectNote {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
10. Minimal example object
Just to show how it hangs together:

const project: StoryProject = {
  id: "proj-1",
  title: "Starbound City",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  settings: {
    enableSnowflake: true,
    enableSaveTheCat: true,
    saveTheCatGenreId: "golden-fleece",
    wordCountTarget: 90000,
  },
  logline: {
    oneSentenceSummary: "A reluctant princess must protect her city from a rising cosmic threat.",
    protagonist: "Reluctant princess",
    flawOrNeed: "Avoids responsibility, fears failure",
    goal: "Protect her city",
    antagonisticForce: "Ancient cosmic enemy returning",
    stakes: "Destruction of her city and loss of her family",
    openingImageIdea: "Princess watching peaceful city at sunset",
    finalImageIdea: "Princess leading survivors into a new dawn",
  },
  themeStatement: "Courage is choosing responsibility even when you feel unready.",
  snowflake: {
    steps: [
      {
        stepNumber: SnowflakeStepNumber.Step1,
        label: "One Sentence Summary",
        status: DraftStatus.Outline,
        step1Data: {
          oneSentenceSummary: "A reluctant princess must protect her city from a rising cosmic threat.",
          logline: /* same as above */ {} as any,
          themeStatement: "Courage is choosing responsibility even when you feel unready.",
        },
      },
      // Step2, Step3 etc...
    ],
  },
  saveTheCat: {
    genreId: "golden-fleece",
    beats: [
      {
        id: "beat-opening",
        type: SaveTheCatBeatType.OpeningImage,
        act: StoryAct.Act1,
        targetStoryPosition: 0.0,
        summary: "Princess watching the city at sunset, detached from her duties.",
        sceneIds: ["scene-1"],
        status: DraftStatus.Outline,
      },
      // other beats...
    ],
  },
  characters: [],
  scenes: [],
  locations: [],
  notes: [],
};
If you tell me what stack you’re leaning toward (plain React, Next.js + Supabase, local-only, etc.), I can next:

Trim this into a Prisma schema,

Or a Supabase table design,

Or wire it into a starter zod schema set for validation.



No file chosenNo file chosen
ChatGPT can make mistakes. Check important info.
