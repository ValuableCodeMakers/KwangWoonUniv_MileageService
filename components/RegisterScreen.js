import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      fetch('http://172.30.1.48:3000/routes/register', {
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Icon name="arrow-undo-outline" size={32}></Icon>
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 60,
            width: '100%',
            alignItems: 'center',
          }}>
          <Text style={styles.greeting}>{`회원가입`}</Text>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>학번</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(id) => this.setState({ id })}
              value={this.state.id}></TextInput>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>비밀번호</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}></TextInput>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>비밀번호 확인</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
              value={this.state.passwordCheck}></TextInput>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 18 }}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#c0392b',
    fontSize: 15,
    textAlign: 'center',
  },
  form: {
    marginTop: 200,
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#7f8c8d',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#7f8c8d',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    height: 40,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c0392b',
    borderRadius: 35,
    height: 70,
    elevation: 10,
  },
  back: {
    position: 'absolute',
    top: 30,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
