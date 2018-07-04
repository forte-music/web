import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

import { songs } from '@forte-music/mock/models';
import { Song } from '@forte-music/mock/models';
import SongList from '../components/SongList/SongList';
import { Header, Row } from '../components/SongList/Detail';
import { mustGet } from '@forte-music/mock/utils';

import {
  Song as SongDetail,
  SongRowProps,
} from '../components/SongList/Detail';
import client from '../graphql/client';
import ConnectedDetailRow from '../containers/SongList/Detail';

const ids = Array.from(songs.keys());
ids.sort();

interface State {
  isLoaded: boolean;
}

class DelayedLoadingRow extends React.Component<SongRowProps, State> {
  public state = {
    isLoaded: false,
  };

  public componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 1000);
  }

  public render() {
    return <Row song={this.state.isLoaded ? this.props.song : undefined} />;
  }
}

const manyItems = 100000;

const Story = ({
  count = ids.length,
  getId = index => ids[index],
  getRowForSong = (song, index) => (
    <Row key={index} song={song} onDoubleClick={action(`clicked ${index}`)} />
  ),
}: {
  count?: number;
  getId?: (index: number) => string;
  getRowForSong?: (detail: SongDetail, index: number) => React.ReactNode;
}) => (
  <SongList
    header={<Header />}
    countAvailableRows={count}
    renderItem={index => {
      const id = getId(index);
      const song: Song = mustGet(songs, id);

      return getRowForSong(song, index);
    }}
  />
);

storiesOf('SongList', module)
  .addDecorator(story => <HashRouter>{story()}</HashRouter>)
  .add('a few items', () => <Story />)
  .add('single row loading', () => <Row />)
  .add('the same items many times', () => (
    <Story count={manyItems} getId={index => ids[index % ids.length]} />
  ))
  .add('lots of loading items', () => (
    <Story
      count={manyItems}
      getId={index => ids[index % ids.length]}
      getRowForSong={song => <DelayedLoadingRow song={song} />}
    />
  ))
  .add('an active row', () => (
    <Row
      song={mustGet(songs, '00000000000000000000000000000001')}
      onDoubleClick={action('double click')}
      active
    />
  ))
  .add('connected detail row', () => (
    <ApolloProvider client={client}>
      <ConnectedDetailRow songId={'00000000000000000000000000000001'} />
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
