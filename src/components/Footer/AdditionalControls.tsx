import React from 'react';
import styled from '../../styled-components';

import { VolumeSlider } from '../VolumeSlider';
import { Like } from '../Like';
import { FormattedDuration } from '../FormattedDuration';

interface Props {
  duration: number;
  currentTime: number;

  volume: number;
  onVolumeSet: (newVolume: number) => void;

  like: boolean;
  onToggleLike: () => void;
}

export const AdditionalControls = (props: Props) => (
  <AdditionalControlsContainer>
    <CurrentTimeContainer>
      <FormattedDuration duration={props.currentTime} />
      {' / '}
      <FormattedDuration duration={props.duration} />
    </CurrentTimeContainer>

    <Like isLiked={props.like} onToggleLike={props.onToggleLike} />
    <VolumeSlider volume={props.volume} onVolume={props.onVolumeSet} />
  </AdditionalControlsContainer>
);

export const AdditionalControlsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CurrentTimeContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${props => props.theme.fontSizeTiny};

  margin: ${props => props.theme.sizeTiny};

  color: ${props => props.theme.footerCurrentTimeTextColor};
`;
