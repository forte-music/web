import React from 'react';
import { ArtistLink } from './ArtistLink';
import { join, unique } from '../utils';

export interface Artist {
  id: string;
  name: string;
}

interface Props {
  artists: Artist[];
}

export const InlineArtistsList = ({ artists }: Props) => (
  <React.Fragment>
    {unique(
      join(
        artists.map(artist => <ArtistLink artist={artist} />),
        <span>, </span>
      )
    )}
  </React.Fragment>
);
