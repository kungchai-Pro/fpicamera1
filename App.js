
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image ,Button,Alert} from 'react-native';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import HomeScreen from './src/HomeScreen';
import  CamerasScreen from './src/component/Cameras';
import potoSave from'./src/component/potoSave';
import Loadingpoto from './src/component/Loadingpoto'
 class App extends Component {

  render(){
    return(
      <View>
        <Text> hello word </Text>
        </View>
    )
  }
}


const AppStack = createStackNavigator(
  {
      Home: {
          screen: HomeScreen
        },  
        Cameras: {
          screen: CamerasScreen
        },
        Poto: {
          screen: potoSave
        },
        LoadingPt: {
          screen: Loadingpoto
        }
  },
  {
    initialRouteName: "Home"
  }
);

// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Profile: {screen: ProfileScreen},
// });

const Apps = createAppContainer(AppStack);
 
export default Apps;