import { createReduxComponent } from '../../../redux/render';
import { State } from '../../../redux/state';
import {
  SearchQuery,
  SearchQuery_songs_edges,
} from './__generated__/SearchQuery';
import {
  getPlayingMatching,
  isPlayingFromSearch,
} from '../../../redux/selectors/nowPlaying';
import { Action } from '../../../redux/actions';
import { Dispatch } from 'redux';
import { PlayingFromSearch, QueueItemSource } from '../../../redux/state/queue';
import { startPlayingList } from '../../../redux/actions/creators/queue';

interface OwnProps {
  result?: SearchQuery;

  // Query which fetched the results. Used as context for creating queue
  // items and checking whether the current queue item is active on the
  // current search page.
  currentQuery: string;
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
      if (!ownProps.result) {
        throw new Error('startPlayingFromSong called without query result');
      }

      const tracks: QueueItemSource[] = getTracks(
        ownProps.currentQuery,
        ownProps.result.songs.edges
      );

      startPlayingList(dispatch)(tracks, index);
    },
  })
);

const getTracks = (
  query: string,
  edges: SearchQuery_songs_edges[]
): QueueItemSource[] =>
  edges.map(({ node }) => ({
    songId: node.id,
    playingFrom: { type: 'SEARCH', query } as PlayingFromSearch,
  }));
