import * as React from 'react';
import { ArtistQuery } from './enhancers/query';
import { Artist } from './component';

export interface Props {
  id: string;
}

const Component = (props: Props) => (
  <ArtistQuery variables={{ artistId: props.id }}>
    {result => {
      if (result.loading || !result.data) {
        return null;
      }

      return <Artist artist={result.data.artist} />;
    }}
  </ArtistQuery>
);

export default Component;
