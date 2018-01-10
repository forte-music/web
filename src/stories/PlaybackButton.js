import React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from './StatefulComponent';
import PlaybackButton from '../components/PlaybackButton';
import styles from './PlaybackButton.css';

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
