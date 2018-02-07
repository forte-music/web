import React from 'react';
import { storiesOf } from '@storybook/react';

import Popper from '../components/Dropdown/Popper';
import { Menu, Item, Divider, MoreItems } from '../components/Dropdown/Menu';
import StatefulComponent from './StatefulComponent';

storiesOf('Dropdown', module)
  .add('interactive', () => (
    <StatefulComponent state={{ isOpen: true }}>
      {({ isOpen }, setState) => (
        <Popper isOpen={isOpen} onOpenChanged={isOpen => setState({ isOpen })}>
          hello world!
        </Popper>
      )}
    </StatefulComponent>
  ))
  .add('menu', () => (
    <Menu>
      <Item>Play Next</Item>
      <Item>Add to Queue</Item>
      <Divider />
      <MoreItems>Add to Playlist</MoreItems>
    </Menu>
  ));
