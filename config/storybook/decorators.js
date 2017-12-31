import React from 'react';
import { addDecorator } from '@storybook/react';
import { background as backgroundClass } from './decorators.css';

addDecorator(story => <div className={backgroundClass}>{story()}</div>);
