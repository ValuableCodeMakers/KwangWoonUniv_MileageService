import React, { Component } from 'react';
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

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import CardComponent from './CardComponent';

var { width, height } = Dimensions.get('window');

class ProfileScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{ color: tintColor }} />
    ),
  };

  state = {
    activeBtn: 1,
  };

  btnClickEventHandler = (index) => {
    this.setState({
      activeBtn: index,
    });
  };

  bottomSection = (section) => {
    switch (section) {
      case 1: {
        return (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          </View>
        );
      }
      case 2: {
        return (
          <View>
            <View>
              <CardComponent imgSrc="1" likes="100" />
              <CardComponent imgSrc="2" likes="36" />
              <CardComponent imgSrc="3" likes="240" />
            </View>
          </View>
        );
      }
    }
  };


  loadTagSection = () => { };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header style={{ backgroundColor: 'white' }}>
          <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>kyoung_jnn</Text>
            <Icon
              name="caret-down"
              type="FontAwesome"
              style={{ paddingLeft: 10, fontSize: 14 }}
            />
          </Left>
          <Right style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="dots-vertical"
              type="MaterialCommunityIcons"
              style={{ fontSize: 23 }}
            />
          </Right>
        </Header>
        <Content>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1.2, alignItems: 'center' }}>
                <Thumbnail
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View style={{ flex: 3 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 25,
                  }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>30</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>게시물</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>189</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>팔로워</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>181</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>팔로잉</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>노 경진</Text>
              <Text>KWU</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
            <Button transparent onPress={() => this.btnClickEventHandler(1)}>
              <Icon
                name="ios-apps-outline"
                style={[
                  this.state.activeBtn == 1
                    ? { color: 'black' }
                    : { color: '#bdc3c7' },
                ]}></Icon>
            </Button>
            <Button transparent onPress={() => this.btnClickEventHandler(2)}>
              <Icon
                name="tag"
                type="SimpleLineIcons"
                style={[
                  this.state.activeBtn == 2
                    ? { color: 'black' }
                    : { color: '#bdc3c7' },
                ]}></Icon>
            </Button>
          </View>
          <View>{this.bottomSection(this.state.activeBtn)}</View>
        </Content>
      </View>
    );
  }
}
export default ProfileScreen;

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
