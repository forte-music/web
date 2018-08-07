import React from 'react';
import { RouteComponentProps } from 'react-router';

export const songsPath = '/songs';

export const artistsPath = `/artists`;
export const artistPath = (id: string) => `${artistsPath}/${id}`;

export const albumsPath = `/albums`;
export const albumPath = (id: string) => `${albumsPath}/${id}`;

export const homePath = `/home`;
export const queuePath = `/queue`;

export const withIdPathParam = ':id';

export const searchPath = (query: string) => `/search/${query}`;
export const optionalParam = (param: string) => `:${param}?`;

export interface WithIdParams {
  id: string;
}

export const withIdFromProps = (f: (id: string) => React.ReactNode) => (
  props: RouteComponentProps<WithIdParams>
) => f(props.match.params.id);

export interface WithQueryParam {
  query?: string;
}

export const withQueryFromProps = (f: (query?: string) => React.ReactNode) => (
  props: RouteComponentProps<WithQueryParam>
) => f(props.match.params.query);
