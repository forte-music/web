import React from 'react';
import styled from '../../styled-components';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import { PlaybackArtworkContainer } from './index';
import { AlbumArtwork } from '../AlbumArtwork';

import store from '../../redux/store';

storiesOf('PlaybackArtworkContainer', module).add(
  'slowly loading after ',
  () => (
    <Provider store={store}>
      <SizedArtwork>
        <PlaybackArtworkContainer
          getTracks={async () => {
            await after(10000);

            return [];
          }}
          checkPlayingFrom={() => false}
          handlesBackgroundInteraction
        >
          <AlbumArtwork />
        </PlaybackArtworkContainer>
      </SizedArtwork>
    </Provider>
  )
);

const SizedArtwork = styled.div`
  width: ${props => props.theme.artworkSize};
`;

const after = (timeMs: number) =>
  new Promise(resolve => setTimeout(resolve, timeMs));
