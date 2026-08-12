'use client';

import { useState, useEffect } from 'react';

interface AutosaveIndicatorProps {
  isSaving?: boolean;
}

export default function AutosaveIndicator({ isSaving = false }: AutosaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (isSaving) {
      setShowSaved(false);
      return;
    }

    setShowSaved(true);
    const timer = setTimeout(() => setShowSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [isSaving]);

  const status = isSaving ? 'saving' : showSaved ? 'saved' : 'idle';

  return (
    <div
      className="flex items-center justify-end gap-2 text-sm min-w-[5.5rem] h-[44px]"
      aria-live="polite"
      aria-atomic="true"
    >
      {status === 'saving' && (
        <>
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse shrink-0" aria-hidden="true" />
          <span className="text-gray-300">Saving…</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <div className="w-2 h-2 bg-success rounded-full shrink-0" aria-hidden="true" />
          <span className="text-success">Saved</span>
        </>
      )}
      {status === 'idle' && <span className="sr-only">All changes saved</span>}
    </div>
  );
}
