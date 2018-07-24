import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../redux/state';
import { getActiveQueueItemForList } from '../../../redux/selectors/nowPlaying';
import { startPlayingList } from '../../../redux/actions/creators/queue';
import { Kind, QueueItemSource } from '../../../redux/state/queue';

interface StateEnhancedProps {
  activeSongId?: string;
}

interface ActionEnhancedProps {
  startPlayingFrom: (index: number) => void;
}

interface ChildProps extends StateEnhancedProps, ActionEnhancedProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

interface Song {
  id: string;
}

interface OwnProps {
  children: ChildrenFn;
  songs: Song[];
}

interface MergedProps extends ChildProps, OwnProps {}

const getTracks = (songs: Song[]): QueueItemSource[] =>
  songs.map(song => ({ songId: song.id, source: { kind: 'SONGS' as Kind } }));

const enhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps,
  MergedProps,
  State
>(
  (state: State): StateEnhancedProps => {
    const activeQueueItem = getActiveQueueItemForList(
      state.queue,
      'SONGS',
      undefined
    );

    if (!activeQueueItem) {
      return {};
    }

    return { activeSongId: activeQueueItem.songId };
  },
  (dispatch: Dispatch<State>, props: OwnProps) => ({
    startPlayingFrom: (index: number) =>
      startPlayingList(dispatch)(getTracks(props.songs), index),
  }),
  (
    stateProps: StateEnhancedProps,
    dispatchProps: ActionEnhancedProps,
    ownProps: OwnProps
  ) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  })
);

const Component: React.StatelessComponent<MergedProps> = (props: MergedProps) =>
  props.children(props);

export const SongsContainerReduxState: React.ComponentType<OwnProps> = enhancer(
  Component
);
