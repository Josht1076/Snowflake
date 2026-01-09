/**
 * 10 refined novel-focused story genres
 * Adapted from Save the Cat for novel writing
 */

export interface Genre {
  id: string;
  name: string;
  description: string;
  engine: string;
  focusAreas: string[];
  subtypes: string[];
  distinct: string;
}

export const genres: Genre[] = [
  {
    id: 'encroaching-doom',
    name: 'The Encroaching Doom',
    description: 'A growing external threat exposes an internal or societal flaw.',
    engine: 'Pressure escalates from an outside force (monster, plague, war, magic anomaly, cosmic event). Survival requires confronting guilt, denial, or complicity.',
    focusAreas: ['slow dread', 'political tension', 'moral decay', 'cause of the threat'],
    subtypes: ['Supernatural corruption', 'Cosmic/planetary threat', 'Ancient evil rekindled', 'Science gone wrong'],
    distinct: 'The threat grows and tightens, and its root cause mirrors the story\'s theme.',
  },
  {
    id: 'transformative-quest',
    name: 'The Transformative Quest',
    description: 'A journey in which the protagonist or party is reshaped by distance, trials, and time.',
    engine: 'Movement through a world—geographical, mystical, or interstellar—forces internal evolution.',
    focusAreas: ['companion relationships', 'symbolic trials', 'evolving worldview'],
    subtypes: ['Classic quest', 'Found family adventure', 'Spacefaring odyssey', 'Spiritual pilgrimage'],
    distinct: 'The journey itself is the structure, and the ending reframes the starting point.',
  },
  {
    id: 'power-with-price',
    name: 'Power With a Price',
    description: 'The acquisition of power reveals character flaws and carries escalating consequences.',
    engine: 'A gift, curse, technology, magic, or ability accelerates the protagonist\'s rise—and downfall.',
    focusAreas: ['cost of ambition', 'moral temptation', 'world rules', 'unintended ripple effects'],
    subtypes: ['Dangerous magic', 'Forbidden knowledge', 'Superpowered awakening', 'Tech-enhanced abilities'],
    distinct: 'The "wish" appears beneficial but drives the internal conflict.',
  },
  {
    id: 'thrust-into-chaos',
    name: 'The Thrust-Into-Chaos Survivor',
    description: 'An unprepared individual must navigate overwhelming danger or responsibility.',
    engine: 'Sudden disruption (portal, war, disaster, abduction, conspiracy) forces adaptability.',
    focusAreas: ['resourcefulness', 'fear', 'resilience', 'learning curve'],
    subtypes: ['Portal fantasy survival', 'Planet/ship disaster', 'Outbreak/event thriller', 'Underworld/hidden society'],
    distinct: 'A regular or unready person must rise quickly amid escalating crises.',
  },
  {
    id: 'inner-metamorphosis',
    name: 'The Inner Metamorphosis',
    description: 'A protagonist undergoes a profound internal change driven by emotional upheaval.',
    engine: 'A life transition—grief, identity, adulthood, trauma, new role—forces the protagonist to reinvent their inner self.',
    focusAreas: ['introspection', 'relationships', 'internal conflict mirrored by external plot'],
    subtypes: ['Coming-of-age', 'Grief transformation', 'Leadership awakening', 'Identity reclamation'],
    distinct: 'The story is defined by who the protagonist becomes, not what they defeat.',
  },
  {
    id: 'converging-destinies',
    name: 'Converging Destinies',
    description: 'Two (or more) characters whose lives must reconcile conflict to achieve a shared fate.',
    engine: 'Relationship tension—whether romantic, platonic, or combative—drives the story.',
    focusAreas: ['dual POV', 'mirrored flaws', 'emotional stakes', 'break → lesson → reunion'],
    subtypes: ['Rivals to allies', 'Fated partners', 'Fractured siblings', 'Mentor/student inversion'],
    distinct: 'The relationship is the plot engine and the thematic heart.',
  },
  {
    id: 'buried-truth',
    name: 'The Buried Truth',
    description: 'A mystery leads to a revelation that reshapes the world or the self.',
    engine: 'Uncovering secrets—cosmic, magical, political, historical, personal—reveals a deeper truth with moral weight.',
    focusAreas: ['investigation', 'unreliable knowledge', 'layered worldbuilding'],
    subtypes: ['Conspiracy unraveling', 'Archaeological/found lore', 'Magical/sci-fi anomaly', 'Character-secret-driven mystery'],
    distinct: 'The "reveal" exposes both external truth and internal change.',
  },
  {
    id: 'emergent-hero',
    name: 'The Emergent Hero',
    description: 'An underestimated protagonist rises not through power but through authenticity.',
    engine: 'The world underestimates the hero; they succeed through heart, wit, creativity, or decency.',
    focusAreas: ['humor', 'sincerity', 'surprising competence', 'worldview clashes'],
    subtypes: ['Reluctant hero', 'Soft power triumph', 'Humble origins', 'Accidental leadership'],
    distinct: 'The protagonist wins by leaning into what makes them "small."',
  },
  {
    id: 'defying-order',
    name: 'Defying the Order',
    description: 'A character must choose between individuality and a powerful group ideology.',
    engine: 'A system—empire, military, religion, academy, corporation—demands conformity. The protagonist resists, reforms, or escapes.',
    focusAreas: ['political tension', 'moral conflict', 'personal vs. communal identity'],
    subtypes: ['Dystopian resistance', 'Military/academy indoctrination', 'Religious or magical orders', 'Corporate/AI-controlled society'],
    distinct: 'The institution exists as the antagonist—ideas vs. identity.',
  },
  {
    id: 'burdened-prodigy',
    name: 'The Burdened Prodigy',
    description: 'A uniquely gifted individual must bear the weight of destiny, power, or prophecy.',
    engine: 'Extraordinary ability generates isolation, responsibility, and a mirrored nemesis.',
    focusAreas: ['destiny vs. agency', 'sacrifice', 'self-acceptance', 'power ethics'],
    subtypes: ['Chosen one', 'Prophesied heir', 'Forbidden magic bearer', 'Genetic/superhuman anomaly'],
    distinct: 'Power isn\'t freedom—it\'s a crushing responsibility shaping every choice.',
  },
];

/**
 * Get genre by ID
 */
export function getGenreById(id: string): Genre | undefined {
  return genres.find((g) => g.id === id);
}

/**
 * Get all genre IDs
 */
export function getAllGenreIds(): string[] {
  return genres.map((g) => g.id);
}

