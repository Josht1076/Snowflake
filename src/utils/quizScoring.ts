/**
 * Quiz scoring logic for all modules
 * Handles different scoring types (genres, structures, tags, etc.)
 */

import { QuizModule } from '@/data/quiz/module1';

export interface QuizResult {
  scores: Record<string, number>;
  topTags: Array<{ tag: string; score: number }>;
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

/**
 * Score a quiz module based on user answers
 */
export function scoreModule(
  module: QuizModule,
  answers: Record<number, string>
): QuizResult {
  const scores: Record<string, number> = {};

  if (module.scoring.type === 'style') {
    // Module 5 has per-question mapping
    const mapping = module.scoring.mapping as Record<string, Record<string, string[]>>;

    module.questions.forEach((question) => {
      const answerKey = answers[question.id];
      if (!answerKey) return;

      const questionMapping = mapping[question.id.toString()] as Record<string, string[]> | undefined;
      if (!questionMapping) return;

      const tags = questionMapping[answerKey] || [];
      tags.forEach((tag) => {
        scores[tag] = (scores[tag] || 0) + 1;
      });
    });
  } else {
    // Standard mapping (A-E maps to tags)
    const mapping = module.scoring.mapping as Record<string, string[]>;

    module.questions.forEach((question) => {
      const answerKey = answers[question.id];
      if (!answerKey) return;

      const tags = mapping[answerKey] || [];
      tags.forEach((tag) => {
        scores[tag] = (scores[tag] || 0) + 1;
      });
    });
  }

  // Sort by score
  const topTags = Object.entries(scores)
    .map(([tag, score]) => ({ tag, score }))
    .sort((a, b) => b.score - a.score);

  return {
    scores,
    topTags,
    primary: topTags[0]?.tag,
    secondary: topTags[1]?.tag,
    tertiary: topTags[2]?.tag,
  };
}

/**
 * Map genre names to genre IDs
 */
export function mapGenreNameToId(genreName: string): string | null {
  const genreMap: Record<string, string> = {
    'Encroaching Doom': 'encroaching-doom',
    'Thrust-Into-Chaos Survivor': 'thrust-into-chaos',
    'Transformative Quest': 'transformative-quest',
    'Buried Truth': 'buried-truth',
    'Power With a Price': 'power-with-price',
    'Burdened Prodigy': 'burdened-prodigy',
    'Inner Metamorphosis': 'inner-metamorphosis',
    'Emergent Hero': 'emergent-hero',
    'Converging Destinies': 'converging-destinies',
    'Defying the Order': 'defying-order',
  };

  return genreMap[genreName] || null;
}

/**
 * Score Module 1 and return top genres with IDs
 */
export function scoreModule1Genres(
  module: QuizModule,
  answers: Record<number, string>
): {
  primaryGenreId: string | null;
  secondaryGenreId: string | null;
  tertiaryGenreId: string | null;
  scores: Record<string, number>;
} {
  const result = scoreModule(module, answers);

  // Aggregate scores by genre (since each answer maps to 2 genres)
  const genreScores: Record<string, number> = {};
  const genreNames = [
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

  genreNames.forEach((genreName) => {
    const genreId = mapGenreNameToId(genreName);
    if (genreId) {
      genreScores[genreName] = result.scores[genreName] || 0;
    }
  });

  const sortedGenres = Object.entries(genreScores)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  return {
    primaryGenreId: mapGenreNameToId(sortedGenres[0] || ''),
    secondaryGenreId: mapGenreNameToId(sortedGenres[1] || ''),
    tertiaryGenreId: mapGenreNameToId(sortedGenres[2] || ''),
    scores: genreScores,
  };
}

