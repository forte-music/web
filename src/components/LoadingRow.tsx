import React from 'react';
import styled from '../styled-components';
import { BaseColumnContainer } from './BaseSongTable';

export const LoadingRow = () => (
  <LoadingRowContainer>Loading...</LoadingRowContainer>
);

const LoadingRowContainer = styled(BaseColumnContainer)`
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
`;
