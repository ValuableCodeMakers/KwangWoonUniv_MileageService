import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, CardItem, Icon, Container, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';

import CustomHeader from '../CustomHeader';
import { EventCustomModal } from '../CustomModal';

import { handleBuildingEvent, handleHoldingEvent } from '../../redux/action';
import * as Progress from 'react-native-progress';
import { Address } from '../Modules/Url.js';
import { width, height } from '../Modules/Dimensions.js';

const fetchEventAction = async (userInfoState, type) => {
  console.log('이벤트 토큰 받기');
  await handleGetEventToken(userInfoState.userWalletAddress); // 이벤트 토큰 지급
  switch (type) {
    case 0:
      await handleSaveSpecification('학교 유지 이벤트', 500); // 내역 업데이트
      break;
    case 1:
      await handleSaveSpecification('방문 이벤트', 500); // 내역 업데이트
      break;
    case 2:
      await handleSaveSpecification('3회 방문 이벤트', 800); // 내역 업데이트
      break;
  }

};

const handleGetEventToken = (address) => {
  console.log('HomeTab: Fetch / 이벤트 토큰 전송 메소드');
  fetch(Address.url + '/routes/getEventToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: address }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('HomeTab: 이벤트 토큰 hash', data.txhash);
    });
};

const handleSaveSpecification = (detail, amount) => {
  fetch(Address.url + '/routes/saveSpecification', {
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

const handleSaveHistory = (amount, setModalVisible) => {
  fetch(Address.url + '/routes/saveHistory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: new Date(), amount: amount }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.saveHistory_result == true) setModalVisible(true);
    });
};

const handleGetVisitCount = (setbuildingVisitCount) => {
  console.log('HomeTab: Fetch / 건물 방문 횟수 가져오기');

  fetch(Address.url + '/routes/getBuildingVisitCount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.length === null) setbuildingVisitCount(0);
      if (res.length < 3) setbuildingVisitCount(res.length);
      else setbuildingVisitCount(res.length - 3);
    });
};

const HomeTab = (props) => {
  const [buildingVisitCount, setbuildingVisitCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const loadState = useSelector((state) => state.loadState);
  const userInfoState = useSelector((state) => state.userInfo);
  const buildingState = useSelector((state) => state.buildingEvent.events);
  const holdingState = useSelector((state) => state.holdingEvent);

  const today = new Date();

  // 건물 방문 횟수 가져오기
  useEffect(() => {
    if (loadState.loadState) {
      handleGetVisitCount(setbuildingVisitCount);
    }
  }, [loadState.loadState]);

  const event_LocationIn = (setModalVisible) => {
    if (holdingState.state) {
      return (
        <Card style={styles.currentEvent}>
          <CardItem
            style={{
              height: 120,
              width: '100%',
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
                  setModalVisible(true);
                  fetchEventAction(userInfoState, 0);

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

  const event_BuildingIn = (setModalVisible) => {
    return buildingState.map((data, index) =>
      data.state ? (
        <Card style={styles.currentEvent} key={index}>
          <CardItem
            style={{
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {data.id} 이벤트 완료! <Text style={{ fontSize: 30 }}>🎉</Text>
            </Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => {
                setModalVisible(true);
                if (buildingVisitCount === 0) {
                  setbuildingVisitCount(1);
                  fetchEventAction(userInfoState, 1);
                }
                else if (buildingVisitCount === 1) {
                  setbuildingVisitCount(2);
                  fetchEventAction(userInfoState, 1);
                }
                else if (buildingVisitCount === 2) {
                  setbuildingVisitCount(0);
                  fetchEventAction(userInfoState, 2);
                }


                handleSaveHistory(300); // History 업데이트 (3개 건물 방문 이벤트)

                // 이벤트 중단
                dispatch(handleBuildingEvent('방문 코인 수령, 이벤트 중단'));
              }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>수령</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      ) : (
        <Fragment key={index}></Fragment>
      ),
    );
  };
  const event_BuildingIn_Three = () => {
    return (
      <Card style={styles.currentEvent}>
        <CardItem
          style={{
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18 }}>
            {today.getMonth() + 1} 월 {today.getDate()} 일
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            {(buildingVisitCount === 3) ? (
              <Fragment>
                <Text style={{ fontWeight: 'bold' }}>건물 3회 방문 이벤트 </Text>
                <Text>완료!</Text>
                <Text style={{ fontSize: 23 }}>🏘</Text>
                {/*fetchEventAction(userInfoState, 2)*/}
              </Fragment>
            ) : (
              <Fragment>
                <Text style={{ fontWeight: 'bold' }}>건물 3회 방문 이벤트 </Text>
                <Text>진행중입니다.</Text>
                <Text style={{ fontSize: 23 }}>🏘</Text>
              </Fragment>
            )}
          </Text>
          <Progress.Bar
            progress={buildingVisitCount / 3}
            height={20}
            width={250}
            borderRadius={5}
            color="#c0392b"
          />
        </CardItem>
      </Card>
    );
  };

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#c0392b'}
        iconColor={'#fff'}></CustomHeader>

      <EventCustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}></EventCustomModal>

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
              <Fragment>{event_LocationIn(setModalVisible)}</Fragment>
              <Fragment>{event_BuildingIn_Three(setModalVisible)}</Fragment>
              <Fragment>{event_BuildingIn(setModalVisible)}</Fragment>
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
    flex: 1,
    alignItems: 'center',
    width: width * 0.98,
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
