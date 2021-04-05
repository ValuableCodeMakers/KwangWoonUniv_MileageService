import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Container,
  Card,
  Button,
  Item,
  Label,
  Textarea,
  Input,
  Icon,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { width, height } from '../../../Modules/Dimensions.js'

class SendScreen extends Component {
  static navigationOptions = {
    title: '토큰전송',
    headerTitleAlign: 'center',
  };

  constructor(props) {
    super(props);
    this.state = {
      toAddress: '',
      transferToken: 0,
    };
  }

  handleState = (data) => {
    this.setState({ toAddress: data.toAddress });
    console.log(this.state)
  };

  render() {
    return (
      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <View style={styles.addressForm}>
              <View style={styles.addressMenu}>
                <Text style={{ fontSize: 18 }}>상대 주소</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('QRcode', { handleState: this.handleState });
                  }}>
                  <Icon name="camera" style={{ fontSize: 22 }} />
                </TouchableOpacity>
              </View>
              <Textarea
                placeholder="상대방의 주소를 입력해주세요."
                value={this.state.toAddress}
                rowSpan={4}
                placeholderTextColor="#BBB"
                backgroundColor="#f5f6fa"
                width="100%"
                onChangeText={(toAddress) => {
                  this.setState({ toAddress });
                }}></Textarea>
            </View>
            <View style={styles.transferForm}>
              <Text style={{ fontSize: 18 }}>토큰 수량</Text>
              <Item floatingLabel>
                <Label>전송할 토큰 수량을 적어주세요.</Label>
                <Input
                  onChangeText={(transferToken) => {
                    this.setState({ transferToken });
                  }}
                />
                <Text>KWC</Text>
              </Item>
            </View>
          </View>
          <View style={styles.cautionTextContainer}>
            <Text style={{ fontSize: 12 }}>
              ! 상대방의 주소와 토큰의 양을 확인하세요.
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#c23616',
                marginTop: 2,
              }}>
              ! 블록체인 특성상 한번 보낸 토큰 전송은 취소가 불가능합니다.
            </Text>
          </View>
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
              onPress={() => {
                this.props.navigation.navigate('SendConfirm', this.state);
              }}
              danger>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
                다음
              </Text>
            </Button>
          </View>
        </Card>
      </Container>
    );
  }
}

export default SendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  formContainer: {
    marginBottom: 20,
    width: width * 0.8,
  },
  addressMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  addressForm: {},
  transferForm: {
    padding: 5,
    width: '100%',
    marginTop: 12,
  },
  cautionTextContainer: {
    alignItems: 'center',
    padding: 20,
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
