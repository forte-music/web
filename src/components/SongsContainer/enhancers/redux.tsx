import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../redux/state';
import { getActiveQueueItemForList } from '../../../redux/selectors/nowPlaying';

interface StateEnhancedProps {
  activeSongId?: string;
}

type ChildProps = StateEnhancedProps;

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

interface OwnProps {
  children: ChildrenFn;
}

interface MergedProps extends ChildProps, OwnProps {}

const enhancer = connect<StateEnhancedProps, {}, OwnProps, MergedProps, State>(
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
  () => ({}),
  (stateProps: StateEnhancedProps, dispatchProps: {}, ownProps: OwnProps) => ({
    ...stateProps,
    ...dispatchProps,
    children: ownProps.children,
  })
);

const Component: React.StatelessComponent<MergedProps> = (props: MergedProps) =>
  props.children(props);

export const SongsContainerReduxState: React.ComponentType<OwnProps> = enhancer(
  Component
);
