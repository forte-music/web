import Queue from '.';
import { populateQueue } from '../../utils/populateQueue';
import { Fixture } from '../../typings/fixture_types';
import { getStateAfter } from '../../redux/utils';

const fixtures: Array<Fixture<{}>> = [
  {
    component: Queue,
    name: '10 items',
    reduxState: getStateAfter(populateQueue(10)),
    url: '/',
    useTheme: true,
  },
  {
    component: Queue,
    name: '50 items',
    reduxState: getStateAfter(populateQueue(50)),
    url: '/',
    useTheme: true,
  },
  {
    component: Queue,
    name: '1000 items',
    reduxState: getStateAfter(populateQueue(1000)),
    url: '/',
    useTheme: true,
  },
];

export default fixtures;
