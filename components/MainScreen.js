import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeTab from './AppTabNavigator/HomeTab';
import MapTab from './AppTabNavigator/MapTab';
import WalletTab from './AppTabNavigator/WalletTab';
import RankTab from './AppTabNavigator/RankTab';
import ProfileScreen from './ProfileScreen';
import SendScreen from './AppTabNavigator/Wallet/SendScreen';
import ReceiveScreen from './AppTabNavigator/Wallet/ReceiveScreen';


export default class MainScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    userId: '',
    userWalletAddress: '',
    userBalance: '',
  };

  componentDidMount() {
    fetch('http://192.168.0.5:3000/routes/getUserId', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({userId: res.userId});
      })
      .then(() => {
        fetch('http://192.168.0.5:3000/routes/getWalletAddress', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            this.setState({userWalletAddress: res.userWalletAddress});
          })
          .then(() => {
            console.log('현재 MainScreen state', this.state);
          });
      });
  }

  handleBalance = (balance) => {
    this.setState({userBalance: balance});
  };

  render() {
    return (
      <AppTabContainer
        screenProps={{
          userId: this.state.userId,
          userWalletAddress: this.state.userWalletAddress,
          handleBalance: this.handleBalance
        }}></AppTabContainer>
    );
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
        borderTopWidth: 0.12,
        height: 70,

        ...Platform.select({
          ios: {
            backgroundColor: '#ffffff',
          },
          android: {backgroundColor: '#ffffff'},
        }),
      },

      iconStyle: {height: 30, width: 30},
      activeTintColor: '#b33939',
      inactiveTintColor: 'black',
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
    },
  },
);

AppTabNavigator.navigationOptions = {
  headerShown: false
}
const AppTabContainer = createAppContainer(
  createStackNavigator(
    {
      AppTabNavigator: AppTabNavigator, //MainScreen 등록
      Profile: ProfileScreen,
      Send: SendScreen,
      Receive: ReceiveScreen,
    },
    {
      initialRouteName: 'AppTabNavigator',
    },
  ),
);

//
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
