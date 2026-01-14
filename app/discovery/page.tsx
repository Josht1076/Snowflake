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

  const handleGenreSelected = async (primaryGenreId: string | null, secondaryGenreIds: string[]) => {
    if (!project) return;

    const updated = {
      ...project,
      primaryGenreId,
      secondaryGenreIds,
    };
    setProject(updated);
    await saveProject(updated);

    if (showQuiz) {
      setStep('quiz');
    } else {
      handleComplete();
    }
  };

  const handleQuizComplete = async (primaryGenreId: string | null, secondaryGenreIds: string[]) => {
    if (!project) return;

    const updated = {
      ...project,
      primaryGenreId,
      secondaryGenreIds,
    };
    setProject(updated);
    await saveProject(updated);
    handleComplete();
  };

  const handleComplete = () => {
    if (!project) return;

    setCurrentProjectId(project.id);
    router.push(`/structure?project=${project.id}`);
  };

  return (
    <>
      <Navigation />
      <main className="page-container">
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
            onSkipQuiz={() => handleComplete()}
          />
        )}

        {step === 'quiz' && project && (
          <QuizFlow
            project={project}
            onComplete={handleQuizComplete}
            onSkip={() => handleComplete()}
          />
        )}
        </div>
      </main>
    </>
  );
}

