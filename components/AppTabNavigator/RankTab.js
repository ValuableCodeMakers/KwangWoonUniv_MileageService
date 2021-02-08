import React, {Fragment, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Right,
  Thumbnail,
  Card,
} from 'native-base';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import basicImage from '../../src/profile/profile1.png'; // 기본 이미지

var {width, height} = Dimensions.get('window');

// function bottomSection(section) {
//   switch (section) {
//     case 1: {
//       return <View style={{flexDirection: 'row', flexWrap: 'wrap'}}></View>;
//     }
//     case 2: {
//       return (
//         <View>
//           <View></View>
//         </View>
//       );
//     }
//   }
// };

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

function getRanking(photo, userInfo) {
  for (let i = 0; i < 5; i++) {}
}
const RankTab = (props) => {
  const reduxState = useSelector((state) => state);
  const userInfo = reduxState.userInfo;
  const [photo, setPhoto] = useState();

  useEffect(() => {
    fetch('http://192.168.0.5:3000/routes/getPhoto', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userInfo.userId}),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPhoto(res.photo);
      });
  }, [userInfo]);

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
          <Text style={{fontWeight: 'bold', fontSize: 25}}>오늘의 랭킹 🏆</Text>
          <Text>{getWeekend()}</Text>
          <View style={styles.userInfoContainer}>
            {photo ? (
              <Thumbnail
                circular={true}
                large
                source={{
                  uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                }}></Thumbnail>
            ) : (
              <Thumbnail circular={true} large source={basicImage}></Thumbnail>
            )}
            <Text style={{fontWeight: 'bold'}}>유저 ID: {userInfo.userId}</Text>
          </View>
        </Card>
        <Card style={styles.rankContainer}>
          <ScrollView style={{width: '100%'}}>
            {photo ? (
              <Fragment>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥇</Text>
                  {photo ? (
                    <Thumbnail
                      circular={true}
                      source={{
                        uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail
                      circular={true}
                      large
                      source={basicImage}></Thumbnail>
                  )}
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥈</Text>
                  {photo ? (
                    <Thumbnail
                      circular={true}
                      source={{
                        uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail
                      circular={true}
                      large
                      source={basicImage}></Thumbnail>
                  )}
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  <Text style={{fontSize: 30}}>🥉</Text>
                  {photo ? (
                    <Thumbnail
                      circular={true}
                      source={{
                        uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail
                      circular={true}
                      large
                      source={basicImage}></Thumbnail>
                  )}
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  {photo ? (
                    <Thumbnail
                      circular={true}
                      source={{
                        uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail circular={true} source={basicImage}></Thumbnail>
                  )}
                  <Text style={{fontWeight: 'bold'}}>유저아이디 or 닉네임</Text>
                </View>
                <View style={styles.userRankContainer}>
                  {photo ? (
                    <Thumbnail
                      circular={true}
                      source={{
                        uri: `http://192.168.0.5:3000/${photo[0].filename}`,
                      }}></Thumbnail>
                  ) : (
                    <Thumbnail circular={true} source={basicImage}></Thumbnail>
                  )}
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
    marginTop:'5%',
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
