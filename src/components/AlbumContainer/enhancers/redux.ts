import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AlbumQuery_album as Album } from './__generated__/AlbumQuery';
import { startPlayingList } from '../../../redux/actions/creators/queue';
import {
  nowPlaying as nowPlayingSelector,
  isSourceActive,
} from '../../../redux/selectors/nowPlaying';
import { State } from '../../../redux/state';
import { getTracks } from '../../PlaybackAlbumArtwork';

interface StateEnhancedProps {
  // The identifier of the currently playing song in this album. Undefined, when
  // no song is playing from this album.
  currentlyPlayingId?: string;
}

interface DispatchProps {
  onDoubleClick: (startIndex: number) => void;
}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

interface OwnProps {
  album: Album;
  children: ChildrenFn;
}

type ChildProps = DispatchProps & StateEnhancedProps;

type EnhancedProps = ChildProps & { children: ChildrenFn };

const enhancer = connect<
  StateEnhancedProps,
  DispatchProps,
  OwnProps,
  EnhancedProps,
  State
>(
  (state: State, props: OwnProps): StateEnhancedProps => {
    const isActive = isSourceActive(state.queue, 'ALBUM', props.album.id);
    if (!isActive) {
      return {};
    }

    const nowPlaying = nowPlayingSelector(state.queue);
    return { currentlyPlayingId: nowPlaying!.songId };
  },
  (dispatch: Dispatch<State>, props: OwnProps): DispatchProps => ({
    onDoubleClick: (startIndex: number) => {
      const queueSources = getTracks(props.album);

      startPlayingList(dispatch)(queueSources, startIndex);
    },
  }),
  (
    stateProps: StateEnhancedProps,
    dispatchProps: DispatchProps,
    ownProps: OwnProps
  ) => ({ ...stateProps, ...dispatchProps, children: ownProps.children })
);

const Component: React.StatelessComponent<EnhancedProps> = (
  props: EnhancedProps
) => props.children(props);

export const AlbumContainerState = enhancer(Component);
