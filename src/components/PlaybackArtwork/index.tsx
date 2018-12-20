import React, { ReactNode } from 'react';
import styled from '../../styled-components';
import { opacify } from 'polished';

import PlaybackButton from '../PlaybackButton';

import { stretchContainingBlock } from '../../styled-mixins/stretchContainingBlock';
import { squareContainer } from '../../styled-mixins/squareContainer';

export type PlaybackState =
  // In this state, a play button is shown on hover. onStartPlayback is
  // called when the button is pressed.
  | 'STOPPED'

  // In this state, a loading indicator is shown. No interaction can happen
  // in this state.
  | 'LOADING'

  // In this state a playing indicator is shown. onPaused is called when the
  // indicator is pressed.
  | 'PLAYING'

  // In this state a paused indicator is shown. onPlaying is called when the
  // indicator is pressed.
  | 'PAUSED';

interface Props {
  // The element which will be rendered under the overlay.
  children: ReactNode;

  // Whether or not to handle clicks on the background. If true, clicking
  // the background calls one of onPlaying, onPaused or onStartPlayback
  // based on its state.
  handlesBackgroundInteraction: boolean;

  // The current state of playback.
  state: PlaybackState;

  // Called when the playback state should change from PAUSED to PLAYING.
  onPlaying: () => void;

  // Called when the playback state should change from PLAYING to PAUSED.
  onPaused: () => void;

  // Called when the playback state should change from STOPPED to PLAYING.
  onStartPlayback: () => void;
}

// A component which renders an overlay of the current playing state atop an
// element (usually Artwork or a Collage) and reacts to events.
export const PlaybackArtwork = (props: Props) => (
  <SquareContainer>
    <ChildrenContainer>{props.children}</ChildrenContainer>

    <ChildrenContainerOverlay
      handlesBackgroundInteraction={props.handlesBackgroundInteraction}
      onClick={() => handleUpdate(props)}
    />
    <ButtonBackdrop
      isActive={props.state !== 'STOPPED'}
      handlesBackgroundInteraction={props.handlesBackgroundInteraction}
    >
      <PlaybackButton
        pathClass={pathClassName}
        playing={props.state === 'PLAYING'}
        onToggle={() => handleUpdate(props)}
      />
    </ButtonBackdrop>
  </SquareContainer>
);

const ChildrenContainer = styled.div`
  ${stretchContainingBlock};

  margin: auto;
`;

const SquareContainer = styled.div`
  ${squareContainer};
`;

interface ChildrenContainerOverlayProps {
  handlesBackgroundInteraction: boolean;
}

const ChildrenContainerOverlay = styled(ChildrenContainer)<
  ChildrenContainerOverlayProps
>`
  background: ${props => props.theme.playbackOverlayColor};

  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  cursor: ${props =>
    props.handlesBackgroundInteraction ? 'pointer' : 'initial'};
  pointer-events: ${props =>
    props.handlesBackgroundInteraction ? 'initial' : 'none'};

  ${SquareContainer}:hover > & {
    opacity: 1;
  }
`;

const buttonMargin = '16px';
const buttonSize = '40px';
const buttonBackgroundColorActive = '#333333';
const buttonBackgroundColor = opacify(0.9, buttonBackgroundColorActive);
const buttonFillColor = '#eeeeee';

const pathClassName = 'path';

interface ButtonBackdropProps {
  isActive: boolean;
  handlesBackgroundInteraction: boolean;
}

const ButtonBackdrop = styled.div<ButtonBackdropProps>`
  position: absolute;
  bottom: ${buttonMargin};
  right: ${buttonMargin};

  width: ${buttonSize};
  height: ${buttonSize};
  border-radius: 50%;

  background: ${buttonBackgroundColor};
  cursor: pointer;

  transform-origin: center center;

  transition: 0.2s transform ease-out, 0.2s background ease-in-out;
  transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0)')};

  & .${pathClassName} {
    fill: ${buttonFillColor};
    stroke: ${buttonFillColor};
  }

  ${SquareContainer}:hover > & {
    transform: scale(1);
  }

  ${SquareContainer}:active > & {
    background: ${props =>
      props.handlesBackgroundInteraction
        ? buttonBackgroundColorActive
        : buttonBackgroundColor};
  }

  &:active {
    background: ${buttonBackgroundColorActive};
  }
`;

const handleUpdate = (props: Props) => {
  if (props.state === 'PLAYING') {
    props.onPaused();
  } else if (props.state === 'PAUSED') {
    props.onPlaying();
  } else if (props.state === 'STOPPED') {
    props.onStartPlayback();
  }
};
