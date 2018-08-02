import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.css';

interface Props {
  children?: React.ReactNode;
}

export const Container = (props: Props) => (
  <div className="container">{props.children}</div>
);
