'use client';

import { useRef, useState } from 'react';
import { importProjectFromFile } from '@/utils/import';
import { saveProject } from '@/utils/storage';
import { Project } from '@/types/project';

interface ImportButtonProps {
  onImported?: (project: Project) => void;
}

export default function ImportButton({ onImported }: ImportButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setImporting(true);

    try {
      const project = await importProjectFromFile(file);
      if (!project) {
        setError('Invalid project file. Please check the JSON format.');
        return;
      }

      await saveProject(project);
      onImported?.(project);
    } catch {
      setError('Failed to import project.');
    } finally {
      setImporting(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={importing}
        className="btn-secondary-action"
      >
        {importing ? 'Importing...' : 'Import Project'}
      </button>
      {error && <p className="text-error mt-2">{error}</p>}
    </div>
  );
}
