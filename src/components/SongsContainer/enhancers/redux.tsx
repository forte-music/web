import { Dispatch } from 'redux';
import { State } from '../../../redux/state';
import {
  getPlayingMatching,
  isPlayingFromSongs,
} from '../../../redux/selectors/nowPlaying';
import { startPlayingList } from '../../../redux/actions/creators/queue';
import { PlayingFromSongs, QueueItemSource } from '../../../redux/state/queue';
import { createReduxComponent } from '../../../redux/render';
import { Action } from '../../../redux/actions';

interface StateEnhancedProps {
  activeSongId?: string;
}

interface ActionEnhancedProps {
  startPlayingFrom: (index: number) => void;
}

interface Song {
  id: string;
}

interface OwnProps {
  songs: Song[];
}

const getTracks = (songs: Song[]): QueueItemSource[] =>
  songs.map(song => ({
    songId: song.id,
    playingFrom: { type: 'SONGS' } as PlayingFromSongs,
  }));

export const SongsContainerReduxState = createReduxComponent<
  State,
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps
>(
  (state: State): StateEnhancedProps => {
    const activeQueueItem = getPlayingMatching(state.queue, isPlayingFromSongs);

    if (!activeQueueItem) {
      return {};
    }

    return { activeSongId: activeQueueItem.songId };
  },
  (dispatch: Dispatch<Action>, props: OwnProps) => ({
    startPlayingFrom: (index: number) =>
      startPlayingList(dispatch)(getTracks(props.songs), index),
  })
);
