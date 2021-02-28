import React, { Component, useState, useEffect } from 'react';
import { Platform, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import HomeTab from './AppTabNavigator/HomeTab';
import MapTab from './AppTabNavigator/MapTab';
import WalletTab from './AppTabNavigator/WalletTab';
import RankTab from './AppTabNavigator/RankTab';
import ProfileScreen from './ProfileScreen_new';
import SendScreen from './AppTabNavigator/Wallet/SendScreen';
import SendConfirmScreen from './AppTabNavigator/Wallet/SendConfirmScreen';
import SendResultScreen from './AppTabNavigator/Wallet/SendResultScreen';
import ReceiveScreen from './AppTabNavigator/Wallet/ReceiveScreen';
import CustomDrawerNavigator from './CustomDrawerNavigator';

import { handleUserInfo } from '../redux/action';

const { width, height } = Dimensions.get('window');

const MainScreen = (props) => {
  var userState = { userId: '', userWalletAddress: '', userBalance: 'N/A' };
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://172.30.1.7:3000/routes/getUserId', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        userState.userId = res.userId;
      })
      .then(() => {
        fetch('http://172.30.1.7:3000/routes/getWalletAddress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userState.userId }),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            userState.userWalletAddress = res.userWalletAddress;
          })
          .then(() => {
            fetch('http://172.30.1.7:3000/routes/getTokenBalance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                address: userState.userWalletAddress,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                let balance = res.balance;
                balance = balance.substr(0, balance.length - 18); // decimal 제거
                userState.userBalance = balance;
              })
              .then(() => { })
              .then(() => {
                dispatch(handleUserInfo('UPDATE_id', userState.userId));
                dispatch(
                  handleUserInfo('UPDATE_address', userState.userWalletAddress),
                );
                dispatch(
                  handleUserInfo('UPDATE_balacne', userState.userBalance),
                );
              });
          });
      });
  }, []);

  return <AppTabContainer></AppTabContainer>;
};

MainScreen.navigationOptions = () => ({
  headerShown: false,
});

export default MainScreen;

// 좌우 제스쳐 기능 이용을 위해 BottomTabNaviator 사용 X
const AppTabNavigator = createMaterialTopTabNavigator(
  {
    홈: { screen: HomeTab },
    지도: { screen: MapTab },
    결제: { screen: WalletTab },
    랭킹: { screen: RankTab },
  },
  {
    bounces: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      labelStyle: { fontSize: 12 },
      style: {
        height: height * 0.1,
        ...Platform.select({
          ios: {
            backgroundColor: '#ffffff',
          },
          android: { backgroundColor: '#ffffff' },
        }),
      },
      iconStyle: { height: 30, width: 30 },
      activeTintColor: '#b33939',
      inactiveTintColor: 'black',
      indicatorStyle: { backgroundColor: '#fff' },
      upperCaseLabel: false,
      showLabel: true,
      showIcon: true,
    },
  },
);

// Side Menu
const AppDrawerNavigator = createDrawerNavigator(
  {
    AppTabNavigator, // 사이드 메뉴에 AppTabNavigator 담기
  },
  {
    contentComponent: CustomDrawerNavigator,
    drawerPosition: 'right',
    drawerBackgroundColor: 'transparent',
    drawerWidth: width * 0.6,
  },
);

AppDrawerNavigator.navigationOptions = {
  headerShown: false,
};

const AppTabContainer = createAppContainer(
  createStackNavigator(
    {
      AppTabNavigator: AppDrawerNavigator,
      Profile: ProfileScreen,
      Send: SendScreen,
      SendConfirm: SendConfirmScreen,
      SendResult: SendResultScreen,
      Receive: ReceiveScreen,
    },
    {
      initialRouteName: 'AppTabNavigator',
    },
  ),
);
