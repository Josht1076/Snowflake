'use client';

import { Project } from '@/types/project';
import { getNextStepSuggestion } from '@/utils/nextStepLogic';

interface SmartNextButtonProps {
  project: Project;
  onNavigate: (type: 'snowflake' | 'stc' | 'scene', id: string) => void;
}

export default function SmartNextButton({ project, onNavigate }: SmartNextButtonProps) {
  const suggestion = getNextStepSuggestion(project);

  if (!suggestion) {
    return (
      <div className="smart-button-complete">
        <p className="text-success">
          🎉 All steps are complete! Great work!
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onNavigate(suggestion.type, suggestion.id)}
      className="smart-button-suggestion"
    >
      <div className="smart-button-title">Next recommended step:</div>
      <div className="smart-button-subtitle">{suggestion.title}</div>
      <div className="smart-button-reason">{suggestion.reason}</div>
    </button>
  );
}

