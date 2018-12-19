import { ComponentType } from 'react';

export interface Fixtures<TProps> {
  name: string;
  component: ComponentType<any>;
  props?: TProps;
}
