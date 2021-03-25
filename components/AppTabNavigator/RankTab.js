import React, { Fragment, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Icon,
  Container,
  Header,
  Left,
  Right,
  Thumbnail,
  Card,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import basicImage from '../../src/profile/profile.png'; // 기본 이미지
import { handleProfilePhoto, handleUserInfo } from '../../redux/action';

import CustomHeader from './CustomHeader';

const { width, height } = Dimensions.get('window');
var rankers = {
  rank1: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank2: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank3: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank4: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank5: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank6: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank7: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank8: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank9: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
  rank10: {
    id: '',
    filename: basicImage,
    balance: '0',
    photoState: false,
  },
};

function setRankingId(str) {
  let ranking = new Array();
  let balance = new Array();

  ranking = str.split(':[{')[1].split('}]}')[0].split('},{');
  balance = str.split(':[{')[1].split('}]}')[0].split('},{');

  for (var i = 0; i < ranking.length; i++) {
    ranking[i] = ranking[i].split(',')[0].split(':')[1];
  }
  for (var i = 0; i < balance.length; i++) {
    balance[i] = balance[i].split(',')[1].split(':')[1];
  }

  rankers.rank1.id = ranking[0];
  rankers.rank2.id = ranking[1];
  rankers.rank3.id = ranking[2];
  rankers.rank4.id = ranking[3];
  rankers.rank5.id = ranking[4];
  rankers.rank6.id = ranking[5];
  rankers.rank7.id = ranking[6];
  rankers.rank8.id = ranking[7];
  rankers.rank9.id = ranking[8];
  rankers.rank10.id = ranking[9];
  rankers.rank1.balance = balance[0];
  rankers.rank2.balance = balance[1];
  rankers.rank3.balance = balance[2];
  rankers.rank4.balance = balance[3];
  rankers.rank5.balance = balance[4];
  rankers.rank6.balance = balance[5];
  rankers.rank7.balance = balance[6];
  rankers.rank8.balance = balance[7];
  rankers.rank9.balance = balance[8];
  rankers.rank10.balance = balance[9];
}

function setRankingPhoto(str) {
  let ranking = new Array();
  let rankingId = new Array();
  let rankingPhoto = new Array();

  str = str.split('[{')[1].split('}]')[0];
  ranking = str.split('},{');
  for (let i = 0; i < ranking.length; i++) {
    rankingId.push(ranking[i].split(':')[1].split(',')[0]);
    rankingPhoto.push(ranking[i].split(':')[2].split('"')[1]);
  }

  for (let i = 0; i < ranking.length; i++) {
    if (rankers.rank1.id == rankingId[i]) {
      rankers.rank1.filename = rankingPhoto[i];
      rankers.rank1.photoState = true;
    } else if (rankers.rank2.id == rankingId[i]) {
      rankers.rank2.filename = rankingPhoto[i];
      rankers.rank2.photoState = true;
    } else if (rankers.rank3.id == rankingId[i]) {
      rankers.rank3.filename = rankingPhoto[i];
      rankers.rank3.photoState = true;
    } else if (rankers.rank4.id == rankingId[i]) {
      rankers.rank4.filename = rankingPhoto[i];
      rankers.rank4.photoState = true;
    } else if (rankers.rank5.id == rankingId[i]) {
      rankers.rank5.filename = rankingPhoto[i];
      rankers.rank5.photoState = true;
    } else if (rankers.rank6.id == rankingId[i]) {
      rankers.rank6.filename = rankingPhoto[i];
      rankers.rank6.photoState = true;
    } else if (rankers.rank7.id == rankingId[i]) {
      rankers.rank7.filename = rankingPhoto[i];
      rankers.rank7.photoState = true;
    } else if (rankers.rank8.id == rankingId[i]) {
      rankers.rank8.filename = rankingPhoto[i];
      rankers.rank8.photoState = true;
    } else if (rankers.rank9.id == rankingId[i]) {
      rankers.rank9.filename = rankingPhoto[i];
      rankers.rank9.photoState = true;
    } else if (rankers.rank10.id == rankingId[i]) {
      rankers.rank10.filename = rankingPhoto[i];
      rankers.rank10.photoState = true;
    }
  }
}

//사람들 사진 개별로 가져오기
function getPhotoFile() {
  if (rankers.rank1.id == '') {
    return 'default';
  }
  fetch('http://192.168.0.4:3000/routes/getPhotos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user1: rankers.rank1.id,
      user2: rankers.rank2.id,
      user3: rankers.rank3.id,
      user4: rankers.rank4.id,
      user5: rankers.rank5.id,
      user6: rankers.rank6.id,
      user7: rankers.rank7.id,
      user8: rankers.rank8.id,
      user9: rankers.rank9.id,
      user10: rankers.rank10.id,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.photos) {
        setRankingPhoto(JSON.stringify(res.photos));
      } else {
        return 'default';
      }
    });
}

function _onRefresh() {
  // 랭킹 갱신하기
  fetch('http://192.168.0.4:3000/routes/getUsersRank', {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setRankingId(JSON.stringify(res));
    });

  // 탑5 랭커 사진 갱신
  getPhotoFile();
}

// 요일 알기
function getWeekend() {
  let week = new Array(
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  );

  let today = new Date().getDay();
  let weekend = week[today];

  return weekend;
}

const RankTab = (props) => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const userInfo = reduxState.userInfo;
  const userPhoto = reduxState.userProfilePhoto;
  const rankerList = [
    rankers.rank1,
    rankers.rank2,
    rankers.rank3,
    rankers.rank4,
    rankers.rank5,
    rankers.rank6,
    rankers.rank7,
    rankers.rank8,
    rankers.rank9,
    rankers.rank10,
  ];

  // userInfo 가 들어오면 프로필 사진 가져오기
  useEffect(() => {
    console.log('프로필 사진 가져오기 요청');

    fetch('http://192.168.0.4:3000/routes/getPhoto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userInfo.userId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.photo) {
          // 프로필 사진이 없을때
          dispatch(
            handleProfilePhoto('UPDATE_photo', [
              {
                id: userInfo.userId,
                filename: 'default',
                path: 'default',
              },
            ]),
          );
        } else {
          // 프로필 사진이 있을때
          dispatch(handleProfilePhoto('UPDATE_photo', res.photo));
        }
      });
  }, [userInfo.userId]);

  // 유저 랭크 가져오기
  useEffect(() => {
    console.log('유저 랭크 가져오기 요청');

    fetch('http://192.168.0.4:3000/routes/getUsersRank', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRankingId(JSON.stringify(res));
      });
  }, [userInfo.userId]);

  // 탑5 랭커 사진파일 가져오기
  useEffect(() => {
    getPhotoFile();
  }, [rankers.rank5.id]);

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#c0392b'}
        iconColor={'#fff'}></CustomHeader>

      <Container style={styles.mainContainer}>
        {/* 배경 색 */}
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#c0392b',
            width: '100%',
            height: height * 0.2,
            top: 0,
            left: 0,
          }}></View>

        <View style={styles.textContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: '#fff',
              fontFamily: 'BMDOHYEON',
            }}>
            오늘의 랭킹 🏆
          </Text>
        </View>

        <View style={styles.upperContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{getWeekend()}</Text>
          <View style={styles.userInfoContainer}>
            {userPhoto.filename != 'default' ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.4:3000/${userPhoto.filename}`,
                }}></Thumbnail>
            ) : (
              <Thumbnail circular={true} large source={basicImage}></Thumbnail>
            )}
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
              {userInfo.userId}
            </Text>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <View style={{ alignItems: 'center', width: '30%' }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 30 }}>🥈</Text>
            </View>
            {rankers.rank2.photoState ? (
              <Thumbnail
                circular={true}
                source={{
                  uri: `http://192.168.0.4:3000/${rankers.rank2.filename}`,
                }}
                large
                style={{
                  width: 75,
                  height: 75,
                }}></Thumbnail>
            ) : (
              <Thumbnail
                circular={true}
                large
                style={{ width: 75, height: 75 }}
                source={basicImage}></Thumbnail>
            )}
            <View style={{ marginTop: 3, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 13, }}>
                {rankers.rank2.id}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {rankers.rank2.balance} UMT
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', width: '40%' }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 35 }}>🥇</Text>
            </View>
            {rankers.rank1.photoState ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.4:3000/${rankers.rank1.filename}`,
                }}
                style={{ width: 90, height: 90 }}></Thumbnail>
            ) : (
              <Thumbnail
                circular={true}
                large
                source={basicImage}
                style={{ width: 90, height: 90 }}></Thumbnail>
            )}
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                {rankers.rank1.id}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {rankers.rank1.balance} UMT
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', width: '30%' }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 30 }}>🥉</Text>
            </View>
            {rankers.rank3.photoState ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.4:3000/${rankers.rank3.filename}`,
                }}
                style={{ width: 75, height: 75 }}></Thumbnail>
            ) : (
              <Thumbnail
                circular={true}
                large
                source={basicImage}
                style={{ width: 75, height: 75 }}></Thumbnail>
            )}
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                {rankers.rank3.id}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {rankers.rank3.balance} UMT
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.lowerContainer}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ justifyContent: 'center' }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={_onRefresh} />
            }>
            <Fragment>
              {rankerList.map((ranker, index) =>
                index >= 3 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      padding: 10,
                      backgroundColor:
                        ranker.id == userInfo.userId ? '#c0392b' : '#fff',
                    }}>
                    <View style={{ width: '8%', marginHorizontal: 10 }}>
                      <Text style={{ fontSize: 20 }}>{index + 1}</Text>
                    </View>

                    {ranker.photoState ? (
                      <Thumbnail
                        circular={true}
                        small
                        source={{
                          uri: `http://192.168.0.4:3000/${ranker.filename}`,
                        }}
                        style={{ marginHorizontal: 20 }}></Thumbnail>
                    ) : (
                      <Thumbnail
                        circular={true}
                        small
                        source={basicImage}></Thumbnail>
                    )}
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 20,
                      }}>
                      {ranker.id}
                    </Text>
                    <Right>
                      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        {ranker.balance} UMT
                      </Text>
                    </Right>
                  </View>
                ) : (
                  <Fragment></Fragment>
                ),
              )}
            </Fragment>
          </ScrollView>
        </View>
      </Container>
    </Container>
  );
};

RankTab.navigationOptions = () => ({
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-bar-chart" style={{ color: tintColor }} />
  ),
});

export default RankTab;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  textContainer: {
    width: '80%',
    height: height * 0.06,
    alignItems: 'flex-start',
  },
  upperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: height * 0.18,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    height: height * 0.27,
  },
  lowerContainer: {
    width: '100%',
    height: height * 0.29,
    backgroundColor: '#fff',
  },
});
