import { lighten } from 'polished';

const colors = {
  secondaryColor: '#121212',
};

const sizes = {
  veryTiny: 4,
  tiny: 8,
  small: 16,
  base: 24,
  medium: 36,
  large: 48,
};

const withPx = (dim: number) => `${dim}px`;

export const theme = {
  sidebarBorderColor: lighten(0.1, colors.secondaryColor),
  sidebarBackgroundColor: colors.secondaryColor,
  footerBackgroundColor: lighten(0.1, colors.secondaryColor),
  contentBackgroundColor: '#1b1b1b',
  headerBackgroundColor: '#222222',
  headerPrimaryTextColor: '#ffffff',
  headerSecondaryTextColor: '#bbbbbb',
  headerTertiaryTextColor: '#aaaaaa',

  sizeVeryTiny: withPx(sizes.veryTiny),
  sizeTiny: withPx(sizes.tiny),
  sizeSmall: withPx(sizes.small),
  sizeBase: withPx(sizes.base),
  sizeMedium: withPx(sizes.medium),
  sizeLarge: withPx(sizes.large),

  fontSizeVeryTiny: '12px',
  fontSizeTiny: '14px',
  fontSizeMedium: '24px',
  fontSizeLarge: '40px',

  secondaryButtonSize: '40px',

  // 1110 (maximum container inner size)
  // - 2 * sizes.medium (padding)
  // - 5 * sizes.small (gutters)
  // / 6 (each column)
  gridArtworkSize: `150px`,
  artworkSize: '160px',
};

export type Theme = typeof theme;
