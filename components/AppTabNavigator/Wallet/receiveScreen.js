import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Card, CardItem, Toast, Button, Icon } from 'native-base';

import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

class ReceiveScreen extends Component {
  static navigationOptions = {
    title: '토큰받기',
    headerTitleAlign: 'center',
  };

  render() {
    const qrValue = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Card style={styles.qrContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
            내 주소
          </Text>
          <CardItem>
            <QRCode value={qrValue} size={200}></QRCode>
          </CardItem>
          <CardItem>
            <Card style={styles.addressContainer}>
              <Text>{qrValue}</Text>
            </Card>
          </CardItem>
          <CardItem>
            <Button
              rounded
              iconLeft
              style={styles.copyButton}
              danger
              onPress={() =>
                Toast.show({
                  text: '주소가 복사되었습니다 😊',
                  textStyle: { textAlign: 'center' },
                })
              }>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>주소 복사</Text>
            </Button>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: height * 0.65,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 10,
  },
  addressContainer: {
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#f5f6fa'
  },
  copyButton: {
    width: 150,
    justifyContent: 'center',
  },
});
