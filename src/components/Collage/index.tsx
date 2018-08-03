import React, { ReactNode } from 'react';
import styled from '../../styled-components';

import { squareContainer } from '../../styled-mixins/squareContainer';
import { stretchContainingBlock } from '../../styled-mixins/stretchContainingBlock';

interface Props {
  topLeft: ReactNode;
  topRight: ReactNode;
  bottomLeft: ReactNode;
  bottomRight: ReactNode;
}

// A collage of four square elements.
export const Collage = (props: Props) => (
  <CollageContainer>
    <CollegeContents>
      {props.topLeft}
      {props.topRight}
      {props.bottomLeft}
      {props.bottomRight}
    </CollegeContents>
  </CollageContainer>
);

const CollageContainer = styled.div`
  ${squareContainer};
`;

const CollegeContents = styled.div`
  ${stretchContainingBlock};

  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  justify-items: stretch;
  align-items: stretch;
`;
