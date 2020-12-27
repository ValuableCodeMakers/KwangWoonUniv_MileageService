import React, {Component} from 'react';
import {
  Content,
  Icon,
  Thumbnail,
  Body,
  Right,
  Header,
  Left,
  Container,
} from 'native-base';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CardComponent from '../CardComponent';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation-stack';

class HomeTab extends Component {
  // 로그아웃 기능
  signOutUser = () => {
    firebase.auth().signOut();
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" style={{color: tintColor}} />
    ),
  };

  render() {
    return (
      <Container style={style.container}>
        <Header style={{backgroundColor: '#353b48'}}>
          <Left>
            <Icon
              name="person"
              style={{paddingLeft: 10, color: 'white'}}
              onPress={() => {
                console.log(this.props.navigation);
                this.props.navigation.navigate('Profile');
              }}
            />
          </Left>
          <Body style={{justifyContent: 'center'}}></Body>
          <Right>
            <Icon
              name="ios-send-outline"
              onPress={this.signOutUser}
              style={{paddingRight: 10, color: 'white'}}
            />
          </Right>
        </Header>

        <Content>
          {/* <View style={{height: 90}}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                paddingStart: 10,
                paddingEnd: 10,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p1.jpg')}
                />
                <Text>kyoung_jnn</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p2.jpg')}
                />
                <Text>won</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p3.jpg')}
                />
                <Text>jun_6</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p4.jpg')}
                />
                <Text>NaEn</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p5.jpg')}
                />
                <Text>IU</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p6.jpg')}
                />
                <Text>Wak</Text>
              </View>
              <View style={style.storyName}>
                <Thumbnail
                  style={style.story}
                  source={require('../../src/p7.jpg')}
                />
                <Text>0_o</Text>
              </View>
            </ScrollView>
          </View> */}
          <CardComponent imgSrc="1" likes="25"></CardComponent>
          <CardComponent imgSrc="2" likes="30"></CardComponent>
        </Content>
      </Container>
    );
  }
}
export default HomeTab;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353b48',
  },
  story: {
    borderColor: '#8e44ad',
    borderWidth: 2,
    marginHorizontal: 12,
    marginTop: 10,
  },
  storyName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});
