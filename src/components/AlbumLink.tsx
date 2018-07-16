import React from 'react';
import commonStyles from '../shared.css';
import { Link } from 'react-router-dom';
import { albumPath } from '../utils/paths';

export interface Album {
  id: string;
  name: string;
}

interface Props {
  album: Album;
  className?: string;
}

export const AlbumLink = ({ album, className = commonStyles.link }: Props) => (
  <Link className={className} to={albumPath(album.id)}>
    {album.name}
  </Link>
);
