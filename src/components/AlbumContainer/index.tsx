import React from 'react';
import { Album } from './component';
import { AlbumQuery } from './enhancers/query';
import { ReduxData } from './enhancers/redux';

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
        <ReduxData album={album}>
          {({ onDoubleClick, currentlyPlayingId }) => (
            <Album
              onDoubleClick={onDoubleClick}
              album={album}
              currentlyPlayingId={currentlyPlayingId}
            />
          )}
        </ReduxData>
      );
    }}
  </AlbumQuery>
);

export default Component;
