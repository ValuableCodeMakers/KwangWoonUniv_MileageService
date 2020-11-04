import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, Textarea} from 'native-base';

const {width, height} = Dimensions.get('window');

export default class SettingScreen extends Component {
  state = {
    mnemonic: '',
    address: '',
  };

  componentDidMount() {
    fetch('http://192.168.0.5:3000/routes/createWallet', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("응답받음 ", res);

        this.setState({mnemonic: res.mnemonic,address: res.address}); // state에 mnemonic 저장

        console.log(this.state);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}></View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Create Wallet</Text>
          <Card style={styles.card}>
            <View style={{marginTop: 30}}>
              <Text style={styles.inputTitle}>니모닉 코드</Text>
              <View>
                <Textarea
                  style={styles.input}
                  rowSpan={5}
                  value={this.state.mnemonic}></Textarea>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.inputTitle}>지갑의 주소</Text>
              <Textarea
                  style={{...styles.input, height: 50,fontSize:13}}
                  rowSpan={5}
                  value={this.state.address}></Textarea>
            </View>
            <Text style={{marginTop:10}}>모든 니모닉, 주소는 서버에 저장됩니다.</Text>
          </Card>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('App')}>
            <Text style={{fontSize:20}}>완료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    position: 'relative',
  },
  card: {
    alignItems: 'center',
    height: height * 0.45,
  },
  inputContainer: {
    marginTop: height * 0.3,
    width: width / 1.1,
    position: 'absolute',
  },
  title: {
    marginLeft: 10,
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  inputTitle: {
    color: '#7f8c8d',
    marginBottom: 10,
    fontSize: 15,
    textTransform: 'uppercase',
  },
  input: {
    borderColor: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    fontSize: 15,
    height: 80,
    width: width / 1.2,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    height: 50,
    elevation: 20,
  },
  background: {
    marginTop: 0,
    height: height * 0.65,
    width: width,
    backgroundColor: '#c0392b',
    //position: "absolute"
  },
});
