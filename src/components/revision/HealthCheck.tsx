'use client';

import { Project } from '@/types/project';
import { runRevisionChecks } from '@/utils/revisionChecks';
import Link from 'next/link';

interface HealthCheckProps {
  project: Project;
}

function getStatusLabel(status: 'pass' | 'warning' | 'fail') {
  switch (status) {
    case 'pass':
      return 'Pass';
    case 'warning':
      return 'Warning';
    case 'fail':
      return 'Fail';
  }
}

export default function HealthCheck({ project }: HealthCheckProps) {
  const checks = runRevisionChecks(project);

  return (
    <div className="health-check-container">
      <div className="health-check-card">
        <h2 className="text-heading-2 mb-4 text-white">Health Check Results</h2>
        <ul className="space-y-3" aria-label="Health check results">
          {checks.map((check, index) => {
            const canNavigate = check.targetType && check.targetId;
            const href =
              check.targetType === 'snowflake'
                ? `/structure?project=${project.id}&step=${check.targetId}`
                : check.targetType === 'stc'
                ? `/structure?project=${project.id}&tab=stc&beat=${check.targetId}`
                : check.targetType === 'scene'
                ? `/structure?project=${project.id}&tab=scenes&scene=${check.targetId}`
                : null;

            const statusLabel = getStatusLabel(check.status);
            const itemClassName =
              check.status === 'pass'
                ? 'health-check-pass'
                : check.status === 'warning'
                ? 'health-check-warning'
                : 'health-check-fail';

            const content = (
              <>
                <span className="text-xl" aria-hidden="true">
                  {check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌'}
                </span>
                <div className="flex-1">
                  <p className="health-check-message">
                    <span className="sr-only">{statusLabel}: </span>
                    {check.message}
                    {canNavigate && (
                      <span className="sr-only"> — click to fix</span>
                    )}
                  </p>
                  {check.details && (
                    <p className="health-check-details">{check.details}</p>
                  )}
                </div>
              </>
            );

            if (href) {
              return (
                <li key={index}>
                  <Link
                    href={href}
                    className={`health-check-item block ${itemClassName} hover:opacity-90 transition-opacity`}
                  >
                    {content}
                  </Link>
                </li>
              );
            }

            return (
              <li key={index} className={itemClassName}>
                {content}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
