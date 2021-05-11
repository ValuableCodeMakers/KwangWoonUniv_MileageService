import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/Auth/LoginScreen';
import RegisterScreen from './components/Auth/RegisterScreen';
import AuthLoadingScreen from './components/Auth/AuthLoadingScreen';

import CreateProfileScreen from './components/NewRegister/CreateProfileScreen';
import CreatePhotoScreen from './components/NewRegister/CreatePhotoScreen';
import CreateWalletScreen from './components/NewRegister/CreateWalletScreen';

import store from './redux/store'; // redux store

const MainStack = createStackNavigator({
  Main: MainScreen, //MainScreen 등록
});

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

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

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
    setTimeout(() => SplashScreen.hide(), 800);
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
