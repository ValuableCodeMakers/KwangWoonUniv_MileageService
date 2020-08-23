import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Icon} from 'native-base';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import * as firebase from 'firebase';

import HomeTab from './AppTabNavigator/HomeTab';
import MapTab from './AppTabNavigator/MapTab';
import WalletTab from './AppTabNavigator/WalletTab';
import RankTab from './AppTabNavigator/RankTab';

export default class MainScreen extends Component {
  state = {
    email: '',
    displayName: '',
  };

  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    this.setState({email, displayName});
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return <AppTabContainer></AppTabContainer>;
  }
}

// 좌우 제스쳐 기능 이용을 위해 BottomTabNaviator 사용 X
const AppTabNavigator = createMaterialTopTabNavigator(
  {
    홈: {screen: HomeTab},
    지도: {screen: MapTab},
    결제: {screen: WalletTab},
    랭킹: {screen: RankTab},
  },
  {
    bounces: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      labelStyle: {fontSize: 12},
      style: {
        borderTopWidth: 1,
        height: 75,
        ...Platform.select({
          ios: {
            backgroundColor: 'white',
          },
          android: {backgroundColor: '#353b48'},
        }),
      },

      iconStyle: {height: 30, width: 30},
      activeTintColor: '#b33939',
      inactiveTintColor: 'white',
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
    },
  },
);
const AppTabContainer = createAppContainer(AppTabNavigator);

//
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
