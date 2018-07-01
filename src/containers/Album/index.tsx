import * as React from 'react';
import { Album } from './component';
import { AlbumQuery } from './enhancers/query';

export interface Props {
  id: string;
}

const Component = ({ id }: Props) => (
  <AlbumQuery variables={{ albumId: id }}>
    {result => {
      if (result.loading || !result.data) {
        return null;
      }

      return <Album album={result.data.album} />;
    }}
  </AlbumQuery>
);

export default Component;
