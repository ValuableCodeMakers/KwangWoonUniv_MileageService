import React, {Fragment, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  Icon,
  Container,
  Header,
  Left,
  Right,
  Thumbnail,
  Card,
} from 'native-base';
import {useSelector,useDispatch} from 'react-redux';
import basicImage from '../../src/profile/profile1.png'; // 기본 이미지
import {handleProfilePhoto} from '../../redux/action';

var {width, height} = Dimensions.get('window');

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
  const userPhoto = reduxState.userProfilePhoto

  // userInfo 가 들어오면 프로필 사진 가져오기
  useEffect(() => {
    console.log('프로필 사진 가져오기 요청');
    fetch('http://192.168.0.5:3000/routes/getPhoto', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userInfo.userId}),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(handleProfilePhoto('UPDATE_photo', res.photo));
      });
  }, [userInfo.userId]);

  // useEffect(() => {
  //   fetch('http://192.168.0.5:3000/routes/getUsersRank', {
  //     method: 'GET',
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => console.log(res));
  // }, []);

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
        <Card style={styles.textContainer}>
          <Text
            style={{fontWeight: 'bold', fontSize: 25, fontFamily: 'BMDOHYEON'}}>
            오늘의 랭킹 🏆
          </Text>
          <Text>{getWeekend()}</Text>
          <View style={styles.userInfoContainer}>
            {userPhoto.filename != '' ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                }}></Thumbnail>
            ) : (
              <Thumbnail circular={true} large source={basicImage}></Thumbnail>
            )}
            <Text style={{fontWeight: 'bold'}}>유저 ID: {userInfo.userId}</Text>
          </View>
        </Card>
        <Card style={styles.rankContainer}>
          <ScrollView style={{width: '100%'}}>
            {userPhoto.filename != '' ? (
              <Fragment>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥇</Text>
                  <Thumbnail
                    circular={true}
                    source={{
                      uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                    }}></Thumbnail>
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥈</Text>

                  <Thumbnail
                    circular={true}
                    source={{
                      uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                    }}></Thumbnail>

                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥉</Text>

                  <Thumbnail
                    circular={true}
                    source={{
                      uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                    }}></Thumbnail>
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Thumbnail
                    circular={true}
                    source={{
                      uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                    }}></Thumbnail>
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Thumbnail
                    circular={true}
                    source={{
                      uri: `http://192.168.0.5:3000/${userPhoto.filename}`,
                    }}></Thumbnail>
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </ScrollView>
        </Card>
      </Container>
    </Container>
  );
};

RankTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-bar-chart" style={{color: tintColor}} />
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
    alignItems: 'center',
    width: '100%',
    height: '65%',
  },
  userRankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
});
