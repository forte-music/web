import { ComponentType } from 'react';

export interface Fixture<TProps> {
  name: string;
  component: ComponentType<any>;
  props?: TProps;
}
