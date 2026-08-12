'use client';

import { Project } from '@/types/project';
import ProjectIdentityForm from '@/components/common/ProjectIdentityForm';

interface GenreSelectorProps {
  project: Project;
  onSelect: (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => void;
  onSkipQuiz: () => void;
}

export default function GenreSelector({ project, onSelect, onSkipQuiz }: GenreSelectorProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-heading-1 mb-4 text-white">Select Your Genre</h2>
        <p className="text-body">
          Choose your primary genre and optional STC archetype. These shape the tips and guidance you will see while planning.
        </p>
      </div>

      <ProjectIdentityForm
        project={project}
        submitLabel="Continue"
        onSubmit={(values) =>
          onSelect(
            values.primaryGenreId,
            values.secondaryGenreIds,
            values.primaryStcId,
            values.secondaryStcId
          )
        }
        secondaryAction={{
          label: 'Skip to Planning',
          onClick: (values) => {
            if (!values.primaryGenreId) return;
            onSelect(
              values.primaryGenreId,
              values.secondaryGenreIds,
              values.primaryStcId,
              values.secondaryStcId
            );
            onSkipQuiz();
          },
        }}
      />
    </div>
  );
}
