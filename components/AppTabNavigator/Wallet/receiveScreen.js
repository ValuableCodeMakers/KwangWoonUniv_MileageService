import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card, CardItem} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import QRCode from 'react-native-qrcode-svg';

let {width, height} = Dimensions.get('window');

class ReceiveScreen extends Component {
  state = {walletAddressURL: ''};
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Card style={styles.bacodeContainer}>
          <CardItem>
            <QRCode value="https://github.com/kyoung-jnn"></QRCode>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  mainContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: height * 0.25,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: '12%',
    backgroundColor: '#c0392b',
    elevation: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButton: {
    alignItems: 'center',
  },
  receiveButton: {
    alignItems: 'center',
  },
  bacodeContainer: {
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.5,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: 15,
    elevation: 10,
  },
  detailButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
});
