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

// Over estimates the number of 150px album artworks which would fit onto the
// screen. Used to decide how many items will be queried per-page.
export const calcArtworkPageSize = (): number => {
  const maxWidth = 1100;
  const innerWindowHeight = window.innerHeight;
  const drawingArea = maxWidth * innerWindowHeight;

  const artworkSize = 150;
  const artworkArea = artworkSize * artworkSize;
  const extraAreaMultiplier = 2;

  const artworks = Math.floor(
    (drawingArea / artworkArea) * extraAreaMultiplier
  );
  return artworks;
};
