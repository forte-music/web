import React from 'react';
import styled from '../../styled-components';
import { storiesOf } from '@storybook/react';

import StatefulComponent from '../../utils/StatefulComponent';
import PlaybackButton from '.';

const containerClass = 'containerClass';

const PlaybackButtonContainer = styled.div`
  & .${containerClass} {
    width: 160px;
    height: 160px;
  }
`;

storiesOf('PlaybackButton', module).add('interactive', () => (
  <StatefulComponent state={{ playing: true }}>
    {({ playing }, setState) => (
      <PlaybackButtonContainer>
        <PlaybackButton
          containerClass={containerClass}
          playing={playing}
          onToggle={() => setState({ playing: !playing })}
        />
      </PlaybackButtonContainer>
    )}
  </StatefulComponent>
));
