/**
 * Module 5: Tone, Style & Audience
 * 5 questions with per-question mapping
 */

import { QuizModule } from './module1';

export const module5: QuizModule = {
  module: 'Tone, Style & Audience',
  description: 'Defines narrative tone, pacing, and intended readership.',
  scoring: {
    type: 'style',
    mapping: {
      '1': {
        A: ['Tone:Dark/Tense'],
        B: ['Tone:Adventurous'],
        C: ['Tone:Epic/Mythic'],
        D: ['Tone:Introspective'],
        E: ['Tone:Relational/Light'],
      },
      '2': {
        A: ['Pacing:Fast'],
        B: ['Pacing:Moderate'],
        C: ['Pacing:SlowBurn'],
        D: ['Pacing:Character-Driven'],
        E: ['Pacing:Scene/Dialogue-Driven'],
      },
      '3': {
        A: ['POV:Third-Broad'],
        B: ['POV:First-Person'],
        C: ['POV:Multi-POV'],
        D: ['POV:Close-Intimate'],
        E: ['POV:Shifting-Relational'],
      },
      '4': {
        A: ['Audience:Adult-General'],
        B: ['Audience:YA'],
        C: ['Audience:Adult-SFF'],
        D: ['Audience:Adult-Literary'],
        E: ['Audience:Relationship-Focused'],
      },
      '5': {
        A: ['Vibe:Gritty'],
        B: ['Vibe:Exploratory'],
        C: ['Vibe:Mythic'],
        D: ['Vibe:Intimate'],
        E: ['Vibe:Political/Relational'],
      },
    } as any,
  },
  questions: [
    {
      id: 1,
      question: 'What tone dominates your novel?',
      answers: {
        A: 'Dark, tense, or ominous',
        B: 'Adventurous or wondrous',
        C: 'Epic or mythic',
        D: 'Emotional or introspective',
        E: 'Romantic, humorous, or socially driven',
      },
    },
    {
      id: 2,
      question: 'How would you describe your pacing?',
      answers: {
        A: 'Fast and intense',
        B: 'Moderate with steady discovery',
        C: 'Slow burn with buildup',
        D: 'Character-focused rhythm',
        E: 'Scene-driven with interpersonal beats',
      },
    },
    {
      id: 3,
      question: 'What POV style fits best?',
      answers: {
        A: 'Third person with broad scope',
        B: 'First person journey or investigation',
        C: 'Multi-POV epic or ensemble',
        D: 'Close, intimate POV',
        E: 'Multiple relationships and shifting dynamics',
      },
    },
    {
      id: 4,
      question: 'Who is your primary audience?',
      answers: {
        A: 'Adult readers seeking depth',
        B: 'Teen/YA readers seeking discovery',
        C: 'Adult SFF readers seeking complexity',
        D: 'Readers wanting emotional or literary focus',
        E: 'Readers wanting relationships or social themes',
      },
    },
    {
      id: 5,
      question: 'What narrative feel best matches your story?',
      answers: {
        A: 'Gritty or intense',
        B: 'Exploratory or curious',
        C: 'Mythic or legendary',
        D: 'Intimate or reflective',
        E: 'Relational or political',
      },
    },
  ],
};

