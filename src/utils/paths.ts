import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export const songs = '/songs';

export const artists = `/artists`;
export const artist = (id: string) => `${artists}/${id}`;

export const albums = `/albums`;
export const album = (id: string) => `${albums}/${id}`;

export const playlists = `/playlists`;
export const playlist = (id: string) => `${playlists}/${id}`;

export const home = `/home`;
export const queue = `/queue`;
export const search = `/search`;
export const withId = ':id';

export interface WithIdParams {
  id: string;
}

export const withIdFromProps = (f: (id: string) => React.ReactNode) => (
  props: RouteComponentProps<WithIdParams>
) => f(props.match.params.id);
