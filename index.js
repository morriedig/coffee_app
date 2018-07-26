/** @format */

import {AppRegistry} from 'react-native';
import route from './src/config/route.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => route);
