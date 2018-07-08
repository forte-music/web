import * as React from 'react';
import { storiesOf } from '@storybook/react';
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

const ICONS = [
  <Dots />,
  <Heart />,
  <Pause />,
  <Play />,
  <Plus />,
  <SkipBackwards />,
  <SkipForwards />,
  <DefaultCover />,
  <Chevron />,
];

ICONS.reduce(
  (acc, val) =>
    acc.add(getDisplayName(val.type), () => (
      <div style={{ width: 160, height: 160 }}>{val}</div>
    )),
  storiesOf('Icons', module)
);
