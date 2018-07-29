import { StyledComponentClass } from 'styled-components';
import { Theme } from '../../theme';
import { Contents } from './Contents';
import { artworkGrid } from '../../styled-mixins/artworkGrid';

// @ts-ignore
export const ArtworkGridContents: StyledComponentClass<
  {},
  Theme
> = Contents.extend`
  ${artworkGrid};
`;
