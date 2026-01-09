'use client';

import { Project } from '@/types/project';
import { runRevisionChecks } from '@/utils/revisionChecks';

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
          {checks.map((check, index) => (
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
              <span className="text-xl">
                {check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌'}
              </span>
              <div className="flex-1">
                <p className="health-check-message">{check.message}</p>
                {check.details && (
                  <p className="health-check-details">{check.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

