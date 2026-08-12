'use client';

import { Project } from '@/types/project';
import { runRevisionChecks } from '@/utils/revisionChecks';
import Link from 'next/link';

interface HealthCheckProps {
  project: Project;
}

export default function HealthCheck({ project }: HealthCheckProps) {
  const checks = runRevisionChecks(project);

  return (
    <div className="health-check-container">
      <div className="health-check-card">
        <h2 className="text-heading-2 mb-4 text-white">Health Check Results</h2>
        <div className="space-y-3">
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

            const content = (
              <>
                <span className="text-xl" aria-hidden="true">
                  {check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌'}
                </span>
                <div className="flex-1">
                  <p className="health-check-message">
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
                <Link
                  key={index}
                  href={href}
                  className={`health-check-item block ${
                    check.status === 'pass'
                      ? 'health-check-pass'
                      : check.status === 'warning'
                      ? 'health-check-warning'
                      : 'health-check-fail'
                  } hover:opacity-90 transition-opacity`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={index}
                className={
                  check.status === 'pass'
                    ? 'health-check-pass'
                    : check.status === 'warning'
                    ? 'health-check-warning'
                    : 'health-check-fail'
                }
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
