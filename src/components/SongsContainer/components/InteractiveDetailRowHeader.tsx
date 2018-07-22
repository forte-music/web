import React from 'react';
import detailRowStyles from '../../DetailRow/index.css';
import styles from './InteractiveDetailRowHeader.css';
import { BaseHeader } from '../../BaseRow';
import { SortBy } from '../enhancers/__generated__/SongsQuery';
import Chevron from '../../icons/Chevron';

interface Props {
  isReverse: boolean;
  setReverse: (newReverse: boolean) => void;

  sortBy: SortBy;
  setSortBy: (newSortBy: SortBy) => void;
}

export const InteractiveDetailRowHeader = (props: Props) => (
  <BaseHeader>
    <SortedColumn
      className={detailRowStyles.song}
      forSortBy={SortBy.LEXICOGRAPHICALLY}
      {...props}
    >
      Name
    </SortedColumn>
    <div className={detailRowStyles.album}>Album</div>
    <div className={detailRowStyles.artist}>Artists</div>
    <div className={detailRowStyles.duration}>Duration</div>
  </BaseHeader>
);

interface SortedColumnProps extends Props {
  forSortBy: SortBy;
  className?: string;
  children: React.ReactNode;
}

const SortedColumn = (props: SortedColumnProps) => (
  <div
    className={[
      props.className,
      props.sortBy === props.forSortBy ? styles.sorted : '',
      props.isReverse ? styles.reversed : '',
    ].join(' ')}
    onClick={() => {
      if (props.sortBy === props.forSortBy) {
        props.setReverse(!props.isReverse);
      } else {
        props.setReverse(false);
        props.setSortBy(props.forSortBy);
      }
    }}
  >
    {props.children}
    <Chevron svgClass={styles.chevron} />
  </div>
);
