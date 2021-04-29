import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {useDispatch} from 'react-redux';

import HomeTab from './AppTabNavigator/HomeTab';
import MapTab from './AppTabNavigator/MapTab';
import CameraTab from './AppTabNavigator/ScanTab';
import WalletTab from './AppTabNavigator/WalletTab';
import RankTab from './AppTabNavigator/RankTab';

import SendScreen from './AppTabNavigator/WalletTabSub/SendScreen.js';
import SendConfirmScreen from './AppTabNavigator/WalletTabSub/SendConfirmScreen.js';
import SendResultScreen from './AppTabNavigator/WalletTabSub/SendResultScreen.js';
import ReceiveScreen from './AppTabNavigator/WalletTabSub/ReceiveScreen.js';

import CustomDrawerNavigator from './CustomDrawerNavigator';
import ProfileScreen from './ProfileScreen';
import ChangeProfileScreen from './Changing/ChangeProfileScreen';

import {handleUserInfo, handleLoadingState} from '../redux/action';

import {Address} from './Modules/Url.js';
import {width, height} from './Modules/Dimensions.js';

const MainScreen = () => {
  var userState = {userId: '', userWalletAddress: '', userWalletBalance: 'N/A'};
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('MainScreen: 기본 정보 불러오기');
    fetch(Address.url + '/routes/getUserId', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        userState.userId = res.userId;
        dispatch(handleUserInfo('UPDATE_id', userState.userId));
        console.log('MainScreen: id 불러오기 성공');
      })
      .then(() => {
        fetch(Address.url + '/routes/getWalletAddress', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId: userState.userId}),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            userState.userWalletAddress = res.userWalletAddress;
            dispatch(
              handleUserInfo('UPDATE_address', userState.userWalletAddress),
            );
            console.log('MainScreen: address 불러오기 성공');
          })
          .then(() => {
            fetch(Address.url + '/routes/getTokenBalance', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
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
                userState.userWalletBalance = balance;
              })
              .then(() => {
                dispatch(
                  handleUserInfo('UPDATE_balacne', userState.userWalletBalance),
                );
                console.log('MainScreen: 지갑 용량 불러오기 성공');

                dispatch(handleLoadingState('로딩완료', true));
                console.log('MainScreen: 로딩 완료');
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

// 아래부터 Navigation Tab
// 좌우 제스쳐 기능 이용을 위해 BottomTabNaviator 사용 X
const AppMainNavigator = createMaterialTopTabNavigator(
  {
    홈: {screen: HomeTab},
    지도: {screen: MapTab},
    스캔: {screen: CameraTab},
    결제: {screen: WalletTab},
    랭킹: {screen: RankTab},
  },
  {
    bounces: true,
    animationEnabled: true,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      labelStyle: {fontSize: 12},
      style: {
        height: height * 0.1,
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
      indicatorStyle: {backgroundColor: '#fff'},
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
      Receive: ReceiveScreen,
      ChangeProfile: ChangeProfileScreen,
    },
    {
      initialRouteName: 'AppTabNavigator',
    },
  ),
);
