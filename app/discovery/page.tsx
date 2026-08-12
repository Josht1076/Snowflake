'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewProjectForm from '@/components/discovery/NewProjectForm';
import GenreSelector from '@/components/discovery/GenreSelector';
import QuizFlow from '@/components/discovery/QuizFlow';
import { createNewProject, saveProject, setCurrentProjectId } from '@/utils/storage';
import { Project } from '@/types/project';
import Navigation from '@/components/common/Navigation';

type DiscoveryStep = 'form' | 'genre' | 'quiz' | 'complete';

export default function DiscoveryPage() {
  const router = useRouter();
  const [step, setStep] = useState<DiscoveryStep>('form');
  const [project, setProject] = useState<Project | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleProjectCreated = async (newProject: Project) => {
    setProject(newProject);
    await saveProject(newProject);
    setStep('genre');
  };

  const handleGenreSelected = async (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => {
    if (!project) return;

    const updated = {
      ...project,
      primaryGenreId,
      secondaryGenreIds,
      primaryStcId,
      secondaryStcId,
    };
    setProject(updated);
    await saveProject(updated);

    if (showQuiz) {
      setStep('quiz');
    } else {
      handleComplete(updated);
    }
  };

  const handleQuizComplete = async (
    primaryGenreId: string | null,
    secondaryGenreIds: string[],
    primaryStcId: string | null,
    secondaryStcId: string | null
  ) => {
    if (!project) return;

    const updated = {
      ...project,
      primaryGenreId,
      secondaryGenreIds,
      primaryStcId,
      secondaryStcId,
    };
    setProject(updated);
    await saveProject(updated);
    handleComplete(updated);
  };

  const handleComplete = (currentProject?: Project) => {
    const target = currentProject || project;
    if (!target) return;

    setCurrentProjectId(target.id);
    router.push(`/structure?project=${target.id}`);
  };

  return (
    <>
      <Navigation />
      <main id="main-content" className="page-container" tabIndex={-1}>
        <div className="page-content max-w-3xl">
          <h1 className="page-heading-light">New Project</h1>

          {step === 'form' && (
            <NewProjectForm
              onComplete={handleProjectCreated}
              onRequestQuiz={() => setShowQuiz(true)}
            />
          )}

          {step === 'genre' && project && (
            <GenreSelector
              project={project}
              onSelect={handleGenreSelected}
              onSkipQuiz={() => handleComplete(project)}
            />
          )}

          {step === 'quiz' && project && (
            <QuizFlow
              project={project}
              onComplete={handleQuizComplete}
              onSkip={() => handleComplete(project)}
              onEditManually={(result) => {
                if (!project) return;
                setProject({
                  ...project,
                  primaryGenreId: result.primaryGenreId,
                  secondaryGenreIds: [result.secondaryGenreId, result.tertiaryGenreId].filter(
                    Boolean
                  ) as string[],
                  primaryStcId: result.primaryStcId,
                  secondaryStcId: result.secondaryStcId,
                });
                setStep('genre');
              }}
            />
          )}
        </div>
      </main>
    </>
  );
}
