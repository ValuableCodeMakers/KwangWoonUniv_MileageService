import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Button,
  Item,
  Label,
  Content,
  Textarea,
  Footer,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

class SendScreen extends Component {
  static navigationOptions = {
    title: '토큰전송',
    headerTitleAlign: 'center',
  };

  render() {
    return (
      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <Content>
            <View style={styles.formContainer}>
              <Item regular>
                <Textarea
                  placeholder="상대방의 주소를 입력해주세요."
                  placeholderTextColor="#BBB"
                  backgroundColor="#f5f6fa"
                  width="100%"></Textarea>
              </Item>
              <Item regular>
                <Textarea
                  placeholder="보내는 금액을 입력해주세요."
                  placeholderTextColor="#BBB"
                  backgroundColor="#f5f6fa"
                  width="100%"></Textarea>
              </Item>
            </View>
            <View style={styles.cautionText}>
              <Text style={{fontSize: 12}}>
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
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
                취소
              </Text>
            </Button>
            <Button iconLeft style={styles.nextButton} danger>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
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
  formContainer: {
    marginTop: 20,
    width: width * 0.8,
  },
  cautionText: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection:'row',
    padding:20
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
