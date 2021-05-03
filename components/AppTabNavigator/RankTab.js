import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Icon, Container, Right, Thumbnail} from 'native-base';
import {useSelector} from 'react-redux';

import CustomHeader from '../CustomHeader';

import {Address} from '../Modules/Url.js';
import {width, height} from '../Modules/Dimensions.js';
import basicImage from '../../src/profile/profile.png'; // 기본 이미지

async function fetchUserRankdAndPhoto(setRankers) {
  const userRankData = await fetchUsersRank();
  const newState = await fetchUsersPhoto(userRankData);
  await setRankers(newState);
}

async function fetchUsersRank() {
  const getResponse = await fetch(Address.url + '/routes/getUsersRank', {
    method: 'GET',
  });
  const getJson = await getResponse.json();
  return await parseUsersRank(JSON.stringify(getJson));
}

function parseUsersRank(str) {
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

  let rankers = {};
  for (let i = 0; i < 10; i++) {
    rankers[i] = {id: ranking[i], balance: balance[i]};
  }
  return rankers;
}

//사람들 사진 개별로 가져오기
async function fetchUsersPhoto(rankers) {
  const postResponse = await fetch(Address.url + '/routes/getPhotos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user1: rankers[0].id,
      user2: rankers[1].id,
      user3: rankers[2].id,
      user4: rankers[3].id,
      user5: rankers[4].id,
      user6: rankers[5].id,
      user7: rankers[6].id,
      user8: rankers[7].id,
      user9: rankers[8].id,
      user10: rankers[9].id,
    }),
  });
  const postJson = await postResponse.json();

  if (postJson) {
    return await parseUsersPhoto(JSON.stringify(postJson), rankers);
  } else {
    return 'default';
  }
}

function parseUsersPhoto(str, rankers) {
  let ranking = new Array();
  let rankingId = new Array();
  let rankingPhoto = new Array();

  str = str.split('[{')[1].split('}]')[0];
  ranking = str.split('},{');
  for (let i = 0; i < ranking.length; i++) {
    rankingId.push(ranking[i].split(':')[1].split(',')[0]);
    rankingPhoto.push(ranking[i].split(':')[2].split('"')[1]);
  }

  let newState = {};
  for (let key in rankers) {
    const id = rankers[key].id;
    const balance = rankers[key].balance;

    let filename = '';
    for (let i = 0; i < 10; i++) {
      if (rankingPhoto[i].includes(id)) {
        filename = rankingPhoto[i];
      }
    }

    newState[parseInt(key) + 1] = {
      id: id,
      balance: balance,
      filename: filename,
      photoState: true,
    };
  }

  return newState;
}

// 랭킹 갱신하기
function _onRefresh(setRankers) {
  fetchUserRankdAndPhoto(setRankers);
}

// 요일 알기
const getWeekend = () => {
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
};

const RankTab = (props) => {
  const userInfo = useSelector((state) => state.userInfo);
  const userPhoto = useSelector((state) => state.userProfilePhoto);

  const [rankers, setRankers] = useState(null);
  const rankersKey = [4, 5, 6, 7, 8, 9, 10];

  // 유저들 랭크 가져오기
  useEffect(() => {
    console.log('RankTab: 현재 유저들 랭크 가져오기 요청');

    fetchUserRankdAndPhoto(setRankers);
  }, []);

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
              fontFamily: 'BMDOHYEON',
              fontSize: 25,
              color: '#fff',
            }}>
            오늘의 랭킹 🏆
          </Text>
        </View>

        <View style={styles.upperContainer}>
          <Text style={{fontFamily: 'BMDOHYEON', fontSize: 20}}>
            {getWeekend()}
          </Text>
          <View style={styles.userInfoContainer}>
            {userPhoto.filename != 'default' ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: Address.url + `/${userPhoto.filename}`,
                }}></Thumbnail>
            ) : (
              <Thumbnail circular={true} large source={basicImage}></Thumbnail>
            )}
            <Text
              style={{fontFamily: 'BMDOHYEON', fontSize: 20, marginLeft: 20}}>
              {userInfo.userId}
            </Text>
          </View>
        </View>

        {rankers === null ? (
          <Fragment></Fragment>
        ) : (
          <Fragment>
            <View style={styles.middleContainer}>
              <View style={{alignItems: 'center', width: '30%'}}>
                <View style={{marginBottom: 10}}>
                  <Text style={{fontSize: 30}}>🥈</Text>
                </View>
                {rankers[2].photoState ? (
                  <Thumbnail
                    circular={true}
                    source={{
                      uri: Address.url + `/${rankers[2].filename}`,
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
                    style={{width: 75, height: 75}}
                    source={basicImage}></Thumbnail>
                )}
                <View
                  style={{
                    marginTop: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>
                    {rankers[2].id}
                  </Text>
                  <Text style={{fontFamily: 'BMDOHYEON', fontSize: 15}}>
                    {rankers[2].balance} UMT
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'center', width: '40%'}}>
                <View style={{marginBottom: 10}}>
                  <Text style={{fontSize: 35}}>🥇</Text>
                </View>
                {rankers[1].photoState ? (
                  <Thumbnail
                    circular={true}
                    large
                    source={{
                      uri: Address.url + `/${rankers[1].filename}`,
                    }}
                    style={{width: 90, height: 90}}></Thumbnail>
                ) : (
                  <Thumbnail
                    circular={true}
                    large
                    source={basicImage}
                    style={{width: 90, height: 90}}></Thumbnail>
                )}
                <View style={{marginTop: 3}}>
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>
                    {rankers[1].id}
                  </Text>
                  <Text style={{fontFamily: 'BMDOHYEON', fontSize: 15}}>
                    {rankers[1].balance} UMT
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'center', width: '30%'}}>
                <View style={{marginBottom: 10}}>
                  <Text style={{fontSize: 30}}>🥉</Text>
                </View>
                {rankers[3].photoState ? (
                  <Thumbnail
                    circular={true}
                    large
                    source={{
                      uri: Address.url + `/${rankers[3].filename}`,
                    }}
                    style={{width: 75, height: 75}}></Thumbnail>
                ) : (
                  <Thumbnail
                    circular={true}
                    large
                    source={basicImage}
                    style={{width: 75, height: 75}}></Thumbnail>
                )}
                <View style={{marginTop: 3}}>
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>
                    {rankers[3].id}
                  </Text>
                  <Text style={{fontFamily: 'BMDOHYEON', fontSize: 15}}>
                    {rankers[3].balance} UMT
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.lowerContainer}>
              <ScrollView
                style={{width: '100%'}}
                contentContainerStyle={{justifyContent: 'center'}}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => _onRefresh(setRankers)}
                  />
                }>
                <Fragment>
                  {rankersKey.map((key) => {
                    return (
                      <View
                        style={{
                          ...styles.rankContainer,
                          backgroundColor:
                            rankers[key].id == userInfo.userId
                              ? '#c0392b'
                              : '#fff',
                        }}
                        key={key}>
                        <View style={{width: '8%', marginHorizontal: 10}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {key}
                          </Text>
                        </View>
                        {rankers[key].photoState ? (
                          <Thumbnail
                            circular={true}
                            small
                            source={{
                              uri: Address.url + `/${rankers[key].filename}`,
                            }}></Thumbnail>
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
                          {rankers[key].id}
                        </Text>
                        <Right>
                          <Text style={{fontFamily: 'BMDOHYEON', fontSize: 15}}>
                            {rankers[key].balance} UMT
                          </Text>
                        </Right>
                      </View>
                    );
                  })}
                </Fragment>
              </ScrollView>
            </View>
          </Fragment>
        )}
      </Container>
    </Container>
  );
};

RankTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon type="MaterialIcons" name="insert-chart" style={{color: tintColor}} />
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
});
