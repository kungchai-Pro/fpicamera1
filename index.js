/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import HomeScreen from './src/HomeScreen'
import CamerasScreen from './src/component/Cameras'
import {name as appName} from './app.json';
import {StackNavigator} from 'react-navigation';

/*
const App = StackNavigator(
    {
        Home: {
            screen: HomeScreen
          },  
          Cameras: {
            screen: CamerasScreen
          }
    },
    {
      initialRouteName: "Home"
    }
  );
*/
AppRegistry.registerComponent(appName, () => App);
