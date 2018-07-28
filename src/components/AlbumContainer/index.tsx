import React from 'react';
import { AlbumPage } from '../AlbumPage';
import { AlbumQuery } from './enhancers/query';
import { AlbumContainerState } from './enhancers/redux';

export interface Props {
  id: string;
}

const Component = ({ id }: Props) => (
  <AlbumQuery variables={{ albumId: id }}>
    {result => {
      if (result.loading || !result.data) {
        return null;
      }

      const album = result.data.album;
      return (
        <AlbumContainerState album={album}>
          {({ onDoubleClick, currentlyPlayingId }) => (
            <AlbumPage
              onDoubleClick={onDoubleClick}
              album={album}
              currentlyPlayingId={currentlyPlayingId}
            />
          )}
        </AlbumContainerState>
      );
    }}
  </AlbumQuery>
);

export default Component;
