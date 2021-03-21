import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

function logout(props) {
  fetch('http://172.30.1.55:3000/routes/logout', {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      props.navigation.closeDrawer();
      props.navigation.navigate('Auth', {
        screen: 'Login',
      });
    });
}

const CustomDrawerNavigator = (props) => {
  const reduxState = useSelector((state) => state); // redux의 store 가져오기
  const userInfoState = reduxState.userInfo;
  const userPhoto = reduxState.userProfilePhoto;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri: `http://172.30.1.55:3000/${userPhoto.filename}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}></Image>
        <View style={styles.infoTextContainer}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            {userInfoState.userId}
          </Text>
          <Text style={{ fontSize: 20 }}>{userInfoState.userBalance} UMT</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <View style={{ ...styles.menuButton, marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('AppMainNavigator');
            }}>
            <Text style={{ fontSize: 20 }}>소개</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('AppMainNavigator');
            }}>
            <Text style={{ fontSize: 20 }}>홈</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Profile');
            }}>
            <Text style={{ fontSize: 20 }}>내정보</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('HomeTab');
            }}>
            <Text style={{ fontSize: 20 }}>설정</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{...styles.menuButton, marginTop: '55%'}}>
          <TouchableOpacity onPress={() => logout(props)}>
            <Text style={{fontSize: 20}}>로그아웃</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={{ fontSize:20,fontWeight: 'bold', color: '#fff' }}>Team 벨코즈</Text>
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
    alignItems:'center',
    flexDirection: 'row',
    height: height * 0.3,
    borderTopLeftRadius: 40,
    padding: 50,
    backgroundColor: '#f1f2f6',
    elevation: 5,
  },
  infoTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  menuContainer: {
    alignItems: 'center',
    height: height * 0.6,
    borderBottomLeftRadius: 40,
  },
  menuButton: {
    width: '80%',
    height: '10%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  bottomTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.1,
    borderBottomLeftRadius: 40,

    backgroundColor: '#c0392b',
  },
});
