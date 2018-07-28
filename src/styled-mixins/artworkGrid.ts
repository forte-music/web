import { css } from '../styled-components';

export const artworkGrid = css`
  display: grid;
  grid-column-gap: ${props => props.theme.sizeSmall};
  grid-row-gap: ${props => props.theme.sizeSmall};

  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.theme.gridArtworkSize}, 1fr)
  );
`;
