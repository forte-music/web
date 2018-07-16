import React from 'react';
import commonStyles from '../shared.css';
import { Link } from 'react-router-dom';
import { artistPath } from '../utils/paths';

export interface Artist {
  id: string;
  name: string;
}

interface Props {
  artist: Artist;
  className?: string;
}

export const ArtistLink = ({
  artist,
  className = commonStyles.link,
}: Props) => (
  <Link className={className} to={artistPath(artist.id)}>
    {artist.name}
  </Link>
);
