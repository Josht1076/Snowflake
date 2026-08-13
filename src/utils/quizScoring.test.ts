import { describe, expect, it } from 'vitest';
import { getAllGenreIds } from '@/data/genres';
import { mapGenreNameToId } from '@/utils/quizScoring';

describe('mapGenreNameToId', () => {
  const quizGenreNames = [
    'Encroaching Doom',
    'Thrust-Into-Chaos Survivor',
    'Transformative Quest',
    'Buried Truth',
    'Power With a Price',
    'Burdened Prodigy',
    'Inner Metamorphosis',
    'Emergent Hero',
    'Converging Destinies',
    'Defying the Order',
  ];

  it('maps every Module 1 quiz genre name to a valid genre id', () => {
    const validIds = getAllGenreIds();

    for (const name of quizGenreNames) {
      const id = mapGenreNameToId(name);
      expect(id, `missing mapping for "${name}"`).not.toBeNull();
      expect(validIds, `invalid id for "${name}"`).toContain(id);
    }
  });

  it('returns null for unknown names', () => {
    expect(mapGenreNameToId('The Encroaching Doom')).toBeNull();
    expect(mapGenreNameToId('')).toBeNull();
  });
});
