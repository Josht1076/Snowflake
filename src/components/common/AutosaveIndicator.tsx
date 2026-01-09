'use client';

import { useState, useEffect } from 'react';

interface AutosaveIndicatorProps {
  isSaving?: boolean;
}

export default function AutosaveIndicator({ isSaving = false }: AutosaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving]);

  if (isSaving) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-300">
        <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
        <span>Saving...</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="flex items-center space-x-2 text-sm text-success">
        <div className="w-2 h-2 bg-success rounded-full" />
        <span>Saved</span>
      </div>
    );
  }

  return null;
}

