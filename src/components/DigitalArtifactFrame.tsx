import React from 'react';
import { Project } from '../types';
import { ProjectMediaFrame } from './ProjectMediaFrame';

export interface DigitalArtifactFrameProps {
  project: Project;
  aspectRatio?: string;
  isHovered?: boolean;
  priority?: boolean;
  showOverlayAction?: boolean;
  className?: string;
  defaultMode?: 'interface' | 'screenshot';
}

/**
 * DigitalArtifactFrame presents real project media (recordings, screenshots, captures)
 * or a deliberate neutral capture placeholder. Fake interface simulations have been completely
 * removed in accordance with the Real Project Media Only directive.
 */
export const DigitalArtifactFrame: React.FC<DigitalArtifactFrameProps> = ({
  project,
  aspectRatio = 'aspect-[16/10]',
  isHovered = false,
  priority = false,
  className = '',
}) => {
  return (
    <ProjectMediaFrame
      project={project}
      aspectRatio={aspectRatio}
      isHovered={isHovered}
      priority={priority}
      className={className}
    />
  );
};

export default DigitalArtifactFrame;
