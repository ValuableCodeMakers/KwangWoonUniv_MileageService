import React, {Component, Fragment, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  Icon,
  Container,
  Card,
  CardItem,
  Tab,
  Tabs,
  TabHeading,
  DefaultTabBar,
} from 'native-base';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';

import CustomHeader from '../CustomHeader';
import {Address} from '../Modules/Url.js';
import {width, height} from '../Modules/Dimensions.js';

async function fetchSpecification(setHistoryState) {
  const getResponse = await fetch(Address.url + '/routes/getSpecification', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  const jsonResponse = await getResponse.json();
  await setHistoryState(jsonResponse);
}

// Native base, Tab 오류때문에 사용
const renderTabBar = (props) => {
  props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
};

const WalletTab = (props) => {
  const [historyState, setHistoryState] = useState([]);
  const loadState = useSelector((state) => state.loadState);
  const userInfoState = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (loadState.loadState) {
      fetchSpecification(setHistoryState);
    }
  }, [loadState.loadState]);

  // 현재 잔액 변화로 내역 확인하기
  useEffect(() => {
    fetchSpecification(setHistoryState);
  }, [userInfoState.userBalance]);

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#fff'}
        iconColor={'black'}></CustomHeader>

      <Container style={styles.mainContainer}>
        <View style={styles.upperContainer}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                marginBottom: 5,
                fontFamily: 'BMDOHYEON',
              }}>
              현재 잔액
            </Text>
            <Text
              style={{fontSize: 35, color: 'white', fontFamily: 'BMDOHYEON'}}>
              <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
              {userInfoState.userBalance} 토큰
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.navigate(
                  'Send',
                  userInfoState.userWalletAddress,
                );
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
                  userInfoState.userWalletAddress,
                );
              }}>
              <Icon
                name="enter-outline"
                style={{fontSize: 20, color: 'white'}}></Icon>
              <Text style={{fontSize: 15, color: 'white'}}> 받기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowerContainer}>
          {loadState.loadState ? (
            <Tabs renderTabBar={renderTabBar}>
              <Tab
                heading={
                  <TabHeading style={{backgroundColor: '#c0392b'}}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'BMDOHYEON',
                      }}>
                      바코드 💳
                    </Text>
                  </TabHeading>
                }>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <QRCode
                    value={userInfoState.userWalletAddress}
                    size={200}></QRCode>
                </View>
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{backgroundColor: '#c0392b'}}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'BMDOHYEON',
                      }}>
                      내역 🧾
                    </Text>
                  </TabHeading>
                }>
                <ScrollView style={styles.detailScrollView}>
                  {historyState.map((data, index) => {
                    return (
                      <CardItem
                        key={index}
                        style={{flexDirection: 'row', width: '98%'}}>
                        <View style={{width: '20%', marginLeft: 0}}>
                          <Text style={{fontSize: 16}}>
                            {data[index].date.split('-')[1]}.
                            {data[index].date.split('-')[2]}
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text>{data[index].detail}</Text>
                        </View>
                        <View style={{width: '30%'}}>
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
                  })}
                </ScrollView>
              </Tab>
            </Tabs>
          ) : (
            <Fragment></Fragment>
          )}
        </View>
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
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  upperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: height * 0.23,
    marginVertical: height * 0.05,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#c0392b',
    elevation: 20,
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
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    width: width * 0.85,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    elevation: 6,
  },
  detailScrollView: {
    width: '99%',
    height: '85%',
  },
});
