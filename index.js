/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { AppMain } from "./AppMain";
import { Logger } from "./src/logger/Logger";

Logger.log("index.js", "starting app..");

AppRegistry.registerComponent(appName, () => AppMain);
