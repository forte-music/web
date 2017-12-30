// @flow
import React from 'react';
import Play from '../icons/Play';
import Pause from '../icons/Pause';

type Props = {
  onToggle: () => void,
  playing?: boolean,
  pathClass?: string,
  svgClass?: string,
  containerClass?: string,
};

const PlaybackButton = ({
  onToggle,
  playing = false,
  containerClass,
  pathClass,
  svgClass,
}: Props) => {
  const props = { pathClass, svgClass };

  return (
    <div className={containerClass} onClick={() => onToggle()}>
      {(playing && <Pause {...props} />) || <Play {...props} />}
    </div>
  );
};

export default PlaybackButton;
