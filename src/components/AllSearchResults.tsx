import React from 'react';
import { SongSearchResultsContainer } from './SongSearchResultsContainer';
import { AlbumSearchResultsContainer } from './AlbumSearchResultsContainer';

interface Props {
  query: string;
}

export const AllSearchResults = (props: Props) => (
  <React.Fragment>
    <AlbumSearchResultsContainer query={props.query} />
    <SongSearchResultsContainer query={props.query} />
  </React.Fragment>
);
