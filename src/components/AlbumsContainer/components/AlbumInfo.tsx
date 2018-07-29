import React from 'react';
import { ArtworkTwoInfo } from '../../ArtworkTwoInfo';
import {
  PlaybackAlbumArtwork,
  Album as PlaybackAlbumArtworkAlbum,
} from '../../PlaybackAlbumArtwork';
import { AlbumLink, Album as AlbumLinkAlbum } from '../../AlbumLink';
import { ArtistLink, Artist as ArtistLinkArtist } from '../../ArtistLink';

// TODO: Click Region
// TODO: Disable Draggable

interface Album extends PlaybackAlbumArtworkAlbum, AlbumLinkAlbum {
  artist: ArtistLinkArtist;
}

export interface Props {
  album: Album;
}

export const AlbumInfo = ({ album }: Props) => (
  <ArtworkTwoInfo
    artwork={
      <PlaybackAlbumArtwork
        album={album}
        handlesBackgroundInteraction={false}
      />
    }
    lineOne={<AlbumLink album={album} />}
    lineTwo={<ArtistLink artist={album.artist} />}
  />
);
