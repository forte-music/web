import React from 'react';
import { LinkStyled } from './LinkStyled';

import { artistPath } from '../utils/paths';

export interface Artist {
  id: string;
  name: string;
}

interface Props {
  artist: Artist;
  children?: React.ReactNode;
}

export const ArtistLink = ({ artist, children = artist.name }: Props) => (
  <LinkStyled to={artistPath(artist.id)}>{children}</LinkStyled>
);
