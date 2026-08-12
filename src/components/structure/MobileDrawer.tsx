'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side: 'left' | 'right';
  children: React.ReactNode;
}

export default function MobileDrawer({ isOpen, onClose, side, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `mobile-drawer-title-${side}`;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`
          fixed inset-y-0 z-50 bg-gray-900 border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          md:hidden flex flex-col
          ${side === 'left' ? 'left-0 w-64' : 'right-0 w-80 border-l border-r-0'}
          ${isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          <h2 id={titleId} className="text-heading-2">
            {side === 'left' ? 'Steps & Scenes' : 'Tips & Notes'}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-400 hover:text-white active:text-white transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close drawer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
