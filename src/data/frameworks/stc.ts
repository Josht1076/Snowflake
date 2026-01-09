/**
 * Save the Cat framework definition
 * STC beats as secondary guidance
 */

import { Framework, FrameworkStep } from '@/types/framework';

export const stcFramework: Framework = {
  id: 'stc',
  name: 'Save the Cat',
  steps: [
    {
      id: 'stc_opening_image',
      frameworkId: 'stc',
      title: 'Opening Image',
      description: 'A visual that represents the whole story and the single moment that is the story\'s thesis statement.',
      order: 1,
      group: 'Act I',
    },
    {
      id: 'stc_theme_stated',
      frameworkId: 'stc',
      title: 'Theme Stated',
      description: 'What someone says to the hero (or in the hero\'s presence) that is the theme of the story.',
      order: 2,
      group: 'Act I',
    },
    {
      id: 'stc_setup',
      frameworkId: 'stc',
      title: 'Setup',
      description: 'The hero\'s world as it is, and what is missing in their life.',
      order: 3,
      group: 'Act I',
    },
    {
      id: 'stc_catalyst',
      frameworkId: 'stc',
      title: 'Catalyst',
      description: 'The moment where life as it is changes. It is the telegram, the act of catching the loved-one cheating, the arrival of the man on the flying trapeze.',
      order: 4,
      group: 'Act I',
    },
    {
      id: 'stc_debate',
      frameworkId: 'stc',
      title: 'Debate',
      description: 'The hero refuses the call to adventure. A time of weighing the stakes.',
      order: 5,
      group: 'Act I',
    },
    {
      id: 'stc_break_into_two',
      frameworkId: 'stc',
      title: 'Break into Two',
      description: 'The hero makes a choice and the journey begins. We leave the "Thesis" world and enter the upside-down, antithesis world of Act Two.',
      order: 6,
      group: 'Act I',
    },
    {
      id: 'stc_b_story',
      frameworkId: 'stc',
      title: 'B Story',
      description: 'This is the "love story" or the relationship story that will serve as the vehicle for the theme.',
      order: 7,
      group: 'Act II',
    },
    {
      id: 'stc_fun_and_games',
      frameworkId: 'stc',
      title: 'Fun and Games',
      description: 'This is the "promise of the premise." The core, central entertainment and uniqueness of the movie.',
      order: 8,
      group: 'Act II',
    },
    {
      id: 'stc_midpoint',
      frameworkId: 'stc',
      title: 'Midpoint',
      description: 'The moment where the hero either gets everything they think they want ("false victory") or doesn\'t get what they think they want all is lost ("false defeat").',
      order: 9,
      group: 'Act II',
    },
    {
      id: 'stc_bad_guys_close_in',
      frameworkId: 'stc',
      title: 'Bad Guys Close In',
      description: 'The forces of opposition regroup and send in the heavy artillery. The hero\'s team begins to come apart at the seams.',
      order: 10,
      group: 'Act II',
    },
    {
      id: 'stc_all_is_lost',
      frameworkId: 'stc',
      title: 'All Is Lost',
      description: 'The opposite moment from the Midpoint: "whiff of death." A moment where the hero loses everything they gained, or everything they ever had, is taken away.',
      order: 11,
      group: 'Act II',
    },
    {
      id: 'stc_dark_night_of_the_soul',
      frameworkId: 'stc',
      title: 'Dark Night of the Soul',
      description: 'The hero at rock bottom. And then, the moment that happens next: the idea that will become the solution.',
      order: 12,
      group: 'Act II',
    },
    {
      id: 'stc_break_into_three',
      frameworkId: 'stc',
      title: 'Break into Three',
      description: 'Thanks to a fresh idea, new inspiration, or last-minute advice from the B Story (usually the love interest), the hero chooses to try again.',
      order: 13,
      group: 'Act III',
    },
    {
      id: 'stc_finale',
      frameworkId: 'stc',
      title: 'Finale',
      description: 'The hero must prove they learned the theme of the story. The hero gathers the team, storms the castle, and executes a plan derived from the lesson learned in the A and B Stories.',
      order: 14,
      group: 'Act III',
    },
    {
      id: 'stc_final_image',
      frameworkId: 'stc',
      title: 'Final Image',
      description: 'The opposite of the Opening Image, proving, visually, that a change has occurred within the hero.',
      order: 15,
      group: 'Act III',
    },
  ],
};

export const stcBeats: FrameworkStep[] = stcFramework.steps;

