import React from 'react';
import styles from './styles.css';
import { AlbumQuery_album } from '../../../__generated__/AlbumQuery';
import Title from '../../Title';
import { AlbumArtwork } from '../../AlbumArtwork';
import { Link } from 'react-router-dom';
import { artist as artistPath } from '../../../utils/paths';
import { noop, pluralize } from '../../../utils';
import { SongList } from '../../SongList';
import { Header } from '../../SongList/Detail';
import ConnectedDetailRow from '../../SongListContainer/Detail';
import { formatDuration } from '../../../utils/duration';

export interface Props {
  album: AlbumQuery_album;
}

export const Album = ({ album }: Props) => (
  <div>
    <Title segments={[album.name]} />

    <div className={styles.header}>
      <div className={styles.albumArtwork}>
        <AlbumArtwork backgroundInteraction album={album} />
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
        // TODO: Use Own Header and Rows
        header={<Header />}
        countAvailableRows={album.songs.length}
        renderItem={index => {
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
