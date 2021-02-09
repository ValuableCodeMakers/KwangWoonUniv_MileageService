import React, {Component, Fragment} from 'react';
import {useState, useEffect} from 'react';
import {
  Card,
  CardItem,
  Icon,
  Right,
  Header,
  Left,
  Container,
  Button,
} from 'native-base';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CountDown from 'react-native-countdown-component';

import {handleBuildingEvent, handleHoldingEvent} from '../../redux/action';

const {width, height} = Dimensions.get('window');

handleGetEventToken = (address) => {
  console.log('이벤트 토큰 전송 메소드');
  fetch('http://192.168.0.5:3000/routes/getEventToken', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({to: address}),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('이벤트 토큰 hash', data.txhash);
    });
};

const HomeTab = (props) => {
  const reduxState = useSelector((state) => state); // redux의 store 가져오기
  const dispatch = useDispatch();

  // 유저 정보
  const userInfoState = reduxState.userInfo;

  // 건물 이벤트 상태
  const buildingState = reduxState.buildingEvent.events;
  //console.log(JSON.stringify(buildingState));

  // 위치 이벤트 상태
  const holdingState = reduxState.holdingEvent;

  const event_locationIn = () => {
    if (holdingState.state) {
      //console.log('위치 이벤트 카드 불러오기');
      //console.log(JSON.stringify(holdingState));

      return (
        <Card style={styles.currentEvent}>
          <CardItem
            style={{
              height: 120,
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Text style={{fontSize: 18}}>
              <Text style={{fontWeight: 'bold'}}>'학교에서 있기'</Text> 이벤트가
              진행중입니다.😊
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 18,fontWeight:'bold'}}>남은 시간 </Text>
              <CountDown
                until={60 * 45} // 45분 60 * 45
                size={20}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator={true}
                digitStyle={{backgroundColor: '#ecf0f1'}}
                onFinish={() => {
                  alert(
                    `'학교에서 있기' 이벤트가 종료되었습니다.\n\곧 토큰이 지급됩니다!`,
                  );
                  //handleGetEventToken(userInfoState.userWalletAddress) // 이벤트 토큰 지급

                  dispatch(handleHoldingEvent('학교도착, 이벤트 중단')); // dispatch 에 false 전달
                }}
                onPress={() => {
                  alert('이벤트 설명');
                }}></CountDown>
            </View>
          </CardItem>
        </Card>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };

  return (
    <Container>
      <Header style={{backgroundColor: '#c0392b', height: height * 0.1}}>
        <Left>
          <Icon
            name="person"
            style={{paddingLeft: 10, color: '#fff'}}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </Left>
        <Right>
          <Icon
            name="menu"
            onPress={() => props.navigation.toggleDrawer()}
            style={{paddingRight: 10, color: '#fff'}}
          />
        </Right>
      </Header>

      <Container style={styles.mainContainer}>
        <View style={styles.currentBalanceContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 15, color: 'white',fontFamily:'BMDOHYEON',marginBottom:5}}>현재 잔액</Text>
            <Text style={{fontSize: 35, color: 'white',fontFamily:'BMDOHYEON'}}>
              <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
              {userInfoState.userBalance} 토큰
            </Text>
          </View>
        </View>

        <Card style={styles.eventContainer}>
          <Text style={styles.eventText}>이벤트 현황</Text>
          <ScrollView style={styles.eventScrollView}>
            {event_locationIn()}
            {buildingState.map((data) =>
              data.state ? (
                <Card style={styles.currentEvent} key={data.id}>
                  <CardItem style={{height: 120}}>
                    <Text style={{fontSize: 18}}>
                      {data.id} 이벤트 완료! 😊
                    </Text>
                    <Button
                      onPress={() => {
                        alert(data.id + ' 방문 이벤트 완료!');
                        //handleGetEventToken(userInfoState.userWalletAddress) // 이벤트 토큰 지급

                        dispatch(
                          handleBuildingEvent('방문 코인 수령, 이벤트 중단'),
                        ); // dispatch 에 false 전달
                      }}>
                      <Text>수령!</Text>
                    </Button>
                  </CardItem>
                </Card>
              ) : (
                <Fragment key={data.id}></Fragment>
              ),
            )}
          </ScrollView>
        </Card>
      </Container>
    </Container>
  );
};

HomeTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" style={{color: tintColor}} />
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
    position: 'absolute',
    alignItems: 'center',
    height: '30%',
    marginTop: '10%',
  },
  eventContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width * 0.98,
    height: height * 0.65,
    marginTop: '35%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
  },
  eventText: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 0,
    fontFamily:'BMDOHYEON'
  },
  eventScrollView: {
    marginTop: 5,
    marginBottom: 10,
  },
  currentEvent: {
    width: width * 0.95,
    position: 'relative',
  },
});
