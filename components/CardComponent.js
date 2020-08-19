import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';

export default class CardCompnent extends Component {
  render() {
    const imgs = {
        '1' : require('../src/react.png'),
        '2' : require('../src/kw.png'),
        '3' : require('../src/js.png'),
        '4' : require('../src/nodejs.png'),
    }
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={require('../src/p1.jpg')}
            />
            <Body>
              <Text>kyoung_jnn</Text>
              <Text note>7/21, 2020</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={imgs[this.props.imgSrc]}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem style={{height: 45}}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart" style={{color: 'black'}} />
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" style={{color: 'black'}} />
            </Button>
            <Button transparent>
              <Icon name="ios-send" style={{color: 'black'}} />
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{height: 20}}>
          <Text>{this.props.likes} likes</Text>
        </CardItem>
        <CardItem>
          <Text>
            <Text style={{fontWeight: 'bold'}}>kyoung-jnn</Text>
            Youtube 강의 참고하여 react-native로 인스타그램 UI 클론 코딩하기.
          </Text>
        </CardItem>
      </Card>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
