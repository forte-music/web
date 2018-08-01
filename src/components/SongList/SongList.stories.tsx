import React, { Component, ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

import { Song, songs } from '@forte-music/mock/models';
import { SongList } from '.';
import { DetailRow, Props, DetailRowHeader } from '../DetailSongTable';
import { mustGet } from '@forte-music/mock/utils';

import client from '../../graphql/client';
import ConnectedDetailRow from '../SongListContainer/Detail';
import { genRange } from '../../utils';

const ids = Array.from(songs.keys());
ids.sort();

interface State {
  isLoaded: boolean;
}

class DelayedLoadingRow extends Component<Props, State> {
  public state = {
    isLoaded: false,
  };

  public componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 1000);
  }

  public render() {
    return (
      <DetailRow
        song={this.state.isLoaded ? this.props.song : undefined}
        active={false}
      />
    );
  }
}

const manyItems = 100000;

const Story = ({
  count = ids.length,
  getId = index => ids[index],
  getRowForSong = (song, index) => (
    <DetailRow
      key={index}
      song={song}
      onDoubleClick={action(`clicked ${index}`)}
      active={false}
    />
  ),
}: {
  count?: number;
  getId?: (index: number) => string;
  getRowForSong?: (detail: Song, index: number) => ReactNode;
}) => (
  <SongList
    header={<DetailRowHeader />}
    rows={Array.from(genRange(count))}
    render={index => {
      const id = getId(index);
      const song: Song = mustGet(songs, id);

      return getRowForSong(song, index);
    }}
  />
);

storiesOf('SongList', module)
  .addDecorator(story => <HashRouter>{story()}</HashRouter>)
  .add('a few items', () => <Story />)
  .add('single row loading', () => <DetailRow active={false} />)
  .add('the same items many times', () => (
    <Story count={manyItems} getId={index => ids[index % ids.length]} />
  ))
  .add('lots of loading items', () => (
    <Story
      count={manyItems}
      getId={index => ids[index % ids.length]}
      getRowForSong={(song, index) => (
        <DelayedLoadingRow key={index} song={song} active={false} />
      )}
    />
  ))
  .add('an active row', () => (
    <DetailRow
      song={mustGet(songs, '00000000000000000000000000000001')}
      onDoubleClick={action('double click')}
      active
    />
  ))
  .add('connected detail row', () => (
    <ApolloProvider client={client}>
      <ConnectedDetailRow
        songId={'00000000000000000000000000000001'}
        active={false}
      />
    </ApolloProvider>
  ))
  .add('many connected detail rows', () => (
    <ApolloProvider client={client}>
      <Story
        count={manyItems}
        getId={index => ids[index % ids.length]}
        getRowForSong={(song, index) => (
          <ConnectedDetailRow
            key={index}
            songId={song.id}
            active={index === 30}
            onDoubleClick={() => action('double click')}
          />
        )}
      />
    </ApolloProvider>
  ));
