import React from 'react';
import getDisplayName from 'react-display-name';

import { KeyboardInteraction } from '.';
import { Fixture } from '../../typings/fixture_types';
import { getStateAfter } from '../../redux/utils';
import { populateQueue } from '../../utils/populateQueue';

const component = () => (
  <div>
    <KeyboardInteraction />
    <textarea defaultValue="This is some text." />
  </div>
);

component.displayName = getDisplayName(KeyboardInteraction);

const fixture: Fixture<{}> = {
  component,
  name: 'with textfield',
  reduxState: getStateAfter(populateQueue(5)),
};

export default fixture;
