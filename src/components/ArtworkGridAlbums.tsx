import React from 'react';

import {
  Album as AlbumInfoAlbum,
  AlbumInfo,
} from './AlbumsContainer/components/AlbumInfo';

interface Props {
  albums: AlbumInfoAlbum[];
}

export const ArtworkGridAlbums = (props: Props) => (
  <React.Fragment>
    {props.albums.map(album => <AlbumInfo key={album.id} album={album} />)}
  </React.Fragment>
);
