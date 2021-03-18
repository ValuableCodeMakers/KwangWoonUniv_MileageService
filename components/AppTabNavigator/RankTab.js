import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
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
import basicImage from '../../src/profile/profile1.png'; // 기본 이미지
import { handleProfilePhoto, handleUserInfo } from '../../redux/action';

var { width, height } = Dimensions.get('window');
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
}

function setRankingId(str) {
  let ranking = new Array();
  let balance = new Array();

  ranking = str.split(":[{")[1].split("}]}")[0].split("},{");
  balance = str.split(":[{")[1].split("}]}")[0].split("},{");

  for (var i = 0; i < ranking.length; i++) {
    ranking[i] = ranking[i].split(",")[0].split(":")[1];
  }
  for (var i = 0; i < balance.length; i++) {
    balance[i] = balance[i].split(",")[1].split(":")[1];
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
};

function setRankingPhoto(str) {
  let ranking = new Array();
  let rankingId = new Array();
  let rankingPhoto = new Array();

  str = str.split("[{")[1].split("}]")[0];
  ranking = str.split("},{");
  for (let i = 0; i < ranking.length; i++) {
    rankingId.push(ranking[i].split(":")[1].split(",")[0]);
    rankingPhoto.push(ranking[i].split(":")[2].split("\"")[1]);
  }

  for (let i = 0; i < ranking.length; i++) {
    if (rankers.rank1.id == rankingId[i]) {
      rankers.rank1.filename = rankingPhoto[i];
      rankers.rank1.photoState = true;
    }
    else if (rankers.rank2.id == rankingId[i]) {
      rankers.rank2.filename = rankingPhoto[i];
      rankers.rank2.photoState = true;
    }
    else if (rankers.rank3.id == rankingId[i]) {
      rankers.rank3.filename = rankingPhoto[i];
      rankers.rank3.photoState = true;
    }
    else if (rankers.rank4.id == rankingId[i]) {
      rankers.rank4.filename = rankingPhoto[i];
      rankers.rank4.photoState = true;
    }
    else if (rankers.rank5.id == rankingId[i]) {
      rankers.rank5.filename = rankingPhoto[i];
      rankers.rank5.photoState = true;
    }
    else if (rankers.rank6.id == rankingId[i]) {
      rankers.rank6.filename = rankingPhoto[i];
      rankers.rank6.photoState = true;
    }
    else if (rankers.rank7.id == rankingId[i]) {
      rankers.rank7.filename = rankingPhoto[i];
      rankers.rank7.photoState = true;
    }
    else if (rankers.rank8.id == rankingId[i]) {
      rankers.rank8.filename = rankingPhoto[i];
      rankers.rank8.photoState = true;
    }
    else if (rankers.rank9.id == rankingId[i]) {
      rankers.rank9.filename = rankingPhoto[i];
      rankers.rank9.photoState = true;
    }
    else if (rankers.rank10.id == rankingId[i]) {
      rankers.rank10.filename = rankingPhoto[i];
      rankers.rank10.photoState = true;
    }
  }
}

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

//사람들 사진 개별로 가져오기
function getPhotoFile() {
  if (rankers.rank1.id == "") {
    return 'default';
  }
  fetch('http://192.168.0.5:3000/routes/getPhotos', {
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
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.photos) {
      setRankingPhoto(JSON.stringify(res.photos));
    }
    else {
      return 'default';
    }
  })
}


function _onRefresh() {
  // 랭킹 갱신하기
  fetch('http://192.168.0.5:3000/routes/getUsersRank', {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setRankingId(JSON.stringify(res));
    });

  // 탑5 랭커 사진 갱신
  getPhotoFile();;
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
    rankers.rank10
  ];

  // userInfo 가 들어오면 프로필 사진 가져오기
  useEffect(() => {
    console.log('프로필 사진 가져오기 요청');

    fetch('http://192.168.0.5:3000/routes/getPhoto', {
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
    fetch('http://192.168.0.5:3000/routes/getUsersRank', {
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
      <Header style={{ backgroundColor: '#c0392b', height: height * 0.1 }}>
        <Left>
          <Icon
            name="person"
            style={{ paddingLeft: 10, color: '#fff' }}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </Left>
        <Right>
          <Icon
            name="menu"
            onPress={() => props.navigation.toggleDrawer()}
            style={{ paddingRight: 10, color: '#fff' }}
          />
        </Right>
      </Header>
      <Container style={styles.mainContainer}>
        <Card style={styles.textContainer}>
          <Text
            style={{ fontWeight: 'bold', fontSize: 25, fontFamily: 'BMDOHYEON' }}>
            오늘의 랭킹 🏆
          </Text>
          <Text>{getWeekend()}</Text>
          <View style={styles.userInfoContainer}>
            {userPhoto.filename != 'default' ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                }}></Thumbnail>
            ) : (
              <Thumbnail circular={true} large source={basicImage}></Thumbnail>
            )}
            <Text style={{ fontWeight: 'bold' }}>유저 ID: {userInfo.userId}</Text>
          </View>
        </Card>
        <Card style={styles.rankContainer}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ justifyContent: 'center' }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={_onRefresh}
              />
            }>
            <Fragment>
              {rankerList.map((ranker, index) => (
                <View style={
                  {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    padding: 10, backgroundColor: (ranker.id == userInfo.userId) ? '#e6749d' : '#fff'
                  }}>
                  {index == 0 ? (
                    <Text style={{ fontSize: 30 }}>🥇</Text>
                  ) : (
                    <Fragment></Fragment>
                  )}
                  {index == 1 ? (
                    <Text style={{ fontSize: 30 }}>🥈</Text>
                  ) : (
                    <Fragment></Fragment>
                  )}
                  {index == 2 ? (
                    <Text style={{ fontSize: 30 }}>🥉</Text>
                  ) : (
                    <Fragment></Fragment>
                  )}
                  {index > 2 ? (
                    <Text style={{ fontSize: 30 }}>     </Text>
                  ) : (
                    <Fragment></Fragment>
                  )}

                  {ranker.photoState ? (
                    <Thumbnail
                      circular={true}
                      small
                      source={{
                        uri: `http://192.168.0.5:3000/${ranker.filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail circular={true} small source={basicImage}></Thumbnail>
                  )}
                  <Text style={{ fontWeight: 'bold' }}>유저 ID: {ranker.id}</Text>
                  <Right><Text style={{ fontWeight: 'bold' }}>{ranker.balance} UMT</Text></Right>
                </View>
              ))}
            </Fragment>
          </ScrollView>
        </Card>
      </Container>
    </Container >
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
    height: '100%',
    backgroundColor: '#c0392b',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '30%',
    borderRadius: 10,
    marginTop: '5%',
    padding: 10,
    elevation: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
  rankContainer: {
    alignItems: 'flex-start',
    width: '90%',
    height: '65%',
    borderRadius: 10
  },
  userRankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
});
