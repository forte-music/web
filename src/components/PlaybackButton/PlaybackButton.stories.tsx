import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from '../../utils/StatefulComponent';
import PlaybackButton from '.';
import * as styles from './PlaybackButton.stories.css';

storiesOf('PlaybackButton', module).add('interactive', () => (
  <StatefulComponent state={{ playing: true }}>
    {({ playing }, setState) => (
      <PlaybackButton
        containerClass={styles.container}
        playing={playing}
        onToggle={() => setState({ playing: !playing })}
      />
    )}
  </StatefulComponent>
));
