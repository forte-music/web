import { Dispatch } from 'redux';
import { AlbumQuery_album as Album } from './__generated__/AlbumQuery';
import { startPlayingList } from '../../../redux/actions/creators/queue';
import {
  getPlayingMatching,
  isPlayingFromAlbum,
} from '../../../redux/selectors/nowPlaying';
import { State } from '../../../redux/state';
import { getTracks } from '../../PlaybackAlbumArtwork';
import { createReduxComponent } from '../../../redux/render';
import { Action } from '../../../redux/actions';

interface StateEnhancedProps {
  // The identifier of the currently playing song in this album. Undefined, when
  // no song is playing from this album.
  currentlyPlayingId?: string;
}

interface DispatchProps {
  onDoubleClick: (startIndex: number) => void;
}

interface OwnProps {
  album: Album;
}

export const AlbumContainerState = createReduxComponent<
  State,
  StateEnhancedProps,
  DispatchProps,
  OwnProps
>(
  (state: State, props: OwnProps): StateEnhancedProps => {
    const activeQueueItem = getPlayingMatching(
      state.queue,
      isPlayingFromAlbum(props.album.id)
    );
    if (!activeQueueItem) {
      return {};
    }

    return { currentlyPlayingId: activeQueueItem.songId };
  },
  (dispatch: Dispatch<Action>, props: OwnProps): DispatchProps => ({
    onDoubleClick: (startIndex: number) => {
      const queueSources = getTracks(props.album);

      startPlayingList(dispatch)(queueSources, startIndex);
    },
  })
);
