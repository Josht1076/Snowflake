/**
 * Save the Cat story archetypes (genres)
 */

export interface StcArchetype {
  id: string;
  name: string;
  description: string;
}

export const stcArchetypes: StcArchetype[] = [
  {
    id: 'stc-monster-in-the-house',
    name: 'Monster in the House',
    description: 'A confined space, a sin, and a monster that punishes the sin.',
  },
  {
    id: 'stc-golden-fleece',
    name: 'Golden Fleece',
    description: 'A road trip where the journey transforms the hero.',
  },
  {
    id: 'stc-out-of-the-bottle',
    name: 'Out of the Bottle',
    description: 'A wish granted with escalating consequences.',
  },
  {
    id: 'stc-dude-with-a-problem',
    name: 'Dude with a Problem',
    description: 'An ordinary person thrust into extraordinary circumstances.',
  },
  {
    id: 'stc-rites-of-passage',
    name: 'Rites of Passage',
    description: 'Life transitions and the pain of growing up or changing.',
  },
  {
    id: 'stc-buddy-love',
    name: 'Buddy Love',
    description: 'Two characters whose relationship drives the story.',
  },
  {
    id: 'stc-whydunit',
    name: 'Whydunit',
    description: 'A mystery where uncovering the truth reveals human nature.',
  },
  {
    id: 'stc-fool-triumphant',
    name: 'Fool Triumphant',
    description: 'An underdog who outwits a more powerful establishment.',
  },
  {
    id: 'stc-institutionalized',
    name: 'Institutionalized',
    description: 'A group, system, or family and the individual within it.',
  },
  {
    id: 'stc-superhero',
    name: 'Superhero',
    description: 'An extraordinary hero in an ordinary world.',
  },
];

export function getStcArchetypeById(id: string): StcArchetype | undefined {
  return stcArchetypes.find((archetype) => archetype.id === id);
}
