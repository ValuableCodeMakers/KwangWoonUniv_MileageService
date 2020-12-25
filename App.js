import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';

import CreateProfileScreen from './components/CreateProfileScreen';
import CreateWalletScreen from './components/CreateWalletScreen';

const AppStack = createStackNavigator({
  Main: MainScreen, //MainScreen 등록
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const NewRegisterStack = createStackNavigator(
  {
    Setting: CreateProfileScreen,
    CreateWallet: CreateWalletScreen,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      NewRegister: NewRegisterStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

const styles = StyleSheet.create({});
