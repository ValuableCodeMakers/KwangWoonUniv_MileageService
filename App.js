import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as firebase from 'firebase';

import MainScreen from './components/MainScreen.js'
import LoginScreen from './components/LoginScreen'
import LoadingScreen from './components/LoadingScreen'
import RegisterScreen from './components/RegisterScreen'
import HomeScreen from './components/HomeScreen'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyADMK7DApOA4hPA-Jn52PniAnWvWcte0x0",
  authDomain: "kwu-mileageservice.firebaseapp.com",
  databaseURL: "https://kwu-mileageservice.firebaseio.com",
  projectId: "kwu-mileageservice",
  storageBucket: "kwu-mileageservice.appspot.com",
  messagingSenderId: "459943620149",
  appId: "1:459943620149:web:06bebf36b7b1b29bc84b7c",
  measurementId: "G-R5CXST78DQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//
//
const AppStack = createStackNavigator({
  Main: MainScreen //MainScreen 등록
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  })
);



const styles = StyleSheet.create({});

