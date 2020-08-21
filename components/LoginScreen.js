import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase';

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const {email, password} = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => this.setState({errorMessage: err.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.greeting}>{`로그인하고 시작해보세요`}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}></TextInput>
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}></TextInput>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center', marginTop: 30}}>
            <Text onPress={() => this.props.navigation.navigate('Register')}>
              계정이 없으신가요? 회원가입
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
    fontSize: 18,
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
    marginTop: 10,
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
    borderRadius: 4,
    height: 50,
  },
});

export default LoginScreen;
