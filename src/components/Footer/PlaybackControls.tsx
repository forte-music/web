import React from 'react';
import styled, { css } from '../../styled-components';

import PlaybackButton from '../PlaybackButton';
import SkipBackwards from '../icons/SkipBackwards';
import SkipForwards from '../icons/SkipForwards';

interface PlaybackControlsProps {
  // Whether or not the button center button is in the playing state
  // (showing the pause button).
  playing: boolean;

  // Called when the center button is clicked.
  onTogglePlayback: () => void;

  // Whether or not the buttons are disabled. When the buttons are disabled,
  // they can't be pressed and they display a different style.
  disabled: boolean;

  // Called when the skip ahead button is clicked.
  next: () => void;

  // Called when the skip backwards button is clicked.
  previous: () => void;
}

export const PlaybackControls = (props: PlaybackControlsProps) => {
  // Renders the play button when disabled, otherwise renders based on the
  // state of playing.
  const playingWithDisabled = !props.disabled && props.playing;

  return (
    <PlaybackControlsContainer isDisabled={props.disabled}>
      <SecondaryButtonContainer
        isDisabled={props.disabled}
        onClick={props.previous}
      >
        <SkipBackwards pathClass={pathClass} />
      </SecondaryButtonContainer>

      <PrimaryButtonContainer isDisabled={props.disabled}>
        <PlaybackButton
          playing={playingWithDisabled}
          onToggle={props.onTogglePlayback}
          pathClass={pathClass}
        />
      </PrimaryButtonContainer>

      <SecondaryButtonContainer
        isDisabled={props.disabled}
        onClick={props.next}
      >
        <SkipForwards pathClass={pathClass} />
      </SecondaryButtonContainer>
    </PlaybackControlsContainer>
  );
};

const pathClass = 'path';

const primaryButtonSize = '60px';
const secondaryButtonSize = '40px';

const clickDisabled = css`
  cursor: initial;
  pointer-events: none;
`;

interface PlaybackControlsContainerProps {
  isDisabled: boolean;
}

const PrimaryButtonContainer = styled.div<PlaybackControlsContainerProps>`
  cursor: pointer;
  margin: 15px;
  border-radius: 50%;
  background: ${props => props.theme.footerPlaybackButtonBackgroundColor};

  height: ${primaryButtonSize};
  width: ${primaryButtonSize};

  ${props => props.isDisabled && clickDisabled};
`;

const SecondaryButtonContainer = styled.div<PlaybackControlsContainerProps>`
  cursor: pointer;
  height: ${secondaryButtonSize};
  width: ${secondaryButtonSize};

  ${props => props.isDisabled && clickDisabled};
`;

const PlaybackControlsContainer = styled.div<PlaybackControlsContainerProps>`
  display: flex;
  align-items: center;

  & ${props => props.isDisabled && `.${pathClass}`} {
    fill: ${props => props.theme.footerButtonDisabledColor};
    stroke: ${props => props.theme.footerButtonDisabledColor};
  }
`;
