import React from 'react';

import Title from '../../Title';
import { SongList } from '../../SongList';
import { DetailRowHeader } from '../../DetailSongTable';
import ConnectedDetailRow from '../../SongListContainer/Detail';
import { QueueItem } from '../../../redux/state/queue';
import { Container } from '../../Container';
import {
  Prompt,
  SongListContainer,
  SongListPageHeading,
} from '../../styled/SongListPage';

interface Props {
  items: QueueItem[];
  nowPlayingId?: string;
  skipToPosition: (position: number) => void;
}

export const QueuePage = ({ items, nowPlayingId, skipToPosition }: Props) => (
  <div>
    <Title segments={['Queue']} />

    <Container>
      <SongListPageHeading>Queue</SongListPageHeading>

      <SongListContainer>
        <SongList
          header={<DetailRowHeader />}
          rows={items}
          render={(item, index) => (
            <ConnectedDetailRow
              key={item.id}
              songId={item.songId}
              active={item.id === nowPlayingId}
              onDoubleClick={() => skipToPosition(index)}
            />
          )}
        />

        {!items.length && (
          <Prompt>It's pretty empty here. Try playing something.</Prompt>
        )}
      </SongListContainer>
    </Container>
  </div>
);
