import { describe, expect, it } from 'vitest';
import { getAllGenreIds } from '@/data/genres';
import { stcArchetypes } from '@/data/stcArchetypes';
import { snowflakeSteps } from '@/data/frameworks/snowflake';
import { getTipsForContext, tips } from '@/data/tips';

const validGenreIds = getAllGenreIds();
const validSnowflakeStepIds = snowflakeSteps.map((step) => step.id);
const validStcArchetypeIds = stcArchetypes.map((archetype) => archetype.id);

describe('tips data integrity', () => {
  it('uses only valid genre ids in appliesToGenres', () => {
    const broken: string[] = [];

    for (const tip of tips) {
      if (!tip.appliesToGenres) continue;
      for (const genreId of tip.appliesToGenres) {
        if (!validGenreIds.includes(genreId)) {
          broken.push(`${tip.id}: ${genreId}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });

  it('uses only defined Snowflake step ids in appliesToFrameworkSteps', () => {
    const broken: string[] = [];

    for (const tip of tips) {
      if (!tip.appliesToFrameworkSteps) continue;
      for (const stepId of tip.appliesToFrameworkSteps) {
        if (!validSnowflakeStepIds.includes(stepId)) {
          broken.push(`${tip.id}: ${stepId}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });

  it('uses only valid STC archetype ids in appliesToPrimaryStc and appliesToSecondaryStc', () => {
    const broken: string[] = [];

    for (const tip of tips) {
      const stcIds = [
        ...(tip.appliesToPrimaryStc ?? []),
        ...(tip.appliesToSecondaryStc ?? []),
      ];
      for (const stcId of stcIds) {
        if (!validStcArchetypeIds.includes(stcId)) {
          broken.push(`${tip.id}: ${stcId}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });
});

describe('getTipsForContext', () => {
  it('returns genre tips when primaryGenreId matches', () => {
    const matched = getTipsForContext(undefined, 'encroaching-doom');
    expect(matched.some((tip) => tip.id === 'tip-encroaching-doom')).toBe(true);
  });

  it('returns genre + STC tips when both ids match', () => {
    const matched = getTipsForContext(
      undefined,
      'emergent-hero',
      [],
      'stc-fool-triumphant'
    );
    expect(matched.some((tip) => tip.id === 'tip-stc-fool-secret-weapon')).toBe(true);
  });

  it('returns STC archetype tips when primaryStcId matches', () => {
    const matched = getTipsForContext(
      undefined,
      'encroaching-doom',
      [],
      'stc-monster-in-the-house'
    );
    expect(matched.some((tip) => tip.id === 'tip-stc-monster-house-rules')).toBe(true);
  });

  it('does not match genre tips when ids drift from genres.ts', () => {
    const matched = getTipsForContext(undefined, 'the-emergent-hero');
    expect(matched.some((tip) => tip.appliesToGenres?.includes('the-emergent-hero'))).toBe(
      false
    );
  });
});
