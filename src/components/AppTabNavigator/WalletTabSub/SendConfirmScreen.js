import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Card, Button, Content} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import {handleUserInfo} from '../../../redux/action';
import {Address} from '../../Modules/Url.js';
import {width, height} from '../../Modules/Dimensions.js';

async function fetchTokenTransfer(sendState) {
  const data = await fetch(Address.url + '/routes/transferToken', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(sendState),
  });
  const parsedData = await data.json();

  console.log('트랜잭션 hash: ', parsedData.txhash);
  const confirmData = {
    to: sendState.to,
    value: sendState.value,
    txHash: parsedData.txhash,
  };
  return confirmData;
}

async function fetchSpecification(detail, amount) {
  await fetch(Address.url + '/routes/saveSpecification', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({date: new Date(), amount: amount, detail: detail}),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

async function handleTransfer(sendState, userBalance, dispatch, props) {
  console.log('토큰 전송 메소드');
  const confirmData = await fetchTokenTransfer(sendState);
  await fetchSpecification('토큰 전송', -sendState.value); // 내역 저장

  // 잔액 업데이트
  const updatedBalance = userBalance - sendState.value;
  await dispatch(
    handleUserInfo('UPDATE_balacne', updatedBalance), // 잔액 업데이트
  );
  props.navigation.navigate('SendResult', confirmData);
}

const SendConfirmScreen = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const transferData = props.navigation.state.params;
  const sendState = useState({
    id: userInfo.userId,
    from: userInfo.userWalletAddress,
    to: transferData.toAddress,
    value: transferData.transferToken,
  });

  let toAddress = (toAddress = sendState[0].to.substr(0, 10)); // 상대방 주소

  return (
    <Container style={styles.container}>
      <Card style={styles.mainContainer}>
        <Content contentContainerStyle={{flex: 1}}>
          <View>
            <View style={styles.confirmContainer}>
              <Text style={{fontSize: 15}}>{toAddress}... 에게</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {sendState[0].value} UMT
              </Text>
              <Text style={{fontSize: 15}}>토큰을 보낼까요?</Text>
            </View>
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
            onPress={() => props.navigation.goBack()}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
              취소
            </Text>
          </Button>
          <Button
            iconLeft
            style={styles.nextButton}
            onPress={() =>
              handleTransfer(
                sendState[0],
                userInfo.userBalance,
                dispatch,
                props,
              )
            }
            danger>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
              전송
            </Text>
          </Button>
        </View>
      </Card>
    </Container>
  );
};

SendConfirmScreen.navigationOptions = () => ({
  title: '',
  headerTitleAlign: 'center',
});

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
