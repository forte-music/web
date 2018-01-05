import React from 'react';
import { storiesOf } from '@storybook/react';
import getDisplayName from 'react-display-name';

import Plus from '../icons/Plus';
import Dots from '../icons/Dots';
import Heart from '../icons/Heart';
import Pause from '../icons/Pause';
import Play from '../icons/Play';
import SkipBackwards from '../icons/SkipBackwards';
import SkipForwards from '../icons/SkipForwards';
import DefaultCover from '../icons/DefaultCover';

const ICONS = [
  <Dots />,
  <Heart />,
  <Pause />,
  <Play />,
  <Plus />,
  <SkipBackwards />,
  <SkipForwards />,
  <DefaultCover />,
];

ICONS.reduce(
  (acc, val) =>
    acc.add(getDisplayName(val.type), () => (
      <div style={{ width: 160, height: 160 }}>{val}</div>
    )),
  storiesOf('Icons', module)
);
