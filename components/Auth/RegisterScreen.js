import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Address} from '../../Modules/Url.js';
import {width, height} from '../../Modules/Dimensions.js';

import {AuthCustomModal} from '../CustomModal';

const handleSignUp = (props, registerInfo, setModalVisible) => {
  const userPwd = registerInfo.password;
  const userPwdCheck = registerInfo.passwordCheck;

  if (userPwd === userPwdCheck) {
    fetch(Address.url + '/routes/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state),
    }).then((res) => {
      console.log(res);
      props.navigation.navigate('Login');
    });
  } else {
    setModalVisible(true);
  }
};

const RegisterScreen = (props) => {
  const [registerInfo, setRegisterInfo] = useState({
    id: '',
    password: '',
    passwordCheck: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <AuthCustomModal
        mode={'Register'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}></AuthCustomModal>

      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => props.navigation.navigate('Login')}>
              <Icon name="arrow-back" color="white" size={40}></Icon>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 35,
                fontFamily: 'BMDOHYEON',
                color: 'white',
              }}>
              Sign Up
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Univ. ID"
              autoCapitalize="none"
              onChangeText={(id) => setRegisterInfo({...registerInfo, id: id})}
              value={registerInfo.id}></TextInput>

            <TextInput
              secureTextEntry={true}
              placeholder="PASSWORD"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(password) =>
                setRegisterInfo({...registerInfo, password: password})
              }
              value={registerInfo.password}></TextInput>

            <TextInput
              secureTextEntry={true}
              placeholder="PASSWORD CONFRIM"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(passwordCheck) =>
                setRegisterInfo({...registerInfo, passwordCheck: passwordCheck})
              }
              value={registerInfo.passwordCheck}></TextInput>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                handleSignUp(props, registerInfo, setModalVisible)
              }>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'BMDOHYEON',
                  color: 'white',
                }}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={{fontSize: 15}}>회원이신가요? 로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

RegisterScreen.navigationOptions = () => ({
  headerShown: false,
});

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#c0392b',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: height * 0.25,
    width: width,
    marginVertical: 25,
  },
  textInputContainer: {
    alignItems: 'center',
    width: width,
    height: height * 0.75,
    borderTopLeftRadius: 80,
    backgroundColor: '#fff',
    padding: 50,
  },
  textInput: {
    width: width * 0.8,
    height: 50,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  registerButton: {
    width: width * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 60,
    backgroundColor: '#c0392b',
    borderRadius: 10,
    borderTopRightRadius: 0,
    elevation: 5,
  },
  back: {
    position: 'absolute',
    left: 30,
  },
});

export default RegisterScreen;
