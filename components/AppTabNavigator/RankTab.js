import React, {Component, useState} from 'react';
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

function btnClickEventHandler(index) {
  setActiveBtn({
    activeBtn: index,
  });
};

function bottomSection(section) {
  switch (section) {
    case 1: {
      return <View style={{flexDirection: 'row', flexWrap: 'wrap'}}></View>;
    }
    case 2: {
      return (
        <View>
          <View></View>
        </View>
      );
    }
  }
};

const RankTab = () => {
  const [activeBtn, setActiveBtn] = useState({
    activeBtn: 1,
  });
  const reduxState = useSelector((state) => state);
  const userInfo = reduxState.userInfo;

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
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1.2, alignItems: 'center'}}>
              <Thumbnail
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginLeft: 20,
                }}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Text style={{fontWeight: 'bold'}}>노 경진</Text>
            <Text>KWU</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              bordered
              dark
              style={{
                flex: 1,
                justifyContent: 'center',
                height: 30,
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Text>프로필 수정</Text>
            </Button>
          </View>
        </View>
        {/* 프로필 하단부 */}
        <View style={styles.bottomButton}>
          <Button transparent onPress={() => btnClickEventHandler(1)}>
            <Icon
              name="ios-apps-outline"
              style={[
                activeBtn == 1 ? {color: 'black'} : {color: '#bdc3c7'},
              ]}></Icon>
          </Button>
          <Button transparent onPress={() => btnClickEventHandler(2)}>
            <Icon
              name="tag"
              type="SimpleLineIcons"
              style={[
                activeBtn == 2 ? {color: 'black'} : {color: '#bdc3c7'},
              ]}></Icon>
          </Button>
        </View>
        <View>{bottomSection(activeBtn)}</View>
      </Content>
    </Container>
  );
};
RankTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-bar-chart" style={{color: tintColor}} />
  )
})

export default RankTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
  },
  profileButton: {
    flex: 1,
    justifyContent: 'center',
    height: 30,
    marginHorizontal: 10,
    marginTop: 10,
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#bdc3c7',
    marginTop: 15,
  },
});
