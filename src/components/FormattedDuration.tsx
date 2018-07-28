import React from 'react';
import { formatDuration } from '../utils/duration';

interface Props {
  duration: number;
}

export const FormattedDuration = (props: Props) => (
  <React.Fragment>{formatDuration(props.duration)}</React.Fragment>
);
