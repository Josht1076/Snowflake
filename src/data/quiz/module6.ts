/**
 * Module 6: Character Ensemble
 * 5 questions to identify character configuration
 */

import { QuizModule } from './module1';

export const module6: QuizModule = {
  module: 'Character Ensemble',
  description: 'Identifies the story\'s character configuration and relational dynamics.',
  scoring: {
    type: 'ensemble',
    mapping: {
      A: ['Ensemble:Solo'],
      B: ['Ensemble:Protagonist+Guide'],
      C: ['Ensemble:Duo'],
      D: ['Ensemble:Small-Team'],
      E: ['Ensemble:Large-Ensemble'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'How many key protagonists does your story follow?',
      answers: {
        A: 'A single central protagonist',
        B: 'Protagonist plus a major guide or partner',
        C: 'A duo with equal narrative weight',
        D: 'A small team or found family',
        E: 'A large ensemble across factions',
      },
    },
    {
      id: 2,
      question: 'What dynamic drives character interactions?',
      answers: {
        A: 'Solo inner struggle',
        B: 'Mentor-guided transformation',
        C: 'Tension and synergy between two leads',
        D: 'Group loyalty and team roles',
        E: 'Multiple groups with conflicting agendas',
      },
    },
    {
      id: 3,
      question: 'How many POVs does your story use?',
      answers: {
        A: 'Just one POV',
        B: 'Two POVs, mentor or close support',
        C: 'Two balanced POVs',
        D: 'Three to four POVs',
        E: 'Five or more POVs',
      },
    },
    {
      id: 4,
      question: 'Which best describes relationship stakes?',
      answers: {
        A: 'Internal and personal',
        B: 'Guidance and wisdom',
        C: 'Partnership and clash',
        D: 'Group bonds and survival',
        E: 'Faction politics and loyalty',
      },
    },
    {
      id: 5,
      question: 'How interconnected are your major characters?',
      answers: {
        A: 'Mostly focused on the protagonist alone',
        B: 'One strong mentor or ally bond',
        C: 'Tightly linked duo',
        D: 'Interdependent team',
        E: 'Interwoven political or factional network',
      },
    },
  ],
};

