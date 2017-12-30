// @flow
import React from 'react';

import type { Song } from '../../model';

import {
  image as imageClass,
  container as containerClass,
  infoContainer as infoContainerClass,
  title as titleClass,
  detail as detailClass,
} from './NowPlaying.css';

type Props = {
  song?: Song,
};

const NowPlaying = ({ song }: Props) => {
  if (!song) {
    return <div className={containerClass} />;
  }

  const {
    name: songName,
    album: { name: albumName, artworkUrl, artist: { name: artistName } },
  } = song;

  return (
    <div className={containerClass}>
      <img
        className={imageClass}
        src={artworkUrl}
        alt="now playing album artwork"
      />
      <div className={infoContainerClass}>
        <div className={titleClass}>{songName}</div>
        <div className={detailClass}>
          <span>{artistName}</span>
          {' - '}
          <span>{albumName}</span>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
