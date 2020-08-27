import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import * as firebase from 'firebase';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

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
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.backGroundY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-1, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
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
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.backGroundY}],
          }}>
          <Image
            source={require('../src/login.png')}
            style={{flex: 1, height: null, width: null}}></Image>
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center'}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그인</Text>
            </Animated.View>
          </TapGestureHandler>

          <Animated.View
            style={{
              opacity: this.buttonOpacity,
              transform: [{translateY: this.buttonY}],
            }}>
            <View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>회원가입</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{translateY: this.textInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{rotate: concat(this.rotateCross, 'deg')}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput
              style={styles.textInput}
              placeholder="EMAIL"
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}></TextInput>

            <TextInput
              style={styles.textInput}
              placeholder="PASSWORD"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}></TextInput>

            <Animated.View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>로그인</Text>
            </Animated.View>
          </Animated.View>
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
  closeButton: {
    zIndex:1,
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    elevation: 3,
  },
  button: {
    marginHorizontal: 25,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 35,
    height: 70,
    elevation: 3,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 25,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'black',
  },
});

export default LoginScreen;
