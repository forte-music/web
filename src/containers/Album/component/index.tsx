import * as React from 'react';
import * as styles from './styles.css';
import { Album_album } from '../../../__generated__/Album';
import Title from '../../../components/Title';
import { AlbumArtwork } from '../../../components/AlbumArtwork';
import { Link } from 'react-router-dom';
import { artist as artistPath } from '../../../paths';
import { formatDuration, noop, pluralize } from '../../../utils';
import { SongList } from '../../../components/SongList';
import { Header } from '../../../components/SongList/Detail';
import ConnectedDetailRow from '../../SongList/Detail';

export interface Props {
  album: Album_album;
}

const Album = ({ album }: Props) => (
  <div>
    <Title segments={[album.name]} />

    <div className={styles.header}>
      <div className={styles.albumArtwork}>
        <AlbumArtwork album={album} />
      </div>
      <div className={styles.headerRightColumn}>
        <div className={styles.albumName}>{album.name}</div>
        <div className={styles.artistName}>
          <Link className={styles.link} to={artistPath(album.artist.id)}>
            {album.artist.name}
          </Link>
        </div>

        <div className={styles.statsContainer}>
          {album.songs.length} {pluralize('song', album.songs.length)},{' '}
          {formatDuration(album.duration)}
        </div>
      </div>
    </div>

    <div className={styles.songContainer}>
      <SongList
        loadMore={noop}
        // TODO: Use Own Header and Rows
        header={<Header />}
        totalItems={album.songs.length}
        countAvailableRows={album.songs.length}
        renderItem={({ index }) => {
          const song = album.songs[index];

          return (
            <ConnectedDetailRow
              key={song.id}
              songId={song.id}
              active={false}
              onDoubleClick={noop}
            />
          );
        }}
      />
    </div>
  </div>
);

export default (props: Partial<Props>) => {
  if (props.album) {
    return <Album album={props.album} />;
  }

  return null;
};
