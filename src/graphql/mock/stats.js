// @flow
import { stats } from '@forte-music/schema/fixtures/stats.toml';
import { makeMap } from './utils';

export type SongUserStats = {
  id: string,
  playCount: number,
  lastPlayed?: number,
  liked: boolean,
};

const processedStats: Map<string, SongUserStats> = makeMap(stats);

export default processedStats;
