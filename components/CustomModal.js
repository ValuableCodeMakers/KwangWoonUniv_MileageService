import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {width, height} from '../Modules/Dimensions.js';

const EventCustomModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 40}}>🎉</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 15,
            }}>
            이벤트 토큰 획득 <Text style={{fontSize: 30}}>😁</Text>
          </Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => {
              console.log(modalVisible);
              setModalVisible(false);
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AuthCustomModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            로그인 오류 <Text style={{fontSize: 30}}>😥</Text>
          </Text>
          <Text style={{marginTop: 5, marginBottom: 15}}>
            비밀번호와 아이디를 확인해주세요.
          </Text>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => {
              console.log(modalVisible);
              setModalVisible(false);
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export {EventCustomModal, AuthCustomModal};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: width * 0.7,
    alignItems: 'center',
    elevation: 5,
    paddingVertical: 20,
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 45,
    backgroundColor: '#c0392b',
    elevation: 10,
    borderRadius: 5,
  },
});
