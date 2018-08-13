import React from 'react';
import { SongsQuery } from './enhancers/query';
import { ReduxContainer } from './enhancers/redux';
import { SongSearchResults } from '../SongSearchResults';

interface Props {
  query: string;
}

export const SongSearchResultsContainer = (props: Props) => (
  <SongsQuery variables={{ query: props.query }}>
    {result => {
      const songs =
        !result.loading && result.data
          ? result.data.songs.edges.map(edge => edge.node)
          : undefined;

      return (
        <ReduxContainer currentQuery={props.query} songs={songs}>
          {reduxParams => (
            <SongSearchResults
              query={props.query}
              activeSongId={reduxParams.activeSongId}
              startPlayingFromSong={reduxParams.startPlayingFromSong}
              songs={songs}
            />
          )}
        </ReduxContainer>
      );
    }}
  </SongsQuery>
);
