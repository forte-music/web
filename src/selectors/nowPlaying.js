// @flow
import type { QueueState, QueueItem } from '../state/queue';

const nowPlaying = ({ items, position }: QueueState): ?QueueItem =>
  items[position];

export default nowPlaying;
