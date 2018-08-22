import React from 'react';

import Title from '../../Title';
import { PositionedHeading } from '../../styled/PositionedHeading';
import { Container } from '../../Container';
import { ArtworkGrid } from '../../styled/artworkGrid';
import { Contents } from '../../styled/Contents';
import { ArtworkGridLoadMoreSentinel } from '../../ArtworkGridLoadMoreSentinel';
import { ArtworkGridAlbums } from '../../ArtworkGridAlbums';

import { AlbumsQuery_albums as Albums } from '../enhancers/__generated__/AlbumsQuery';

export interface Props {
  albums?: Albums;
  fetchMore: () => void;
}

export const AlbumsPage = ({ albums, fetchMore }: Props) => (
  <div>
    <Title segments={['Albums']} />

    <Container>
      <AlbumsHeading>Albums</AlbumsHeading>

      <Contents>
        <ArtworkGrid>
          {albums && (
            <ArtworkGridAlbums albums={albums.edges.map(edge => edge.node)} />
          )}
          <ArtworkGridLoadMoreSentinel onStartLoading={fetchMore} />
        </ArtworkGrid>
      </Contents>
    </Container>
  </div>
);

const AlbumsHeading = PositionedHeading.extend`
  margin-bottom: 0;
`;
