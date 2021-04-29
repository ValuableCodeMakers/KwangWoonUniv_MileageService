import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Card} from 'native-base';

import {AuthCustomModal} from '../CustomModal';

import {Address} from '../Modules/Url.js';
import {width, height} from '../Modules/Dimensions.js';

const handleLogin = (props, userInfo, setModalVisible) => {
  fetch(Address.url + '/routes/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInfo),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('LoginScreen: 로그인 결과 ', res);

      if (res.result === false) {
        // 로그인 실패
        console.log('Login 실패');
        setModalVisible(true);
      } else if (res.result == 'NEW_REGISTER') {
        // 처음 회원 가입
        console.log('LoginScreen: 새로운 회원');

        props.navigation.navigate('NewRegister', {
          screen: 'CreateProfile',
        });
      } else {
        // 이미 회원
        console.log('LoginScreen: 이미 회원');

        props.navigation.navigate('Main', {
          screen: 'HomeTab',
        });
      }
    });
};

const LoginScreen = (props) => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <AuthCustomModal
        mode={'Login'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}></AuthCustomModal>

      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={{height: height * 0.4}}></View>
          <Card style={styles.textInputContainer}>
            <Text
              style={{
                fontSize: 35,
                fontFamily: 'BMDOHYEON',
                marginBottom: 30,
                marginVertical: 25,
              }}>
              Login
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Univ. ID"
              autoCapitalize="none"
              onChangeText={(id) => setUserInfo({...userInfo, id: id})}
              value={userInfo.id}></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="PASSWORD"
              secureTextEntry={true}
              onChangeText={(password) =>
                setUserInfo({...userInfo, password: password})
              }
              value={userInfo.password}></TextInput>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleLogin(props, userInfo, setModalVisible)}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BMDOHYEON',
                  color: 'white',
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Register')}>
              <Text
                style={{
                  fontSize: 15,
                }}>
                회원이 아니신가요? 회원가입
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

LoginScreen.navigationOptions = () => ({
  headerShown: false,
});

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#c0392b',
  },
  textInputContainer: {
    alignItems: 'center',
    width: width,
    height: height * 0.6,
    borderTopLeftRadius: 80,
    backgroundColor: '#fff',
  },
  inputTitle: {
    color: '#7f8c8d',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  textInput: {
    height: 50,
    width: width * 0.8,
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: width * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    backgroundColor: '#c0392b',
    borderRadius: 10,
    borderTopRightRadius: 0,
    elevation: 5,
  },
});

export default LoginScreen;
