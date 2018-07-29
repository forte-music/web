import styled, { css, keyframes } from '../styled-components';
import { shade, tint } from 'polished';

export const BarsContainer = styled.div`
  position: relative;

  height: 10px;
  background: ${props => shade(0.9, props.theme.contentBackgroundColor)};
`;

interface BarProps {
  // A number between 0 and 1 where 0 is an empty bar and 1 is a full bar.
  position: number;
}

export const BaseBar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const Bar =
  BaseBar.extend <
  BarProps >
  `
  /* Position the bars on top of each other relative to the bars container. The
   * z-index is source order.
   */
  width: ${props => props.position * 100}%;
`;

export const PlayedBar = Bar.extend`
  background: ${props => tint(0.85, props.theme.contentBackgroundColor)};
`;

export const BufferedBar = Bar.extend`
  background: ${props => tint(0.95, props.theme.contentBackgroundColor)};
`;

const semiTransparent = 'rgba(255, 255, 255, 0.2)';
const backgroundSize = '50px';

const loadingBackground = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: ${backgroundSize} ${backgroundSize};
  }
`;

const stretchContainingBlock = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const LoadingBar = BaseBar.extend`
  background: ${props => props.theme.contentBackgroundColor};

  &:after {
    content: '';

    ${stretchContainingBlock};

    /*
     * Striped 45 deg gradient with partially transparent and fully transparent
     * regions.
     */
    background-image: linear-gradient(
      -45deg,
      ${semiTransparent} 25%,
      transparent 25%,
      transparent 50%,
      ${semiTransparent} 50%,
      ${semiTransparent} 75%,
      transparent 75%,
      transparent 100%
    );

    background-size: ${backgroundSize} ${backgroundSize};
    animation: ${loadingBackground} 2s linear infinite;
    overflow: hidden;
  }
`;
