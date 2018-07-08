import React from 'react';
import { DetailRow } from '../SongList';
import { SongListRowQuery } from './enhancers/query';

interface Props {
  songId: string;
  active?: boolean;
  onDoubleClick?: () => void;
}

const EnhancedDetailRow = ({ songId, active, onDoubleClick }: Props) => (
  <SongListRowQuery variables={{ songId }}>
    {result => (
      <DetailRow
        song={result.data && result.data.song}
        active={active}
        onDoubleClick={onDoubleClick}
      />
    )}
  </SongListRowQuery>
);

export default EnhancedDetailRow;
