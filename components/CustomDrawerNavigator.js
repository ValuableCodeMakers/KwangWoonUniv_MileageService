import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Address} from './Modules/Url.js';
import {height} from './Modules/Dimensions.js';
import {useSelector, useDispatch} from 'react-redux';

import {handleLoginState} from '../redux/action';

const logout = (props, dispatch) => {
  dispatch(handleLoginState('Logout'));

  fetch(Address.url + '/routes/logout', {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      props.navigation.closeDrawer();
      props.navigation.navigate('Auth');
    });
};

const CustomDrawerNavigator = (props) => {
  const reduxState = useSelector((state) => state); // redux의 store 가져오기
  const userInfoState = reduxState.userInfo;
  const userPhoto = reduxState.userProfilePhoto;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri: Address.url + `/${userPhoto.filename}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}></Image>
        <View style={styles.infoTextContainer}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 15, fontFamily: 'BMDOHYEON'}}>
              Univ. ID
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {userInfoState.userId}
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 15, fontFamily: 'BMDOHYEON'}}>
              보유 토큰
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {userInfoState.userBalance} UMT
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={{...styles.menuButton, marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('HomeTab');
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>홈</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>내정보</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              logout(props, dispatch);
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
          Team 벨코즈
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: 'white',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.3,
    width: '100%',
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    elevation: 5,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  menuContainer: {
    alignItems: 'center',
    height: height * 0.6,
  },
  menuButton: {
    width: '80%',
    height: '10%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  bottomTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.1,
    borderBottomLeftRadius: 40,
    backgroundColor: '#c0392b',
  },
});
