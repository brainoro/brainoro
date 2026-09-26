import React from 'react';
import { CornellNoteEditor } from './CornellNoteEditor';
import { CurriculumConcept, BoardId } from '../../lib/types';

interface Props {
  concept: CurriculumConcept;
  boardId: BoardId;
}

/**
 * CornellNotesView: Primary high-fidelity Cornell Note presentation viewport
 * integrating dynamic topic-aware OER notes and the Universal Visual Model Engine.
 */
export const CornellNotesView: React.FC<Props> = (props) => {
  return <CornellNoteEditor {...props} />;
};

export default CornellNotesView;
