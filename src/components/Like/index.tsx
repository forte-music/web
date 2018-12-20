import React from 'react';
import styled, { keyframes } from '../../styled-components';

import Heart from '../icons/Heart';

interface Props {
  onToggleLike: () => void;
  isLiked: boolean;
}

export const Like = ({ onToggleLike, isLiked }: Props) => (
  <HeartContainer isLiked={isLiked} onClick={onToggleLike}>
    <Heart svgClass={svgClassName} fillPathClass={fillPathClassName} />
  </HeartContainer>
);

const svgClassName = 'svgClass';

const fillPathClassName = 'fillPathClass';

const likeOut = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const likeIn = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
`;

interface HeartContainerProps {
  isLiked: boolean;
}

const HeartContainer = styled.div<HeartContainerProps>`
  width: ${props => props.theme.secondaryButtonSize};

  & .${svgClassName} {
    cursor: pointer;
    display: block;
  }

  & .${fillPathClassName} {
    transform-origin: center center;
  }

  & .${props => !props.isLiked && fillPathClassName} {
    animation-name: ${likeIn};
    animation-duration: 0.15s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  & .${props => props.isLiked && fillPathClassName} {
    /*
    This is a spring-like animation. Real spring animations are really-hard with
    CSS: https://medium.com/@dtinth/spring-animation-in-css-2039de6e1a03
    */
    animation-name: ${likeOut};
    animation-duration: 0.3s;
    animation-timing-function: cubic-bezier(0, 0.5, 0.3, 2.5);
  }
`;
