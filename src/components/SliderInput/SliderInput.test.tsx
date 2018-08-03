import React from 'react';
import { mount } from 'enzyme';

import { SliderInput } from '.';
import { noop } from '../../utils';

it('renders', () => {
  mount(<SliderInput min={0} max={100} value={0} onValueChange={noop} />);
});

it('calls onValueChange when the slider moves', () => {
  const onValueChange = jest.fn();
  const wrapper = mount(
    <SliderInput value={0} min={0} max={100} onValueChange={onValueChange} />
  );

  wrapper.find('input').simulate('change', { target: { value: 20 } });

  expect(onValueChange).toHaveBeenCalledWith(20);
});
