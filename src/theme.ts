import { lighten } from 'polished';

const colors = {
  secondaryColor: '#121212',
};

export const theme = {
  sidebarBorderColor: lighten(0.1, colors.secondaryColor),
  sidebarBackgroundColor: colors.secondaryColor,
  footerBackgroundColor: lighten(0.1, colors.secondaryColor),
  contentBackgroundColor: '#1b1b1b',
};

export type Theme = typeof theme;
