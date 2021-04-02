import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Card } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

class RegisterScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    id: '',
    password: '',
    passwordCheck: '',
    errorMessage: null,
  };

  // 회원가입
  handleSignUp = () => {
    const userPwd = this.state.password;
    const userPwdCheck = this.state.passwordCheck;

    if (userPwd === userPwdCheck) {
      fetch('http://172.30.1.42:3000/routes/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      }).then((res) => {
        console.log(res);
      });
    } else {
      this.setState({
        ...this.state,
        errorMessage: '비밀번호가 다릅니다.',
      });
    }

    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Fragment>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: height * 0.1,
                width: width,
                marginVertical: 25,
              }}>
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Icon name="arrow-back" color="white" size={40}></Icon>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 35,
                  fontFamily: 'BMDOHYEON',
                  color: 'white',
                }}>
                Sign Up
              </Text>
              <View></View>
            </View>
            <Card style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Univ. ID"
                autoCapitalize="none"
                onChangeText={(id) => this.setState({ id })}
                value={this.state.id}></TextInput>

              <TextInput
                secureTextEntry={true}
                placeholder="PASSWORD"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}></TextInput>

              <TextInput
                secureTextEntry={true}
                placeholder="PASSWORD CONFRIM"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
                value={this.state.passwordCheck}></TextInput>

              <TouchableOpacity
                style={styles.button}
                onPress={this.handleSignUp}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{ fontSize: 15, justifyContent: 'flex-end' }}>
                  회원이신가요? 로그인
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
}

{
}
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
    height: height * 0.8,
    borderTopLeftRadius: 80,
    backgroundColor: '#fff',
    padding: 50,
  },
  textInput: {
    height: 50,
    width: width * 0.8,
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 0.1,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: width * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 60,
    backgroundColor: '#c0392b',
    borderRadius: 10,
    borderTopRightRadius: 0,
    elevation: 3,
  },
  back: {
    position: 'absolute',
    left: 30,
  },
});

export default RegisterScreen;
