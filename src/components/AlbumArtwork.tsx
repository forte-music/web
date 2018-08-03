import React from 'react';
import DefaultCover from './icons/DefaultCover';
import { Artwork } from './Artwork';

interface Album {
  id: string;
  name: string;
  artworkUrl: string | null | void;
}

interface Props {
  album?: Album;
}

export const AlbumArtwork = ({ album }: Props) => {
  if (!album || !album.artworkUrl) {
    return <DefaultCover />;
  }

  return <Artwork src={album.artworkUrl} alt={album.name} />;
};
