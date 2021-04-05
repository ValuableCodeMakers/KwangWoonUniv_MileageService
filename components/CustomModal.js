import React from 'react';
import {StyleSheet, View, Text, Dimensions, Alert, Button} from 'react-native';
import Modal from 'react-native-modal';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CustomModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>이벤트 토큰 지급!</Text>
          <Button
            style={styles.buttonClose}
            title="확인"
            onPress={() => {
              console.log(modalVisible);
              setModalVisible(false);
            }}></Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  buttonClose: {width: 50, height: 50, backgroundColor: '#111'},
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustomModal;
