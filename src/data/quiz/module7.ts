/**
 * Module 7: Antagonist Type
 * 5 questions to determine the nature of conflict
 */

import { QuizModule } from './module1';

export const module7: QuizModule = {
  module: 'Antagonist Type',
  description: 'Identifies the primary source of opposition.',
  scoring: {
    type: 'antagonist',
    mapping: {
      A: ['Antagonist:Threat/Monster'],
      B: ['Antagonist:Hidden/Mystery'],
      C: ['Antagonist:Nemesis/Power-User'],
      D: ['Antagonist:Inner-Demon'],
      E: ['Antagonist:System/Institution'],
    },
  },
  questions: [
    {
      id: 1,
      question: 'Who or what causes most of the conflict?',
      answers: {
        A: 'A monster, villain, or spreading threat',
        B: 'Mystery forces or unknown truths',
        C: 'A powerful figure tied to destiny',
        D: 'The protagonist\'s own inner wounds',
        E: 'A social system, group, or institution',
      },
    },
    {
      id: 2,
      question: 'What form does the antagonist take?',
      answers: {
        A: 'Physical danger or crisis',
        B: 'A hidden mastermind or secret',
        C: 'A nemesis with similar powers',
        D: 'Internal guilt, trauma, or shadow self',
        E: 'Government, order, or faction',
      },
    },
    {
      id: 3,
      question: 'Which challenges your protagonist most?',
      answers: {
        A: 'Immediate danger',
        B: 'Unraveling motives',
        C: 'Power imbalance',
        D: 'Emotional barriers',
        E: 'Authority, law, or societal pressure',
      },
    },
    {
      id: 4,
      question: 'How is the antagonist defeated?',
      answers: {
        A: 'Direct confrontation or survival',
        B: 'Solving the mystery',
        C: 'Mastering power or prophecy',
        D: 'Emotional catharsis',
        E: 'Reform or rebellion',
      },
    },
    {
      id: 5,
      question: 'What defines the antagonist\'s worldview?',
      answers: {
        A: 'Chaos or destruction',
        B: 'Secrecy and manipulation',
        C: 'Power and destiny',
        D: 'Pain, fear, or internal turmoil',
        E: 'Order, control, or tradition',
      },
    },
  ],
};

