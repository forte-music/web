import { lighten } from 'polished';

const colors = {
  secondaryColor: '#121212',
};

export const theme = {
  sidebarBorderColor: lighten(0.1, colors.secondaryColor),
  sidebarBackgroundColor: colors.secondaryColor,
  footerBackgroundColor: lighten(0.1, colors.secondaryColor),
  contentBackgroundColor: '#1b1b1b',
  headerBackgroundColor: '#222222',
  headerPrimaryTextColor: '#ffffff',
  headerSecondaryTextColor: '#bbbbbb',
  headerTertiaryTextColor: '#aaaaaa',

  sizeVeryTiny: '4px',
  sizeTiny: '8px',
  sizeSmall: '16px',
  sizeBase: '24px',
  sizeMedium: '36px',
  sizeLarge: '48px',

  fontSizeVeryTiny: '12px',
  fontSizeTiny: '14px',
  fontSizeMedium: '24px',
  fontSizeLarge: '40px',

  secondaryButtonSize: '40px',
  artworkSize: '160px',
};

export type Theme = typeof theme;
