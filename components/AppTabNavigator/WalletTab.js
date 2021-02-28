import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Icon, Container, Card, CardItem, Row} from 'native-base';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomHeader from './CustomHeader';
import {useState} from 'react';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');

function bottomSection(activeBtn, historyState) {
  switch (activeBtn) {
    case 1: {
      return <View></View>;
    }
    case 2: {
      return historyState.map((data, index) => {
        return (
          <CardItem
            key={index}
            style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>{data[index].date}</Text>
            <Text>{data[index].detail}</Text>
            <Text>{data[index].amount} UMT</Text>
          </CardItem>
        );
      });
    }
  }
}

const WalletTab = (props) => {
  const reduxState = useSelector((state) => state);
  let userInfo = reduxState.userInfo;
  const [activeBtn, setActiveBtn] = useState({active: 2});
  const [historyState, setHistoryState] = useState([
    {'0': {date: '01-01', amount: '100', detail: '전송 받음'}},
    {'1': {date: '01-14', amount: '1000', detail: '도착 이벤트'}},
    {'2': {date: '01-21', amount: '10', detail: '도착 이벤트'}},
    {'3': {date: '01-28', amount: '100', detail: '학교 이벤트'}},
    {'4': {date: '02-03', amount: '1000', detail: '학교 이벤트'}},
    {'5': {date: '02-11', amount: '200', detail: '학교 이벤트'}},
    {'6': {date: '02-15', amount: '300', detail: '학교 이벤트'}},
    {'7': {date: '02-17', amount: '100', detail: '학교 이벤트'}},
    {'8': {date: '02-28', amount: '400', detail: '학교 이벤트'}},
  ]);

  useEffect(() => {
    console.log('지갑 총량 변화로 "내역" 업데이트');
  }, [userInfo.userBalance]);

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#fff'}
        iconColor={'black'}></CustomHeader>

      <Container style={styles.container}>
        <Card style={styles.mainContainer}>
          <View style={{alignItems: 'center'}}>
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
              style={{fontSize: 35, color: 'white', fontFamily: 'BMDOHYEON'}}>
              <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
              {userInfo.userBalance} 토큰
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.navigate('Send', userInfo.userWalletAddress);
              }}>
              <Icon
                name="exit-outline"
                style={{fontSize: 20, color: 'white'}}></Icon>
              <Text style={{fontSize: 15, color: 'white'}}>보내기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.receiveButton}
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.navigate(
                  'Receive',
                  userInfo.userWalletAddress,
                );
              }}>
              <Icon
                name="enter-outline"
                style={{fontSize: 20, color: 'white'}}></Icon>
              <Text style={{fontSize: 15, color: 'white'}}> 받기</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.subContainer}>
          <CardItem style={styles.detailButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveBtn(1);
              }}>
              <Text style={{fontSize: 15}}>바코드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setActiveBtn(2);
              }}>
              <Text style={{fontSize: 15}}>내역</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.detailContainer}>
            <ScrollView style={styles.detailScrollView}>
              {bottomSection(activeBtn, historyState)}
            </ScrollView>
          </CardItem>
        </Card>
      </Container>
    </Container>
  );
};

WalletTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-wallet-sharp" style={{color: tintColor}} />
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
    borderBottomWidth: 1,
  },
  detailContainer: {
    width: '100%',
    height: '85%',
  },
  detailScrollView: {
    width: '100%',
  },
});
