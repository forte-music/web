import React from 'react';
import { join, unique } from '../utils';
import { Link } from 'react-router-dom';
import commonStyles from '../shared.css';
import { artistPath } from '../utils/paths';

export interface Artist {
  id: string;
  name: string;
}

interface Props {
  artists: Artist[];
  className?: string;
}

export const InlineArtistsList = ({
  artists,
  className = commonStyles.link,
}: Props) => (
  <React.Fragment>
    {unique(
      join(
        artists.map(({ id, name }) => (
          <Link to={artistPath(id)} className={className}>
            {name}
          </Link>
        )),
        <span>, </span>
      )
    )}
  </React.Fragment>
);
