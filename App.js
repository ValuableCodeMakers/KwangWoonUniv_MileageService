import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import MainScreen from './src/components/MainScreen.js';
import LoginScreen from './src/components/Auth/LoginScreen.js';
import RegisterScreen from './src/components/Auth/RegisterScreen.js';
import AuthLoadingScreen from './src/components/Auth/AuthLoadingScreen.js';

import CreateProfileScreen from './src/components/NewRegister/CreateProfileScreen.js';
import CreatePhotoScreen from './src/components/NewRegister/CreatePhotoScreen.js';
import CreateWalletScreen from './src/components/NewRegister/CreateWalletScreen.js';

import store from './src/redux/store.js'; // redux store

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

const MainStack = createSwitchNavigator({
  Main: MainScreen, //MainScreen 등록
  Auth: AuthStack,
});

const MainContainer = createAppContainer(
  createSwitchNavigator(
    {
      Main: MainStack,
      NewRegister: NewRegisterStack,
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen
    },
    {
      initialRouteName: 'AuthLoading',
      backBehavior: 'Auth',
    },
  ),
);



export default class App extends Component {
  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 600);
  }

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
