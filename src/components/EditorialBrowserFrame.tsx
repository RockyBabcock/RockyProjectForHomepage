import React from 'react';
import { DigitalArtifactFrame, DigitalArtifactFrameProps } from './DigitalArtifactFrame';

export interface EditorialBrowserFrameProps extends DigitalArtifactFrameProps {}

/**
 * EditorialBrowserFrame delegates to the Digital Artifact System, which adapts the chrome
 * to the authentic technical medium of the project (agent-graph, interface, terminal, etc.)
 */
export const EditorialBrowserFrame: React.FC<EditorialBrowserFrameProps> = (props) => {
  return <DigitalArtifactFrame {...props} />;
};

export default EditorialBrowserFrame;
