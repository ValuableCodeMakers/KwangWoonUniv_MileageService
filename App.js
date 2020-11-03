import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';

import SettingScreen from './components/SettingScreen';
import CreateWalletScreen from './components/CreateWalletScreen';

const AppStack = createStackNavigator({
  Main: MainScreen, //MainScreen 등록
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

const newRegisterStack = createStackNavigator({
  Setting: SettingScreen,
  CreateWallet: CreateWalletScreen
});


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      NewRegister: newRegisterStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

const styles = StyleSheet.create({});
