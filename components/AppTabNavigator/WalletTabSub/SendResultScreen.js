import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Container, Card, Button } from 'native-base';

const {width, height} = Dimensions.get('window');

class SendConfirmScreen extends Component {
  static navigationOptions = {
    title: '',
    headerTitleAlign: 'center',
  };

  constructor(props) {
    super(props);
    const transferedData = this.props.navigation.state.params;
    this.state = {
      txHash: transferedData.txHash,
      to: transferedData.to,
      value: transferedData.value,
    };
  }
  render() {
    let txHash = this.state.txHash.substr(0, 10); // 상대방 주소
    let toAddress = this.state.to.substr(0, 10); // 상대방 주소

    return (
      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <View style={styles.completeText}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>토큰 전송이</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              완료되었습니다. 🤗
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <View style={styles.resultText}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                생성된 해쉬
              </Text>
            </View>
            <View style={styles.resultText}>
              <Text style={{fontSize: 15}}>{txHash} ...</Text>
            </View>
          </View>
          <View style={styles.resultContainer}>
            <View style={styles.resultText}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>받은 주소</Text>
            </View>
            <View style={styles.resultText}>
              <Text>{toAddress} ...</Text>
            </View>
          </View>
          <View style={styles.resultContainer}>
            <View style={styles.resultText}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>수량</Text>
            </View>
            <View style={styles.resultText}>
              <Text>{this.state.value} UMT</Text>
            </View>
          </View>
          <View style={styles.resultContainer}>
            <View style={styles.resultText}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>수수료</Text>
            </View>
            <View style={styles.resultText}>
              <Text></Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.nextButton}
              onPress={() => {
                this.props.navigation.navigate('AppTabNavigator');
              }}
              danger>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
                확인
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
  completeText: {
    alignItems: 'center',
    width: '100%',
    margin: 20
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 15,
    width: '90%',
    borderBottomWidth: 0.2,
    borderBottomColor: '#bdc3c7',
  },
  resultText: {
    justifyContent: 'flex-start',
    width: '50%',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  nextButton: {
    justifyContent: 'center',
    width: '70%',
  },
});
