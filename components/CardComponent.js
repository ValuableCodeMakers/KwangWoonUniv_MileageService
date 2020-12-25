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
    return (
      <Card style={style.wallet}>
        <CardItem>
          <Body style={{alignItems:'center'}}>
            <Text>현재 잔액</Text>
            <Text>1000 KWT</Text>
          </Body>
        </CardItem>
        <CardItem>
     
        </CardItem>
      </Card>
    );
  }
}

const style = StyleSheet.create({
  wallet: {
    width: '95%',
  },
});
