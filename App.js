import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

import CreateProfileScreen from './components/CreateProfileScreen';
import CreatePhotoScreen from './components/CreatePhotoScreen';
import CreateWalletScreen from './components/CreateWalletScreen';

import store from './redux/store' // redux store

const MainStack = createStackNavigator({
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
    CreateProfile: CreateProfileScreen,
    CreatePhoto: CreatePhotoScreen,
    CreateWallet: CreateWalletScreen,
  },
  {
    initialRouteName: 'CreateProfile',
    headerMode: 'none',
  },
);

const MainContainer = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainStack,
      NewRegister: NewRegisterStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <MainContainer></MainContainer>
        </Root>
      </Provider>
    );
  }
}
