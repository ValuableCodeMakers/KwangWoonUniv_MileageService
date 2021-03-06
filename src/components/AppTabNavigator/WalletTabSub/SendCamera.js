import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

import QRCodeScanner from 'react-native-qrcode-scanner';

const SendCamera = (props) => {
  const scanner = React.useRef('');

  const onSuccess = (e) => {
    console.log(e);

    props.navigation.goBack();
    props.navigation.state.params.handleState({toAddress: e.data});
  };

  return (
    <QRCodeScanner
      reactivate={true}
      showMarker={true}
      ref={(node) => {
        scanner.current = node;
      }}
      onRead={onSuccess}
      cameraStyle={{height: height * 0.6}}
      topContent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.2,
            width: width,
            backgroundColor: '#c0392b',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: '#fff'}}>
            상대방의 QR코드를 찍으세요.
          </Text>
        </View>
      }
      bottomContent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height * 0.2,
            width: width,
            backgroundColor: '#c0392b',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
              스캔 취소 🙅‍♂️
            </Text>
          </TouchableOpacity>
        </View>
      }></QRCodeScanner>
  );
};

SendCamera.navigationOptions = () => ({
  headerShown: false,
});

export default SendCamera;