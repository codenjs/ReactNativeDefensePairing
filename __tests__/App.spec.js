/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Fix errors that get logged after test execution
// https://github.com/facebook/jest/issues/4359#issuecomment-413238977
jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<App />);
});
