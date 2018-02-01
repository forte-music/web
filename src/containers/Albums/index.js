/* global process: false */
import React from 'react';
import gql from 'graphql-tag';
import type { OptionProps } from 'react-apollo';
import { compose } from 'redux';
import { withApollo } from 'react-apollo';
import getDisplayName from 'react-display-name';

import { connectionQuery } from '../../components/ConnectionQuery';
import Albums from './Albums';
import type { AlbumsQuery } from './__generated__/AlbumsQuery';
import type { Props } from './Albums';

const graphqlEnhancer = connectionQuery(
  gql`
    query AlbumsQuery($cursor: String) {
      albums(first: 25, after: $cursor) @connection {
        pageInfo {
          count
        }

        edges {
          cursor

          node {
            id
            name
            artworkUrl

            artist {
              id
              name
            }
          }
        }
      }
    }
  `,
  {
    props: ({
      data: { albums, loading },
    }: OptionProps<void, AlbumsQuery>): Props => ({
      albums,
      loading,
    }),
  }
);

const mapProps = propsMapper => BaseComponent => {
  const MapComponent = props => <BaseComponent {...propsMapper(props)} />;

  if (process.env.NODE_ENV !== 'production') {
    MapComponent.displayName = `MapProps(${getDisplayName(BaseComponent)})`;
  }

  return MapComponent;
};

const trackLoaderEnhancer = mapProps(({ client, ...otherProps }) => ({
  ...otherProps,
  loadAlbumTracks: async (albumId: string) => {
    if (!client) {
      return;
    }

    const { data: { album: { songs } } } = await client.query({
      query: gql`
        query AlbumTracksQuery($id: ID!) {
          album(id: $id) {
            songs {
              id
              name
            }
          }
        }
      `,
      variables: { id: albumId },
    });

    return songs.map(({ id }, idx) => ({
      songId: id,
      source: { song: idx.toString() },
    }));
  },
}));

const enhancer = compose(graphqlEnhancer, withApollo, trackLoaderEnhancer);

const EnhancedComponent = enhancer(Albums);

export default EnhancedComponent;
