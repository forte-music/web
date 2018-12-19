import { ComponentType } from 'react';

export interface Fixture<TProps> {
  name?: string;
  component: ComponentType<any>;
  props?: TProps;
  viewport?: Viewport;
  reduxState?: any;
  url?: string;
  useTheme?: boolean;
}

interface Viewport {
  width: number;
  height: number;
}
