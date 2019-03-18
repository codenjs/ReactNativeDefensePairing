/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// Ignore the warning until dependency on Async Storage can be removed
YellowBox.ignoreWarnings(['Async Storage has been extracted']);

AppRegistry.registerComponent(appName, () => App);
