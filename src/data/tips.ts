/**
 * Tip definitions with filters
 * Tips are contextual based on step, genre, and STC archetype
 */

export interface Tip {
  id: string;
  title: string;
  body: string;
  appliesToFrameworkSteps?: string[]; // e.g. ['sf_step_1']
  appliesToGenres?: string[];
  appliesToPrimaryStc?: string[];
  appliesToSecondaryStc?: string[];
}

export const tips: Tip[] = [
  {
    id: 'tip-step1-word-count',
    title: 'Keep it concise',
    body: 'Aim for 15 words or fewer. This forces you to focus on the core conflict.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-step1-no-names',
    title: 'Avoid character names',
    body: 'Use roles or descriptions instead. "A reluctant princess" is stronger than "Princess Elara".',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-step1-problem-not-premise',
    title: 'Lead with the problem',
    body: 'Make the sentence about what is at stake and what stands in the way, not just the setting or gimmick.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-step1-active-verb',
    title: 'Use an active verb',
    body: 'Phrases like “must stop,” “must escape,” or “must prove” create momentum and clarity.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-step1-stakes-visible',
    title: 'Make stakes explicit',
    body: 'End with what happens if they fail. If the cost isn’t clear, the hook won’t bite.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },

  // -------------------------
  // STEP 2 - One paragraph
  // -------------------------
  {
    id: 'tip-step2-three-disasters',
    title: 'Three disasters structure',
    body: 'Each disaster should represent roughly a quarter of your book. The last quarter is the resolution.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-step2-escalate-not-repeat',
    title: 'Escalate, don’t repeat',
    body: 'Each disaster should be worse in a new way: higher cost, tighter time, fewer options.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-step2-cause-and-effect',
    title: 'Chain them with causality',
    body: 'Disaster 2 should happen because of choices made after Disaster 1, not from random bad luck.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-step2-midpoint-turn',
    title: 'Make the midpoint a turn',
    body: 'Around the middle, shift the game: a reveal, a reversal, or a decision that changes the rules.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-step2-resolution-earned',
    title: 'Earn the ending',
    body: 'The final outcome should come from the protagonist’s growth and choices, not a convenient rescue.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },

  // -------------------------
  // STEP 3 - Characters
  // -------------------------
  {
    id: 'tip-step3-character-arc',
    title: 'Character transformation',
    body: 'Show how each character changes from beginning to end. What do they learn?',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-step3-want-vs-need',
    title: 'Want vs. need',
    body: 'Define what they think they want, then what they actually need. The arc is the distance between them.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-step3-wound-drives-choice',
    title: 'Let the wound drive choices',
    body: 'Backstory matters most when it explains why they keep making the wrong choice under pressure.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-step3-relationships-test-arc',
    title: 'Pressure-test relationships',
    body: 'Give each major relationship a moment where loyalty is tested and a choice must be made.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-step3-antagonist-believes-they-are-right',
    title: 'Antagonists are heroes to themselves',
    body: 'Give the opposition a coherent goal and values. A strong antagonist strengthens the theme.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },

  // -------------------------
  // Snowflake Method - full tip set (steps 1-10)
  // -------------------------
  // STEP 1 - One-Sentence Summary
  {
    id: 'tip-sf1-core-conflict',
    title: 'Center the core conflict',
    body: 'Your sentence should answer: who wants what, and what stands in the way. Everything else is garnish.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-sf1-no-worldbuilding',
    title: 'Resist worldbuilding',
    body: 'Settings and lore belong later. If the sentence works without them, the story is strong.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },
  {
    id: 'tip-sf1-theme-hint',
    title: 'Hint at theme',
    body: 'Great one-liners imply a moral or question without stating it outright.',
    appliesToFrameworkSteps: ['sf_step_1'],
  },

  // STEP 2 - One-Paragraph Summary
  {
    id: 'tip-sf2-structure-not-prose',
    title: 'Think structure, not prose',
    body: 'This paragraph is a skeleton: setup, escalation, disaster, resolution. Do not polish yet.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-sf2-point-of-no-return',
    title: 'Mark the point of no return',
    body: 'The middle of this paragraph should lock the protagonist into the conflict permanently.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },
  {
    id: 'tip-sf2-ending-earned',
    title: 'End with consequence',
    body: 'The resolution should feel like the inevitable result of earlier choices, not a twist for shock value.',
    appliesToFrameworkSteps: ['sf_step_2'],
  },

  // STEP 3 - Character Summaries
  {
    id: 'tip-sf3-goals-and-fear',
    title: 'Define goal and fear',
    body: 'A compelling character wants something concrete and fears something emotional. Both should shape decisions.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-sf3-flaw-drives-plot',
    title: 'Let flaws cause trouble',
    body: 'If a flaw never makes things worse, it is just flavor, not character.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },
  {
    id: 'tip-sf3-antagonist-logic',
    title: 'Give antagonists a philosophy',
    body: 'They should believe they are right. Their worldview should challenge the theme directly.',
    appliesToFrameworkSteps: ['sf_step_3'],
  },

  // STEP 4 - Expanded Paragraph (Full Synopsis)
  {
    id: 'tip-sf4-causality',
    title: 'Prioritize cause and effect',
    body: 'Each major event should happen because of a previous choice, not coincidence.',
    appliesToFrameworkSteps: ['sf_step_4'],
  },
  {
    id: 'tip-sf4-midpoint-shift',
    title: 'Change the game at midpoint',
    body: 'Reveal new information or reverse expectations so the second half is not a repeat of the first.',
    appliesToFrameworkSteps: ['sf_step_4'],
  },
  {
    id: 'tip-sf4-thematic-echo',
    title: 'Echo the theme',
    body: 'Major plot turns should argue different sides of your story question.',
    appliesToFrameworkSteps: ['sf_step_4'],
  },

  // STEP 5 - Character Deep Dives
  {
    id: 'tip-sf5-backstory-purpose',
    title: 'Backstory must justify behavior',
    body: 'If a past event does not explain present choices, cut or condense it.',
    appliesToFrameworkSteps: ['sf_step_5'],
  },
  {
    id: 'tip-sf5-arc-clarity',
    title: 'Track the arc explicitly',
    body: 'Note where the character starts, what breaks them, and who they choose to be at the end.',
    appliesToFrameworkSteps: ['sf_step_5'],
  },
  {
    id: 'tip-sf5-relationship-friction',
    title: 'Design relationship tension',
    body: 'Characters should collide because of mismatched values, not misunderstandings.',
    appliesToFrameworkSteps: ['sf_step_5'],
  },

  // STEP 6 - Expanded Synopsis (Scene-Level)
  {
    id: 'tip-sf6-scene-function',
    title: 'Every scene needs a job',
    body: 'Each scene should either escalate conflict, reveal character, or complicate the plan.',
    appliesToFrameworkSteps: ['sf_step_6'],
  },
  {
    id: 'tip-sf6-rising-pressure',
    title: 'Apply pressure consistently',
    body: 'Later scenes should remove options, increase cost, or shorten time.',
    appliesToFrameworkSteps: ['sf_step_6'],
  },
  {
    id: 'tip-sf6-no-filler',
    title: 'Cut connective tissue',
    body: 'If a scene only moves characters physically, summarize it or delete it.',
    appliesToFrameworkSteps: ['sf_step_6'],
  },

  // STEP 7 - Character Charts
  {
    id: 'tip-sf7-change-mapping',
    title: 'Map change over time',
    body: 'Track how beliefs, loyalties, and fears evolve across major beats.',
    appliesToFrameworkSteps: ['sf_step_7'],
  },
  {
    id: 'tip-sf7-contrast-arcs',
    title: 'Contrast character arcs',
    body: 'Parallel or opposing arcs make themes clearer and conflicts sharper.',
    appliesToFrameworkSteps: ['sf_step_7'],
  },
  {
    id: 'tip-sf7-secondary-agency',
    title: 'Give side characters agency',
    body: 'Supporting characters should make choices that affect the plot, not just react.',
    appliesToFrameworkSteps: ['sf_step_7'],
  },

  // STEP 8 - Scene List
  {
    id: 'tip-sf8-goal-conflict-outcome',
    title: 'Use goal-conflict-outcome',
    body: 'Every scene should start with a goal, face resistance, and end with a change.',
    appliesToFrameworkSteps: ['sf_step_8'],
  },
  {
    id: 'tip-sf8-end-with-motion',
    title: 'End scenes in motion',
    body: 'Close on a decision, reveal, or complication that pulls the reader forward.',
    appliesToFrameworkSteps: ['sf_step_8'],
  },
  {
    id: 'tip-sf8-vary-tempo',
    title: 'Vary scene intensity',
    body: 'Alternate high-tension scenes with quieter emotional beats to avoid fatigue.',
    appliesToFrameworkSteps: ['sf_step_8'],
  },

  // STEP 9 - Scene Expansion
  {
    id: 'tip-sf9-dramatize',
    title: 'Dramatize, do not summarize',
    body: 'Convert bullet points into lived moments with sensory detail and choice.',
    appliesToFrameworkSteps: ['sf_step_9'],
  },
  {
    id: 'tip-sf9-subtext',
    title: 'Layer subtext',
    body: 'Let characters want different things from the same scene.',
    appliesToFrameworkSteps: ['sf_step_9'],
  },
  {
    id: 'tip-sf9-echo-theme',
    title: 'Reinforce the theme quietly',
    body: 'Small choices should reflect the same moral questions as big ones.',
    appliesToFrameworkSteps: ['sf_step_9'],
  },

  // STEP 10 - First Draft
  {
    id: 'tip-sf10-finish-not-perfect',
    title: 'Finish the draft',
    body: 'A complete, imperfect draft is infinitely more valuable than a polished fragment.',
    appliesToFrameworkSteps: ['sf_step_10'],
  },
  {
    id: 'tip-sf10-trust-the-plan',
    title: 'Trust the structure',
    body: 'When stuck, return to earlier Snowflake steps. The answers are usually already there.',
    appliesToFrameworkSteps: ['sf_step_10'],
  },
  {
    id: 'tip-sf10-revision-mindset',
    title: 'Drafting is discovery',
    body: 'You are allowed to learn things while writing. Revisions exist for a reason.',
    appliesToFrameworkSteps: ['sf_step_10'],
  },

  // -------------------------
  // Genre tips (your existing)
  // -------------------------
  {
    id: 'tip-encroaching-doom',
    title: 'Building dread',
    body: 'Let the threat grow gradually. Show its effects on the world before the final confrontation.',
    appliesToGenres: ['encroaching-doom'],
  },
  {
    id: 'tip-encroaching-doom-clock',
    title: 'Make the doom measurable',
    body: 'A spreading map, a countdown, worsening symptoms - tangible markers amplify dread.',
    appliesToGenres: ['encroaching-doom'],
  },
  {
    id: 'tip-transformative-quest',
    title: 'Journey as transformation',
    body: 'Each location or trial should mirror the protagonist\'s internal growth.',
    appliesToGenres: ['transformative-quest'],
  },
  {
    id: 'tip-transformative-quest-milestones',
    title: 'Milestones, not travelogues',
    body: 'Skip filler travel. Only show places that force a decision, reveal a truth, or change the plan.',
    appliesToGenres: ['transformative-quest'],
  },
  {
    id: 'tip-power-with-price',
    title: 'Cost of power',
    body: 'Show the consequences early. Power should create problems, not just solve them.',
    appliesToGenres: ['power-with-price'],
  },
  {
    id: 'tip-power-with-price-compounding',
    title: 'Let the price compound',
    body: 'The “cost” should increase with reliance: relationships fray, morals blur, control slips.',
    appliesToGenres: ['power-with-price'],
  },

  // -------------------------
  // Save the Cat plot-type tips (aligned to genres)
  // -------------------------
  // 1) MONSTER IN THE HOUSE -> Encroaching Doom
  {
    id: 'tip-stc-monster-house-rules',
    title: 'Define the monster rules early',
    body: 'Clarify what the threat can/can\'t do, how it spreads, and what makes it worse. Readers fear what feels consistent.',
    appliesToPrimaryStc: ['stc-monster-in-the-house'],
    appliesToGenres: ['encroaching-doom'],
  },
  {
    id: 'tip-stc-monster-house-sin',
    title: 'Make the "sin" personal',
    body: 'The doom hits hardest when it punishes denial, guilt, or complicity. Tie the threat to a moral choice, not just survival.',
    appliesToPrimaryStc: ['stc-monster-in-the-house'],
    appliesToGenres: ['encroaching-doom'],
  },
  {
    id: 'tip-stc-monster-house-escalation',
    title: 'Escalate in stages',
    body: 'Show early symptoms -> visible damage -> social collapse -> no-way-out pressure. Each stage removes a previous safety net.',
    appliesToPrimaryStc: ['stc-monster-in-the-house'],
    appliesToGenres: ['encroaching-doom'],
  },
  {
    id: 'tip-stc-monster-house-contained-space',
    title: 'Use "the house" as a pressure cooker',
    body: 'Even in epic scope, create bottlenecks: quarantine zones, locked cities, failing ships, isolated factions. Confinement intensifies dread.',
    appliesToPrimaryStc: ['stc-monster-in-the-house'],
    appliesToGenres: ['encroaching-doom'],
  },

  // 2) GOLDEN FLEECE -> Transformative Quest
  {
    id: 'tip-stc-golden-fleece-milestones',
    title: 'Quest = milestones, not miles',
    body: 'Every stop should change the plan: gain an ally, lose a resource, reveal a truth, or force a new cost.',
    appliesToPrimaryStc: ['stc-golden-fleece'],
    appliesToGenres: ['transformative-quest'],
  },
  {
    id: 'tip-stc-golden-fleece-team-roles',
    title: 'Give the party distinct jobs',
    body: 'Each companion should solve one kind of problem and cause one kind of trouble. That keeps the team engine alive.',
    appliesToPrimaryStc: ['stc-golden-fleece'],
    appliesToGenres: ['transformative-quest'],
  },
  {
    id: 'tip-stc-golden-fleece-inner-map',
    title: 'Mirror an inner journey',
    body: 'Design locations as emotional tests: fear, pride, grief, loyalty. The final destination should reframe the beginning.',
    appliesToPrimaryStc: ['stc-golden-fleece'],
    appliesToGenres: ['transformative-quest'],
  },
  {
    id: 'tip-stc-golden-fleece-object-meaning',
    title: 'The prize must mean something',
    body: 'A thing is fine, but its meaning should evolve: it starts as a goal and ends as a choice about values.',
    appliesToPrimaryStc: ['stc-golden-fleece'],
    appliesToGenres: ['transformative-quest'],
  },

  // 3) OUT OF THE BOTTLE -> Power With a Price
  {
    id: 'tip-stc-out-bottle-wish',
    title: 'Define the "wish" clearly',
    body: 'Name the power, what it promises, and what it tempts. The clearer the benefit, the sharper the eventual cost.',
    appliesToPrimaryStc: ['stc-out-of-the-bottle'],
    appliesToGenres: ['power-with-price'],
  },
  {
    id: 'tip-stc-out-bottle-cost-early',
    title: 'Show the cost early (small)',
    body: 'Introduce a minor consequence in Act 1-2 so readers trust the rules. Later, scale it into something irreversible.',
    appliesToPrimaryStc: ['stc-out-of-the-bottle'],
    appliesToGenres: ['power-with-price'],
  },
  {
    id: 'tip-stc-out-bottle-compounding',
    title: 'Let reliance compound the damage',
    body: 'Each use should narrow options: relationships fray, ethics slip, enemies adapt, the power demands more.',
    appliesToPrimaryStc: ['stc-out-of-the-bottle'],
    appliesToGenres: ['power-with-price'],
  },
  {
    id: 'tip-stc-out-bottle-true-need',
    title: 'The cure is never "more power"',
    body: 'Resolution should come from character change: restraint, honesty, sacrifice, or redefining what winning means.',
    appliesToPrimaryStc: ['stc-out-of-the-bottle'],
    appliesToGenres: ['power-with-price'],
  },

  // 4) DUDE WITH A PROBLEM -> Thrust-Into-Chaos Survivor
  {
    id: 'tip-stc-dude-problem-clock',
    title: 'Add a ticking clock',
    body: 'Survivor stories thrive on urgency: infection spread, oxygen loss, pursuit radius, deadline, or exposure risk.',
    appliesToPrimaryStc: ['stc-dude-with-a-problem'],
    appliesToGenres: ['thrust-into-chaos-survivor'],
  },
  {
    id: 'tip-stc-dude-problem-learning-curve',
    title: 'Make competence earned',
    body: 'Show mistakes, adaptation, and hard lessons. Readers root for growth more than effortless skill.',
    appliesToPrimaryStc: ['stc-dude-with-a-problem'],
    appliesToGenres: ['thrust-into-chaos-survivor'],
  },
  {
    id: 'tip-stc-dude-problem-toolbox',
    title: 'Give them a limited toolbox',
    body: 'Restrict resources: one weapon, one ally, one safe place, one lie. Constraints create clever solutions and tension.',
    appliesToPrimaryStc: ['stc-dude-with-a-problem'],
    appliesToGenres: ['thrust-into-chaos-survivor'],
  },
  {
    id: 'tip-stc-dude-problem-bigger-picture',
    title: 'Reveal the real problem late',
    body: 'Start with the obvious crisis, then unveil the deeper cause: conspiracy, hidden ecosystem, political motive, or cosmic rule.',
    appliesToPrimaryStc: ['stc-dude-with-a-problem'],
    appliesToGenres: ['thrust-into-chaos-survivor'],
  },

  // 5) RITES OF PASSAGE -> Inner Metamorphosis
  {
    id: 'tip-stc-rites-passage-transition',
    title: 'Anchor it to a life transition',
    body: 'Choose a clear before/after: adulthood, grief, leadership, identity, parenthood, exile, recovery. The plot is the change.',
    appliesToPrimaryStc: ['stc-rites-of-passage'],
    appliesToGenres: ['inner-metamorphosis'],
  },
  {
    id: 'tip-stc-rites-passage-mirror',
    title: 'Use external events as mirrors',
    body: 'The outside plot should force the internal shift: a relationship breaks, a truth surfaces, a responsibility cannot be avoided.',
    appliesToPrimaryStc: ['stc-rites-of-passage'],
    appliesToGenres: ['inner-metamorphosis'],
  },
  {
    id: 'tip-stc-rites-passage-symbolic-choice',
    title: 'End with a symbolic choice',
    body: 'The climax should be a decision that proves change. Not "I feel different," but "I do something different."',
    appliesToPrimaryStc: ['stc-rites-of-passage'],
    appliesToGenres: ['inner-metamorphosis'],
  },
  {
    id: 'tip-stc-rites-passage-relationships',
    title: 'Let relationships carry the theme',
    body: 'A metamorphosis feels real when it costs something: distance from old friends, a new boundary, an earned forgiveness.',
    appliesToPrimaryStc: ['stc-rites-of-passage'],
    appliesToGenres: ['inner-metamorphosis'],
  },

  // 6) BUDDY LOVE -> Converging Destinies
  {
    id: 'tip-stc-buddy-love-flaws',
    title: 'Give them complementary flaws',
    body: 'They should trigger each other\'s worst habits and teach each other the missing skill or belief.',
    appliesToPrimaryStc: ['stc-buddy-love'],
    appliesToGenres: ['converging-destinies'],
  },
  {
    id: 'tip-stc-buddy-love-break',
    title: 'Plan a real break-up moment',
    body: 'Mid-story, force a separation driven by values or betrayal. Reunion must be earned through growth, not convenience.',
    appliesToPrimaryStc: ['stc-buddy-love'],
    appliesToGenres: ['converging-destinies'],
  },
  {
    id: 'tip-stc-buddy-love-third-force',
    title: 'Add a "third force" antagonist',
    body: 'The relationship is the engine, but a strong outside pressure (enemy, deadline, institution) keeps the plot moving.',
    appliesToPrimaryStc: ['stc-buddy-love'],
    appliesToGenres: ['converging-destinies'],
  },
  {
    id: 'tip-stc-buddy-love-shared-choice',
    title: 'Win only if they choose each other',
    body: 'The climax should require trust or sacrifice. If either could win alone, it is not truly Buddy Love.',
    appliesToPrimaryStc: ['stc-buddy-love'],
    appliesToGenres: ['converging-destinies'],
  },

  // 7) WHYDUNIT -> Buried Truth
  {
    id: 'tip-stc-whydunit-questions',
    title: 'Write the question ladder',
    body: 'Each answer should raise a deeper question: clue -> pattern -> motive -> system -> worldview-shifting truth.',
    appliesToPrimaryStc: ['stc-whydunit'],
    appliesToGenres: ['buried-truth'],
  },
  {
    id: 'tip-stc-whydunit-evidence',
    title: 'Let evidence change relationships',
    body: 'Every reveal should alter trust: ally becomes suspect, mentor becomes liar, enemy becomes understandable.',
    appliesToPrimaryStc: ['stc-whydunit'],
    appliesToGenres: ['buried-truth'],
  },
  {
    id: 'tip-stc-whydunit-fair-play',
    title: 'Play fair with the reader',
    body: 'Seed the key truth early in disguised form. The best twist feels surprising and inevitable.',
    appliesToPrimaryStc: ['stc-whydunit'],
    appliesToGenres: ['buried-truth'],
  },
  {
    id: 'tip-stc-whydunit-moral-weight',
    title: 'Make the truth costly',
    body: 'A buried truth should force a moral decision: expose it and lose everything, or hide it and become complicit.',
    appliesToPrimaryStc: ['stc-whydunit'],
    appliesToGenres: ['buried-truth'],
  },

  // 8) FOOL TRIUMPHANT -> Emergent Hero
  {
    id: 'tip-stc-fool-secret-weapon',
    title: 'Give them a "small" superpower',
    body: 'Kindness, humor, patience, weird expertise, social perception - something dismissed as weak that becomes decisive.',
    appliesToPrimaryStc: ['stc-fool-triumphant'],
    appliesToGenres: ['the-emergent-hero'],
  },
  {
    id: 'tip-stc-fool-underestimate',
    title: 'Let the world underestimate them',
    body: 'Repeated underestimation creates catharsis. The turn works best when others see the hero clearly - too late.',
    appliesToPrimaryStc: ['stc-fool-triumphant'],
    appliesToGenres: ['the-emergent-hero'],
  },
  {
    id: 'tip-stc-fool-earned-respect',
    title: 'Earn respect through action',
    body: 'Do not rely on speeches. Prove worth through choices that cost them comfort, pride, or safety.',
    appliesToPrimaryStc: ['stc-fool-triumphant'],
    appliesToGenres: ['the-emergent-hero'],
  },
  {
    id: 'tip-stc-fool-win-style',
    title: 'Win in their own style',
    body: 'The finale should hinge on what makes them small. If they win by becoming someone else, you lose the point.',
    appliesToPrimaryStc: ['stc-fool-triumphant'],
    appliesToGenres: ['the-emergent-hero'],
  },

  // 9) INSTITUTIONALIZED -> Defying the Order
  {
    id: 'tip-stc-institutionalized-rules',
    title: 'Define the institution ideology',
    body: 'Not just rules - beliefs. What good does the system claim to serve, and what does it demand in return?',
    appliesToPrimaryStc: ['stc-institutionalized'],
    appliesToGenres: ['defying-the-order'],
  },
  {
    id: 'tip-stc-institutionalized-temptation',
    title: 'Make conformity tempting',
    body: 'Safety, status, belonging, purpose. The best resistance stories admit why people stay.',
    appliesToPrimaryStc: ['stc-institutionalized'],
    appliesToGenres: ['defying-the-order'],
  },
  {
    id: 'tip-stc-institutionalized-cost',
    title: 'Resistance should cost something real',
    body: 'Loss of identity, family, rank, access, or home. Sacrifice is what proves conviction.',
    appliesToPrimaryStc: ['stc-institutionalized'],
    appliesToGenres: ['defying-the-order'],
  },
  {
    id: 'tip-stc-institutionalized-endgame',
    title: 'Choose an endgame: escape, reform, or burn it down',
    body: 'Clarity matters. Each option demands different scenes, allies, and moral compromises.',
    appliesToPrimaryStc: ['stc-institutionalized'],
    appliesToGenres: ['defying-the-order'],
  },

  // 10) SUPERHERO -> Burdened Prodigy
  {
    id: 'tip-stc-superhero-responsibility',
    title: 'Power = responsibility, not freedom',
    body: 'Show how ability isolates them: expectations, fear from others, tempting shortcuts, impossible tradeoffs.',
    appliesToPrimaryStc: ['stc-superhero'],
    appliesToGenres: ['burdened-prodigy'],
  },
  {
    id: 'tip-stc-superhero-ethics',
    title: 'Define the ethical line',
    body: 'What will they not do, even to win? Then force a moment where crossing the line would solve everything.',
    appliesToPrimaryStc: ['stc-superhero'],
    appliesToGenres: ['burdened-prodigy'],
  },
  {
    id: 'tip-stc-superhero-mirror',
    title: 'Use a mirrored rival',
    body: 'Give them an opponent with similar gifts but different values. The fight becomes a debate about identity.',
    appliesToPrimaryStc: ['stc-superhero'],
    appliesToGenres: ['burdened-prodigy'],
  },
  {
    id: 'tip-stc-superhero-agency',
    title: 'Destiny must collide with agency',
    body: 'Prophecy is fine, but the climax should be a chosen sacrifice or decision - something no prophecy can force.',
    appliesToPrimaryStc: ['stc-superhero'],
    appliesToGenres: ['burdened-prodigy'],
  },

  // -------------------------
  // General tips (no filters)
  // These always qualify and prevent “empty state” moments.
  // -------------------------
  {
    id: 'tip-general-specificity',
    title: 'Prefer specific over clever',
    body: 'Replace vague words (“danger,” “mystery,” “chaos”) with concrete problems and consequences.',
  },
  {
    id: 'tip-general-choices',
    title: 'Story is choices under pressure',
    body: 'If the protagonist is not choosing between costs, you are describing events, not telling a story.',
  },
  {
    id: 'tip-general-theme-question',
    title: 'Ask a theme question',
    body: 'Phrase your theme as a question (“Is mercy weakness?”). Your plot should argue both sides.',
  },
];

/**
 * Get tips for a given context
 */
export function getTipsForContext(
  stepId?: string,
  primaryGenreId?: string | null,
  secondaryGenreIds: string[] = [],
  primaryStcId?: string | null,
  secondaryStcId?: string | null
): Tip[] {
  return tips.filter((tip) => {
    // Check step match
    if (stepId && tip.appliesToFrameworkSteps) {
      if (!tip.appliesToFrameworkSteps.includes(stepId)) {
        return false;
      }
    }

    // Genre match: support primary + secondary
    const genreIds = [
      ...(primaryGenreId ? [primaryGenreId] : []),
      ...(secondaryGenreIds ?? []),
    ];

    if (genreIds.length && tip.appliesToGenres) {
      const matchesAny = tip.appliesToGenres.some((g) => genreIds.includes(g));
      if (!matchesAny) return false;
    }

    // Primary STC match
    if (tip.appliesToPrimaryStc) {
      if (!primaryStcId || !tip.appliesToPrimaryStc.includes(primaryStcId)) {
        return false;
      }
    }

    // Secondary STC match
    if (tip.appliesToSecondaryStc) {
      if (!secondaryStcId || !tip.appliesToSecondaryStc.includes(secondaryStcId)) {
        return false;
      }
    }

    return true;
  });
}

