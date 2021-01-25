import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DrawerItems} from 'react-navigation';

const {width, height} = Dimensions.get('window');


const CustomDrawerNavigator = (props) => {
  const id = props.navigation.getScreenProps().userId;
  const balance = props.navigation.getScreenProps().userBalance;
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>{id}</Text>
        <Text style={{fontSize: 20}}>{balance} 토큰</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('AppTabNavigator');
          }}>
          <Text>소개</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('Profile');
          }}>
          <Text>내정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('HomeTab');
          }}>
          <Text>설정</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: 'white',
  },
  infoContainer: {
    justifyContent: 'center',
    backgroundColor: '#dcdde1',
    height: height * 0.3,
    borderTopLeftRadius: 40,
    padding: 50,
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.7,
    borderBottomLeftRadius: 40,
  },
});
