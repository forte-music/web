import React from 'react';
import { ArtistQuery } from './enhancers/query';
import { ArtistPage } from '../ArtistPage';

export interface Props {
  id: string;
}

const Component = (props: Props) => (
  <ArtistQuery variables={{ artistId: props.id }}>
    {result => {
      if (result.loading || !result.data) {
        return null;
      }

      return <ArtistPage artist={result.data.artist} />;
    }}
  </ArtistQuery>
);

export default Component;
