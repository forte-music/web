import React from 'react';
import styled from '../../../styled-components';

import Title from '../../Title';
import { PositionedHeading } from '../../styled/PositionedHeading';
import { Container } from '../../Container';
import { ArtworkGrid } from '../../styled/artworkGrid';
import { Contents } from '../../styled/Contents';
import { OnEnterView } from '../../OnEnterView';
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
          <OnEnterView onView={fetchMore} />
        </ArtworkGrid>
      </Contents>
    </Container>
  </div>
);

const AlbumsHeading = styled(PositionedHeading)`
  margin-bottom: 0;
`;
