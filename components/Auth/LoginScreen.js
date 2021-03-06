import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Card} from 'native-base';
const {width, height} = Dimensions.get('window');

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();

    this.state = {
      id: '',
      password: '',
    };
  }

  handleLogin = () => {
    fetch('http://192.168.53.192:3000/routes/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('응답 결과 ', res);

        if (res.result == false) {
          // 로그인 실패
          Alert.alert(
            '회원 정보를 확인하세요.',
            [{text: '확인', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } else if (res.result == 'NEW_REGISTER') {
          // 처음 회원 가입
          console.log('새로운 회원');

          this.props.navigation.navigate('NewRegister', {
            screen: 'CreateProfile',
          });
        } else {
          // 이미 회원
          console.log('이미 회원');

          this.props.navigation.navigate('Main', {
            screen: 'HomeTab',
          });
        }
      });
  };

  render() {
    return (
      <Fragment>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.mainContainer}>
            <View style={{height: height * 0.4}}></View>
            <Card style={styles.textInputContainer}>
              <Text
                style={{
                  fontWeight: 'bold',
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
                onChangeText={(id) => this.setState({id})}
                value={this.state.id}></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="PASSWORD"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}></TextInput>

              <TouchableOpacity opacity={0.1} onPress={this.handleLogin}>
                <View style={styles.button}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{fontSize: 15, justifyContent: 'flex-end'}}>
                  회원이 아니신가요? 회원가입
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        </KeyboardAvoidingView>
        <Image
          source={require('../../src/login.png')}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: -1,
          }}></Image>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    elevation: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: width * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    backgroundColor: '#c0392b',
    borderRadius: 10,
    borderTopRightRadius: 0,
    elevation: 3,
  },
});

export default LoginScreen;
