import React from 'react';
import { BaseColumnContainer } from './BaseSongTable';

export const LoadingRow = () => (
  <LoadingRowContainer>Loading...</LoadingRowContainer>
);

const LoadingRowContainer = BaseColumnContainer.extend`
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
`;
