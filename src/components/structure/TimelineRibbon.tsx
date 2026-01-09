'use client';

import { Project } from '@/types/project';
import { stcBeats } from '@/data/frameworks/stc';

export default function TimelineRibbon({ project }: { project: Project }) {
  const act1Beats = stcBeats.filter((b) => b.group === 'Act I');
  const act2Beats = stcBeats.filter((b) => b.group === 'Act II');
  const act3Beats = stcBeats.filter((b) => b.group === 'Act III');

  return (
    <div className="timeline-container">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="timeline-act-1">
              <span className="timeline-act-1-label">Act I</span>
            </div>
            <div className="timeline-act-2">
              <span className="timeline-act-2-label">Act II</span>
            </div>
            <div className="timeline-act-3">
              <span className="timeline-act-3-label">Act III</span>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline-footer">
        <span className="mr-4">Major beats: Opening, Catalyst, Midpoint, All Is Lost, Finale</span>
      </div>
    </div>
  );
}

