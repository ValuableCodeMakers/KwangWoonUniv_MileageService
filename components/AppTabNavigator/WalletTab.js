import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Icon, Container, Card, CardItem } from 'native-base';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';

import CustomHeader from './CustomHeader';
import { useState } from 'react';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

function bottomSection(activeBtn, address, historyState) {
  switch (activeBtn) {
    case 1: {
      return (
        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <QRCode value={address} size={200}></QRCode>
        </View>
      );
    }
    case 2: {
      if (historyState.length != 0) {
        console.log('내역 출력');
        return historyState.map((data, index) => {
          return (
            <CardItem key={index} style={{ flexDirection: 'row' }}>
              <View style={{ width: '20%', marginLeft: 0 }}>
                <Text style={{ fontSize: 16 }}>{data[index].date}</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text>{data[index].detail}</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'right',
                    fontFamily: 'BMDOHYEON',
                  }}>
                  {data[index].amount} UMT
                </Text>
              </View>
            </CardItem>
          );
        });
      }
    }
  }
}

const WalletTab = (props) => {
  const [activeBtn, setActiveBtn] = useState({ active: 2 });
  const [historyState, setHistoryState] = useState([]);
  const loadState = useSelector((state) => state.loadState);
  const userInfoState = useSelector((state) => state.userInfo);

  useEffect(() => {
    console.log('지갑 총량 변화로 "내역" 업데이트');
    fetch('http://192.168.0.3:3000/routes/getSpecification', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHistoryState(data);
      });
  }, [userInfoState.userBalance]);

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#fff'}
        iconColor={'black'}></CustomHeader>

      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontFamily: 'BMDOHYEON',
                marginBottom: 5,
              }}>
              현재 잔액
            </Text>
            <Text
              style={{ fontSize: 35, color: 'white', fontFamily: 'BMDOHYEON' }}>
              <Icon name="server-outline" style={{ color: 'white' }}></Icon>{' '}
              {userInfoState.userBalance} 토큰
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.navigate('Send', userInfoState.userWalletAddress);
              }}>
              <Icon
                name="exit-outline"
                style={{ fontSize: 20, color: 'white' }}></Icon>
              <Text style={{ fontSize: 15, color: 'white' }}>보내기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.receiveButton}
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.navigate(
                  'Receive',
                  userInfoState.userWalletAddress,
                );
              }}>
              <Icon
                name="enter-outline"
                style={{ fontSize: 20, color: 'white' }}></Icon>
              <Text style={{ fontSize: 15, color: 'white' }}> 받기</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.subContainer}>
          <CardItem style={styles.detailButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveBtn({ active: 1 });
              }}>
              <Text style={{ fontSize: 15 }}>바코드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveBtn({ active: 2 });
              }}>
              <Text style={{ fontSize: 15 }}>내역</Text>
            </TouchableOpacity>
          </CardItem>
          <ScrollView style={styles.detailScrollView}>
            {loadState ? (
              bottomSection(
                activeBtn.active,
                userInfoState.userWalletAddress,
                historyState,
              )
            ) : (
                <Fragment></Fragment>
              )}
          </ScrollView>
        </Card>
      </Container>
    </Container>
  );
};

WalletTab.navigationOptions = () => ({
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-wallet-sharp" style={{ color: tintColor }} />
  ),
});

export default WalletTab;

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
    marginTop: height * 0.05,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  subContainer: {
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.45,
    marginTop: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    elevation: 10,
  },
  detailButtonContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  detailScrollView: {
    height: '100%',
    width: '100%',
  },
});
