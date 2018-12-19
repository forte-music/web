import { StyledComponentClass } from 'styled-components';
import { Theme } from '../../theme';
import styled from '../../styled-components';
import { artworkGrid } from '../../styled-mixins/artworkGrid';

// @ts-ignore
export const ArtworkGrid: StyledComponentClass<{}, Theme> = styled.div`
  ${artworkGrid};
`;
