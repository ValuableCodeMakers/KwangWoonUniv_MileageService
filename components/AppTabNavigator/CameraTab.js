import React, {Component, useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Icon, Container} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CustomHeader from './CustomHeader';

import QRCodeScanner from 'react-native-qrcode-scanner';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CameraTab = (props) => {
  const scanner = React.useRef('');
  const [cameraState, setCameraState] = useState(false);

  const onSuccess = (e) => {
    console.log(e);

    // props.navigation.goBack();
    // props.navigation.state.params.handleState({toAddress: e.data});
  };

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#c0392b'}
        iconColor={'#fff'}></CustomHeader>

      <Container style={styles.mainContainer}>
        <View style={styles.cameraContainer}>
          {cameraState ? (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={(node) => {
                scanner.current = node;
              }}
              onRead={onSuccess}
              cameraStyle={{height: "100%"}}
              topContent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height * 0.1,
                    width: width,
                    backgroundColor: '#c0392b',
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                    QR코드를 찍으세요!
                  </Text>
                </View>
              }
              bottomContent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: height * 0.1,
                    width: width,
                    backgroundColor: '#c0392b',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Text
                      style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                      스캔 중지 🙅‍♂️
                    </Text>
                  </TouchableOpacity>
                </View>
              }></QRCodeScanner>
          ) : (
            <Text>카메라 실행 전</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setCameraState(true);
            }}>
            <View>
              <Text>스캔 시작</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    </Container>
  );
};

CameraTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon
      type="MaterialCommunityIcons"
      name="qrcode-scan"
      style={{color: tintColor}}
    />
  ),
});

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  cameraContainer: {
    height: height * 0.5,
    width: width,
    borderWidth: 1,
  },
});
export default CameraTab;
