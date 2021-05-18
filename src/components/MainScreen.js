import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';

import HomeTab from './AppTabNavigator/HomeTab';
import MapTab from './AppTabNavigator/MapTab';
import CameraTab from './AppTabNavigator/ScanTab';
import WalletTab from './AppTabNavigator/WalletTab';
import RankTab from './AppTabNavigator/RankTab';

import SendScreen from './AppTabNavigator/WalletTabSub/SendScreen.js';
import SendConfirmScreen from './AppTabNavigator/WalletTabSub/SendConfirmScreen.js';
import SendResultScreen from './AppTabNavigator/WalletTabSub/SendResultScreen.js';
import SendCamera from './AppTabNavigator/WalletTabSub/SendCamera.js';
import ReceiveScreen from './AppTabNavigator/WalletTabSub/ReceiveScreen.js';

import CustomDrawerNavigator from './CustomDrawerNavigator';
import ProfileScreen from './ProfileScreen';
import ChangeProfileScreen from './Changing/ChangeProfileScreen';

import {
  handleUserInfo,
  handleProfilePhoto,
  handleLoadingState,
} from '../redux/action';

import { Address } from './Modules/Url.js';
import { width, height } from './Modules/Dimensions.js';

async function fetchUserData(dispatch) {
  const userId = await fetchUserId();
  const [userPhoto, userWalletAddress] = await Promise.all([
    fetchUserPhoto(userId),
    fetchUserAddress(userId),
  ]);
  const userWalletBalance = await fetchUserBalance(userWalletAddress);

  await dispatch(
    handleUserInfo('UPDATE_info', {
      userId: userId,
      userWalletAddress: userWalletAddress,
      userBalance: userWalletBalance,
    }),
  );

  if (userPhoto) {
    // 프로필 사진이 있을때
    await dispatch(handleProfilePhoto('UPDATE_photo', userPhoto));
  } else {
    // 프로필 사진이 없을때
    await dispatch(
      handleProfilePhoto('UPDATE_photo', [
        {
          id: userId,
          filename: 'default',
          path: 'default',
        },
      ]),
    );
  }
  console.log('MainScreen: 정보 가져오기 완료');

  await dispatch(handleLoadingState('로딩완료', true));
  console.log('MainScreen: 로딩 완료');
}

async function fetchUserId() {
  const userData = await fetch(Address.url + '/routes/getUserId', {
    method: 'GET',
  });
  const parsed_userData = await userData.json();

  return parsed_userData.userId;
}

async function fetchUserPhoto(userId) {
  const userPhoto = await fetch(Address.url + '/routes/getPhoto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId }),
  });
  const parsed_UserPhoto = await userPhoto.json();

  return parsed_UserPhoto.photo;
}

async function fetchUserAddress(userId) {
  const userAddress = await fetch(Address.url + '/routes/getWalletAddress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId }),
  });
  const parsed_userAddress = await userAddress.json();

  return parsed_userAddress.userWalletAddress;
}

async function fetchUserBalance(userWalletAddress) {
  const userWalletBalance = await fetch(
    Address.url + '/routes/getTokenBalance',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: userWalletAddress,
      }),
    },
  );
  const parsed_userWalletBalance = await userWalletBalance.json();
  let balance = parsed_userWalletBalance.balance;
  balance = balance.substr(0, balance.length - 18); // decimal 제거
  return balance;
}

const MainScreen = (props) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginState);

  useEffect(() => {
    fetchUserData(dispatch);
  }, []);

  // 로그아웃시 Auth Screen으로
  useEffect(() => {
    if (!loginState.loginState) {
      props.navigation.navigate('Auth');
    }
  }, [loginState.loginState]);

  return <AppTabContainer></AppTabContainer>;
};

MainScreen.navigationOptions = () => ({
  headerShown: false,
});

export default MainScreen;

// 좌우 제스쳐 기능 이용을 위해 BottomTabNaviator 사용 X
const AppMainNavigator = createMaterialTopTabNavigator(
  {
    홈: {screen: HomeTab},
    지도: {screen: MapTab},
    스캔: {screen: CameraTab},
    지갑: {screen: WalletTab},
    랭킹: {screen: RankTab},
  },
  {
    bounces: true,
    animationEnabled: true,
    swipeEnabled: false,
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
      pressOpacity: 0.5,
    },
  },
);

// Side Menu
const AppDrawerNavigator = createDrawerNavigator(
  {
    AppMainNavigator, // 사이드 메뉴에 AppTabNavigator 담기
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
      SendCamera: SendCamera,
      Receive: ReceiveScreen,
      ChangeProfile: ChangeProfileScreen,
    },
    {
      initialRouteName: 'AppTabNavigator',
    },
  ),
);
