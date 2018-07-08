import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import store from '../store';
import { KeyboardInteraction } from '../components/KeyboardInteraction';
import { populateQueue } from './populateQueue';

storiesOf('keyboard interaction', module).add('with textfield', () => {
  store.dispatch(populateQueue());

  store.subscribe(() => {
    const labeledAction = action('store updated');
    const state = store.getState();
    const isPlaying = state.queue.shouldBePlaying;
    const position = state.queue.position;

    labeledAction(isPlaying, position);
  });

  return (
    <div>
      <KeyboardInteraction store={store} />
      <textarea defaultValue="This is some text." />;
    </div>
  );
});
