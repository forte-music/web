import React from 'react';
import styles from './styles.css';
import { AlbumQuery_album } from '../../AlbumContainer/enhancers/__generated__/AlbumQuery';
import Title from '../../Title';
import { PlaybackAlbumArtwork } from '../../PlaybackAlbumArtwork';
import { Link } from 'react-router-dom';
import { artistPath } from '../../../utils/paths';
import { pluralize } from '../../../utils';
import { SongList } from '../../SongList';
import { Header } from '../../SongList/Detail';
import ConnectedDetailRow from '../../SongListContainer/Detail';
import { formatDuration } from '../../../utils/duration';

export interface Props {
  album: AlbumQuery_album;
  onDoubleClick: (startIndex: number) => void;
  currentlyPlayingId?: string;
}

export const Album = ({ album, onDoubleClick, currentlyPlayingId }: Props) => (
  <div>
    <Title segments={[album.name]} />

    <div className={styles.header}>
      <div className={styles.albumArtwork}>
        <PlaybackAlbumArtwork backgroundInteraction album={album} />
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
              active={currentlyPlayingId === song.id}
              onDoubleClick={() => onDoubleClick(index)}
            />
          );
        }}
      />
    </div>
  </div>
);
