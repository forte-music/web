import React from 'react';
import getDisplayName from 'react-display-name';

import Plus from './Plus';
import Dots from './Dots';
import Heart from './Heart';
import Pause from './Pause';
import Play from './Play';
import SkipBackwards from './SkipBackwards';
import SkipForwards from './SkipForwards';
import DefaultCover from './DefaultCover';
import Chevron from './Chevron';

const icons: Array<React.StatelessComponent<any>> = [
  Dots,
  Heart,
  Pause,
  Play,
  Plus,
  SkipBackwards,
  SkipForwards,
  DefaultCover,
  Chevron,
];

export default icons.map(Component => {
  const wrapped = () => (
    <div style={{ width: 160, height: 160, background: 'black' }}>
      <Component />
    </div>
  );

  wrapped.displayName = getDisplayName(Component);

  return {
    component: wrapped,
    name: 'icon',
  };
});
