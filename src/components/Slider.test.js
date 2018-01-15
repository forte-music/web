// @flow
import React from 'react';
import { shallow } from 'enzyme';

import styles from './Slider.css';

import Slider from './Slider';

it('renders', () => {
  shallow(<Slider min={0} max={100} value={30} onValueChange={() => {}} />);
});

it('sets width of div based on value.', () => {
  const wrapper = shallow(
    <Slider min={0} max={100} value={30} onValueChange={() => {}} />
  );

  const bar = wrapper.find(`.${styles.bar}`);
  const { style } = bar.props();
  expect(style.width).toEqual('30%');
});
