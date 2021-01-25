import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  Container,
  Card,
  Button,
  Item,
  Label,
  Content,
  Textarea,
  Input,
  Icon,
} from 'native-base';

const { width, height } = Dimensions.get('window');

class SendConfirmScreen extends Component {
  static navigationOptions = {
    title: '',
    headerTitleAlign: 'center',
  };

  constructor(props) {
    super(props);

    const id = this.props.navigation.getScreenProps().userId;
    const address = this.props.navigation.getScreenProps().userWalletAddress;
    const transferData = this.props.navigation.state.params;

    this.state = {
      id : id,
      from: address,
      to: transferData.toAddress,
      value: transferData.transferToken,
    };
    console.log(this.state);
  }

  handleTransfer = () => {
    console.log('토큰 전송 메소드');
    fetch('http://192.168.0.5:3000/routes/transferToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('converting', data.txhash);

        const confirmData = {
          to: this.state.to,
          value: this.state.value,
          txHash: data.txhash,
        };

        this.props.navigation.navigate('SendResult', confirmData);
      });
  };

  render() {
    let toAddress = this.state.to.substr(0, 10); // 상대방 주소

    return (
      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View>
              <View style={styles.confirmContainer}>
                <Text style={{ fontSize: 15 }}>{toAddress}... 에게</Text>
                <Text style={{ fontSize: 30 }}>{this.state.value} KWC</Text>
                <Text style={{ fontSize: 15 }}>토큰을 보낼까요?</Text>
              </View>
            </View>
            <View style={styles.cautionText}>
              <Text style={{ fontSize: 12 }}>
                상대방의 주소와 토큰의 양을 확인하세요.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#c23616',
                  marginTop: 2,
                }}>
                블록체인 특성상 한번 보낸 토큰 전송은 취소가 불가능합니다.
              </Text>
            </View>
          </Content>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.cancelButton}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
                취소
              </Text>
            </Button>
            <Button
              iconLeft
              style={styles.nextButton}
              onPress={this.handleTransfer}
              danger>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
                전송
              </Text>
            </Button>
          </View>
        </Card>
      </Container>
    );
  }
}

export default SendConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
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
  confirmContainer: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cautionText: {
    marginTop: 20,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  cancelButton: {
    justifyContent: 'center',
    width: '30%',
    backgroundColor: '#2f3640',
  },
  nextButton: {
    justifyContent: 'center',
    width: '70%',
  },
});
