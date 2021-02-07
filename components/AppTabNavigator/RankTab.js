import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Thumbnail,
} from 'native-base';
import {useSelector} from 'react-redux';

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

const RankTab = (props) => {
  const reduxState = useSelector((state) => state);
  const userInfo = reduxState.userInfo;

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
        console.log(res);
      });
  }, []);

  return (
    <Container>
      <Header style={{backgroundColor: '#fff'}}>
        <Left>
          <Icon
            name="person"
            style={{paddingLeft: 10, color: '#000'}}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </Left>
        <Right>
          <Icon
            name="menu"
            onPress={() => props.navigation.toggleDrawer()}
            style={{paddingRight: 10, color: '#000'}}
          />
        </Right>
      </Header>
      <Content>
        <View style={{paddingTop: 10}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>오늘의 랭킹</Text>
            <Text>{getWeekend()}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5, alignItems: 'center'}}>
              <Thumbnail
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginLeft: 20,
                }}
              />
            </View>
            <Text style={{fontWeight: 'bold'}}>유저 ID: {userInfo.userId}</Text>
          </View>
        </View>
        {/* 프로필 하단부 */}
      </Content>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    marginTop: 15,
  },
});
