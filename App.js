import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import * as firebase from 'firebase';

import MainScreen from './components/MainScreen.js';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import RegisterScreen from './components/RegisterScreen';

// Your web app's Firebase configuration

const AppStack = createStackNavigator({
  Main: MainScreen, //MainScreen 등록
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

const styles = StyleSheet.create({});
