import React, { ReactNode } from 'react';
import styled, { css } from '../styled-components';

export interface Props {
  artwork: ReactNode;
  lineOne: ReactNode;
  lineTwo: ReactNode;
}

export const ArtworkTwoInfo = (props: Props) => (
  <ArtworkTwoInfoContainer>
    {props.artwork}
    <LineOne>{props.lineOne}</LineOne>
    <LineTwo>{props.lineTwo}</LineTwo>
  </ArtworkTwoInfoContainer>
);

const ArtworkTwoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  text-align: center;

  color: ${props => props.theme.albumInfoColor};
`;

const textContainerFragment = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
`;

const LineOne = styled.div`
  ${textContainerFragment};

  margin-top: ${props => props.theme.sizeTiny};
  font-size: ${props => props.theme.fontSizeTiny};
  margin-bottom: ${props => props.theme.sizeVeryTiny};
`;

const LineTwo = styled.div`
  ${textContainerFragment};

  margin-top: ${props => props.theme.sizeVeryTiny};
  margin-bottom: ${props => props.theme.sizeVeryTiny};

  font-size: ${props => props.theme.fontSizeVeryTiny};
  color: ${props => props.theme.albumInfoSecondaryColor};
`;
