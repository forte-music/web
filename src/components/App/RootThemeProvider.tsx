import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

interface Props {
  children?: React.ReactChild;
}
export const RootThemeProvider = (props: Props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);
