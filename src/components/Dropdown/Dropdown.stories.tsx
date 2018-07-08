import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Popper from './Popper';
import { Menu, Item, Divider, MoreItems } from './Menu';
import StatefulComponent from '../../utils/StatefulComponent';

storiesOf('Dropdown', module)
  .add('interactive', () => (
    <StatefulComponent state={{ isOpen: true }}>
      {({ isOpen }, setState) => (
        <Popper
          isOpen={isOpen}
          onOpenChanged={nowIsOpen => setState({ isOpen: nowIsOpen })}
        >
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
