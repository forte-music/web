// @flow
import data from './test.toml';

it('should load toml as an object', () => {
  expect(data).toMatchSnapshot();
});
