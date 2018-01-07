// @flow
import { makeMap } from './utils';

export type SongUserStats = {
  id: string,
  playCount: number,
  lastPlayed?: number,
  liked: boolean,
};

const stats: SongUserStats[] = [
  {
    id: 'c15cb775-ed42-436d-a2fb-f68d34d3e206',
    playCount: 3,
    lastPlayed: 1515279968,
    liked: true,
  },
  {
    id: '6782c701-e219-4646-b9c1-0817d62b58d9',
    playCount: 0,
    liked: false,
  },
  {
    id: '7371509e-d31e-4f16-ae47-0ce375349fe7',
    playCount: 0,
    liked: false,
  },
];

const processedStats: Map<string, SongUserStats> = makeMap(stats);

export default processedStats;
