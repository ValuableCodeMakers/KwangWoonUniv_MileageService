import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as firebase from 'firebase';
import Animated from 'react-native-reanimated';
import {TopGestureHandler} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const {Value, event, block, cond, eq, set} = Animated;

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([cond(eq(state, State.END), set(this.buttonOpacity,0))]),
      },
    ]);
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
      // <View style={styles.container}>
      //   <StatusBar barStyle="light-content"></StatusBar>
      //   <Text style={styles.greeting}>{`로그인하고 시작해보세요`}</Text>

      //   <View style={styles.errorMessage}>
      //     {this.state.errorMessage && (
      //       <Text style={styles.error}>{this.state.errorMessage}</Text>
      //     )}
      //   </View>

      //   <View style={styles.form}>
      //     <View>
      //       <Text style={styles.inputTitle}>Email Address</Text>
      //       <TextInput
      //         style={styles.input}
      //         autoCapitalize="none"
      //         onChangeText={(email) => this.setState({email})}
      //         value={this.state.email}></TextInput>
      //     </View>

      //     <View style={{marginTop: 30}}>
      //       <Text style={styles.inputTitle}>Password</Text>
      //       <TextInput
      //         secureTextEntry={true}
      //         style={styles.input}
      //         autoCapitalize="none"
      //         onChangeText={(password) => this.setState({password})}
      //         value={this.state.password}></TextInput>
      //     </View>

      //     <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
      //       <Text style={{color: '#ffffff', fontWeight: 'bold'}}>로그인</Text>
      //     </TouchableOpacity>

      //     <TouchableOpacity style={{alignSelf: 'center', marginTop: 30}}>
      //       <Text onPress={() => this.props.navigation.navigate('Register')}>
      //         계정이 없으신가요? 회원가입
      //       </Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
        <View style={{...StyleSheet.absoluteFill}}>
          <Image
            source={require('../src/login.png')}
            style={{flex: 1, height: null, width: null}}></Image>
        </View>

        <View style={{height: height / 3, backgroundColor: 'white'}}>
          <View style={styles.button}>
            <TopGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{...styles.button, opacity: this.buttonOpacity}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그인</Text>
              </Animated.View>
            </TopGestureHandler>
          </View>
          <View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>회원가입</Text>
          </View>
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
    marginTop: 10,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7f8c8d',
    borderRadius: 35,
    height: 70,
  },
});

export default LoginScreen;
