import { Dispatch } from 'redux';
import { createReduxComponent } from '../../../redux/render';

import { State } from '../../../redux/state';
import {
  getPlayingMatching,
  isPlayingFromSearch,
} from '../../../redux/selectors/nowPlaying';
import { Action } from '../../../redux/actions';
import { PlayingFromSearch, QueueItemSource } from '../../../redux/state/queue';
import { startPlayingList } from '../../../redux/actions/creators/queue';

interface Song {
  id: string;
}

interface OwnProps {
  // Query which fetched the results. Used as context for creating queue
  // items and checking whether the current queue item is active on the
  // current search page.
  currentQuery: string;

  // The songs which will be enqueued when startPlayingFromSong is called.
  songs?: Song[];
}

interface StateEnhancedProps {
  activeSongId?: string;
}

interface ActionEnhancedProps {
  startPlayingFromSong: (index: number) => void;
}

export const ReduxContainer = createReduxComponent<
  State,
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps
>(
  (state: State, ownProps: OwnProps) => {
    const activeQueueItem = getPlayingMatching(
      state.queue,
      isPlayingFromSearch(ownProps.currentQuery)
    );

    if (!activeQueueItem) {
      return {};
    }

    return { activeSongId: activeQueueItem.songId };
  },
  (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
    startPlayingFromSong: (index: number) => {
      if (!ownProps.songs) {
        throw new Error('startPlayingFromSong called without query result');
      }

      const tracks: QueueItemSource[] = getTracks(
        ownProps.currentQuery,
        ownProps.songs
      );

      startPlayingList(dispatch)(tracks, index);
    },
  })
);

const getTracks = (query: string, edges: Song[]): QueueItemSource[] =>
  edges.map(song => ({
    songId: song.id,
    playingFrom: { type: 'SEARCH', query } as PlayingFromSearch,
  }));
