import React, { Fragment } from 'react';
import { Card, CardItem, Icon, Container, Spinner } from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';

import CustomHeader from './CustomHeader';
import { handleBuildingEvent, handleHoldingEvent } from '../../redux/action';

const { width, height } = Dimensions.get('window');

const handleGetEventToken = (address) => {
  console.log('이벤트 토큰 전송 메소드');
  fetch('http://192.168.0.5:3000/routes/getEventToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: address }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('이벤트 토큰 hash', data.txhash);
    });
};

const handleSaveSpecification = (detail, amount) => {
  fetch('http://192.168.0.5:3000/routes/saveSpecification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: new Date(), amount: amount, detail: detail }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

const HomeTab = (props) => {
  const dispatch = useDispatch();
  const loadState = useSelector((state) => state.loadState);

  // 유저 정보 State
  const userInfoState = useSelector((state) => state.userInfo);

  // 건물 이벤트 State
  const buildingState = useSelector((state) => state.buildingEvent.events);

  // 위치 이벤트 State
  const holdingState = useSelector((state) => state.holdingEvent);

  const event_LocationIn = () => {
    if (holdingState.state) {
      //console.log('위치 이벤트 카드 불러오기');

      return (
        <Card style={styles.currentEvent} key={'event_LocationIn'}>
          <CardItem
            style={{
              height: 120,
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Text style={{ fontSize: 18 }}>
              <Text style={{ fontWeight: 'bold' }}>'학교에서 있기'</Text> 이벤트가
              진행중입니다.😊
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 15,
              }}
              onPress={() => {
                alert('이벤트 설명');
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>남은 시간 </Text>
              <CountDown
                until={60 * 45} // 45분 60 * 45
                size={20}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator={true}
                digitStyle={{ backgroundColor: '#ecf0f1' }}
                onFinish={() => {
                  alert(
                    `'학교에서 있기' 이벤트가 종료되었습니다.\n\곧 토큰이 지급됩니다!`,
                  );
                  //handleGetEventToken(userInfoState.userWalletAddress) // 이벤트 토큰 지급
                  handleSaveSpecification('방문 이벤트', 500); // 내역 업데이트

                  // 이벤트 중단
                  dispatch(handleHoldingEvent('학교도착, 이벤트 중단'));
                }}></CountDown>
            </View>
          </CardItem>
        </Card>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };

  const event_BuildingIn = () => {
    return buildingState.map((data) =>
      data.state ? (
        <Card style={styles.currentEvent} key={data.id}>
          <CardItem
            style={{
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={data.id}>
            <Text style={{ fontSize: 20 }}>{data.id} 이벤트 완료! 😊</Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => {
                alert(data.id + ' 방문 이벤트 완료!');
                //handleGetEventToken(userInfoState.userWalletAddress) // 이벤트 토큰 지급
                handleSaveSpecification('방문 이벤트', 500); // 내역 업데이트

                // 이벤트 중단
                dispatch(handleBuildingEvent('방문 코인 수령, 이벤트 중단'));
              }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>수령</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      ) : (
        <Fragment></Fragment>
      ),
    );
  };

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#c0392b'}
        iconColor={'#fff'}></CustomHeader>

      <Container style={styles.mainContainer}>
        <View style={styles.currentBalanceContainer}>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontFamily: 'BMDOHYEON',
              marginBottom: 5,
            }}>
            현재 잔액
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="server-outline" style={{ color: 'white' }} />
            <Text> </Text>
            {loadState.loadState ? (
              <Text
                style={{ fontSize: 35, color: 'white', fontFamily: 'BMDOHYEON' }}>
                {' ' + userInfoState.userBalance}
              </Text>
            ) : (
              <Spinner color="white" style={{ height: 20 }}></Spinner>
            )}
            <Text
              style={{ fontSize: 35, color: 'white', fontFamily: 'BMDOHYEON' }}>
              {' '}
              토큰
            </Text>
          </View>
        </View>

        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>이벤트 현황</Text>
          {loadState.loadState ? (
            <ScrollView style={styles.eventScrollView}>
              <Fragment>{event_LocationIn()}</Fragment>
              <Fragment>{event_BuildingIn()}</Fragment>
            </ScrollView>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Spinner color="red" height="10"></Spinner>
            </View>
          )}
        </View>
      </Container>
    </Container>
  );
};

HomeTab.navigationOptions = () => ({
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-home" style={{ color: tintColor }} />
  ),
});

export default HomeTab;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#c0392b',
  },
  currentBalanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: height * 0.23,
  },
  eventContainer: {
    alignItems: 'center',
    width: width * 0.98,
    height: height * 0.6,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
  },
  eventText: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 0,
    fontFamily: 'BMDOHYEON',
  },
  eventScrollView: {
    marginTop: 5,
    marginBottom: 10,
  },
  currentEvent: {
    width: width * 0.95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '50%',
    marginLeft: 20,
    backgroundColor: '#ecf0f1',
    elevation: 6,
  },
});
