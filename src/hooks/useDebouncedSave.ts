'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Project } from '@/types/project';
import { saveProject } from '@/utils/storage';

const SAVE_DELAY_MS = 1500;

export function useDebouncedSave() {
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingProjectRef = useRef<Project | null>(null);

  const flushSave = useCallback(async () => {
    if (!pendingProjectRef.current) return;

    const projectToSave = pendingProjectRef.current;
    pendingProjectRef.current = null;
    setIsSaving(true);

    try {
      await saveProject(projectToSave);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const scheduleSave = useCallback(
    (project: Project) => {
      pendingProjectRef.current = project;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsSaving(true);
      timeoutRef.current = setTimeout(() => {
        flushSave();
      }, SAVE_DELAY_MS);
    },
    [flushSave]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isSaving, scheduleSave };
}
