import React from 'react';
import { RouteComponentProps } from 'react-router';

export const songsPath = '/songs';

export const artistsPath = `/artists`;
export const artistPath = (id: string) => `${artistsPath}/${id}`;

export const albumsPath = `/albums`;
export const albumPath = (id: string) => `${albumsPath}/${id}`;

export const homePath = `/home`;
export const queuePath = `/queue`;
export const searchPath = `/search`;
export const withIdPathParam = ':id';

export interface WithIdParams {
  id: string;
}

export const withIdFromProps = (f: (id: string) => React.ReactNode) => (
  props: RouteComponentProps<WithIdParams>
) => f(props.match.params.id);
