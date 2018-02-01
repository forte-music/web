// @flow
import type { UserStats as UserStatsSource } from '@forte-music/schema/fixtures/stats';

export type { UserStatsSource };

export type UserStats = {
  id: string,
  playCount: number,
  lastPlayed?: number,
};

export type SongUserStats = {
  id: string,
  liked: boolean,
  stats: UserStats,
};

export type StatsCollection = {
  albumStats?: UserStats,
  artistStats?: UserStats,
  playlistsStats?: UserStats,
  songStats: SongUserStats,
};

export const defaultUserStats: UserStatsSource = {
  playCount: 0,
};

export const statsId = (parentId: string) => `${parentId}:stats`;

export const withUserStats = (
  { id, stats: maybeStats }: { id: string, stats?: UserStatsSource },
  additionalProps: Object = {}
): UserStats => ({
  id: statsId(id),
  ...defaultUserStats,
  ...maybeStats,
  ...additionalProps,
});
