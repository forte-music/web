import React from 'react';

import Title from '../../Title';
import { PositionedHeading } from '../../styled/PositionedHeading';
import { Container } from '../../Container';
import { ArtworkGrid } from '../../styled/artworkGrid';
import { Contents } from '../../styled/Contents';
import { ArtworkGridOnView } from '../../ArtworkGridOnView';
import { AlbumGrid } from '../../AlbumGrid';

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
          {albums && <AlbumGrid albums={albums.edges.map(edge => edge.node)} />}
          <ArtworkGridOnView onView={fetchMore} />
        </ArtworkGrid>
      </Contents>
    </Container>
  </div>
);

const AlbumsHeading = PositionedHeading.extend`
  margin-bottom: 0;
`;
