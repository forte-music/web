import React from 'react';
import { storiesOf } from '@storybook/react';
import getDisplayName from 'react-display-name';

import Plus from '../components/icons/Plus';
import Dots from '../components/icons/Dots';
import Heart from '../components/icons/Heart';
import Pause from '../components/icons/Pause';
import Play from '../components/icons/Play';
import SkipBackwards from '../components/icons/SkipBackwards';
import SkipForwards from '../components/icons/SkipForwards';
import DefaultCover from '../components/icons/DefaultCover';

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
