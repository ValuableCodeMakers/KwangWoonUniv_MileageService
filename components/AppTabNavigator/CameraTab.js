import React, { Component, useEffect, useState, useRef, Fragment } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Icon, Container } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CustomHeader from '../CustomHeader';
import CustomModal from '../CustomModal';
import { Address } from '../../modules/Url.js';
import { width, height } from '../../modules/Dimensions.js'

const handleGetEventToken = (address) => {
  console.log('CameraTab: 이벤트 토큰 전송 메소드');
  // fetch(Address.url+'/routes/getEventToken', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify({to: address}),
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log('이벤트 토큰 hash', data.txhash);
  //   });
};

const CameraTab = (props) => {
  const scanner = React.useRef('');
  const [cameraState, setCameraState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const userInfoState = useSelector((state) => state.userInfo);

  // {"eventTitle":"scanEvent","eventReward":500}
  const onSuccess = (e) => {
    let scanData = JSON.parse(e.data);

    if (scanData['eventTitle'] == 'scanEvent') {
      setCameraState(false);
      setModalVisible(true);
      handleGetEventToken(userInfoState.userWalletAddress);
    }
  };

  return (
    <Container>
      <CustomHeader
        props={props}
        menuColor={'#c0392b'}
        iconColor={'#fff'}></CustomHeader>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}></CustomModal>
      <Container style={styles.mainContainer}>
        <View
          style={
            cameraState
              ? styles.cameraAfterContainer
              : styles.cameraBeforeContainer
          }>
          {cameraState ? (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={(node) => {
                scanner.current = node;
              }}
              onRead={onSuccess}
              cameraStyle={{ height: '100%' }}></QRCodeScanner>
          ) : (
            <Icon
              type="MaterialCommunityIcons"
              name="qrcode-scan"
              style={{ fontSize: 150 }}
            />
          )}
        </View>

        <View style={{ ...styles.menuContainer, opacity: cameraState ? 0.5 : 1 }}>
          {cameraState ? (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                setCameraState(false);
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111' }}>
                스캔 중지
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                setCameraState(true);
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111' }}>
                스캔 시작
              </Text>
            </TouchableOpacity>
          )}

          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#e74c3c' }}>
            이벤트 QR코드를 인식하세요.
            <Text style={{ fontSize: 25 }}> 🧐</Text>
          </Text>
        </View>
      </Container>
    </Container>
  );
};

CameraTab.navigationOptions = () => ({
  tabBarIcon: ({ tintColor }) => (
    <Icon
      type="MaterialCommunityIcons"
      name="qrcode"
      style={{ color: tintColor }}
    />
  ),
});

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraAfterContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.83,
    top: 0,
  },
  cameraBeforeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.5,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.2,

    backgroundColor: '#f5f6fa',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 10,
  },
  scanButton: {
    width: '50%',
    height: '50%',
    alignItems: 'center',
  },
});
export default CameraTab;
