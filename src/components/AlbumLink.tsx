import React from 'react';
import { LinkStyled } from './LinkStyled';

import { albumPath } from '../utils/paths';

export interface Album {
  id: string;
  name: string;
}

interface Props {
  album: Album;
  children?: React.ReactNode;
}

export const AlbumLink = ({ album, children = album.name }: Props) => (
  <LinkStyled to={albumPath(album.id)}>{children}</LinkStyled>
);
