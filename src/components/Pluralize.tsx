import React from 'react';
import { pluralize } from '../utils';

interface Props<T> {
  singular: string;
  items: ReadonlyArray<T>;
}

export function Pluralize<T>(props: Props<T>) {
  return (
    <React.Fragment>
      {props.items.length} {pluralize(props.singular, props.items.length)}
    </React.Fragment>
  );
}
