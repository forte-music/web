import React from 'react';

// @ts-ignore
import bootstrapStyles from 'bootstrap/dist/css/bootstrap-grid.css';

interface Props {
  children?: React.ReactNode;
}

export const Container = (props: Props) => (
  <div className={bootstrapStyles.container}>{props.children}</div>
);
