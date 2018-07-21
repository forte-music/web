import React from 'react';
import { join, unique } from '../utils';
import commonStyles from '../shared.css';
import { ArtistLink } from './ArtistLink';

export interface Artist {
  id: string;
  name: string;
}

interface Props {
  artists: Artist[];
  className?: string;
}

export const InlineArtistsList = ({
  artists,
  className = commonStyles.link,
}: Props) => (
  <React.Fragment>
    {unique(
      join(
        artists.map(artist => (
          <ArtistLink artist={artist} className={className} />
        )),
        <span>, </span>
      )
    )}
  </React.Fragment>
);
