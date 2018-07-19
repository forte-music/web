import { QueueItem } from '../../../redux/state/queue';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../../redux/state';
import { Action, skipToPosition } from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';

interface StateEnhancedProps {
  items: QueueItem[];
  nowPlaying?: QueueItem;
}

interface ActionEnhancedProps {
  skipToPosition: (position: number) => void;
}

export interface ChildProps extends StateEnhancedProps, ActionEnhancedProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

interface OwnProps {
  children: ChildrenFn;
}

interface MergedProps
  extends OwnProps,
    StateEnhancedProps,
    ActionEnhancedProps {}

const enhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps,
  MergedProps,
  State
>(
  ({ queue }) => {
    const nowPlaying = nowPlayingSelector(queue);
    const { items } = queue;

    return { nowPlaying, items };
  },
  (dispatch: Dispatch<Action>): ActionEnhancedProps => ({
    skipToPosition: (position: number) => {
      dispatch(skipToPosition(position));
    },
  }),
  (stateProps, actionProps, ownProps) => ({
    ...stateProps,
    ...actionProps,
    ...ownProps,
  })
);

const Component = ({ children, ...props }: MergedProps) => children(props);

export const QueueState = enhancer(Component);
