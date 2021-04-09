import React, { Component, Fragment, useState, useEffect } from 'react';
import {
  Icon,
  Content,
  Header,
  Left,
  Right,
  Thumbnail,
  Container,
} from 'native-base';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { handleProfilePhoto } from '../redux/action';
import { Address } from '../modules/Url.js';
import { width, height } from '../modules/Dimensions.js'

function createFormData(id, photo) {
  const data = new FormData();

  data.append('userId', id);
  data.append('image', {
    uri: photo.uri,
    name: photo.fileName,
    type: photo.type,
  });

  return data;
}

const handleChangePhoto = (id, dispatch) => {
  const options = {
    mediaType: 'photo',
  };

  // 갤러리
  launchImageLibrary(options, (res) => {
    console.log(res);
    if (res.error) {
      console.log('LaunchCamera Error: ', res.error);
    } else if (!res.didCancel) {
      const data = createFormData(id, res);
      const photo = res;

      fetch(Address.url + '/routes/changePhoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          dispatch(
            handleProfilePhoto('UPDATE_photo', [
              {
                id: id,
                filename: id + photo.fileName,
                path: 'profiles/' + id + photo.fileName,
              },
            ]),
          );
        })
        .then(() => {
          alert('프로필 저장 완료');
        });
    }
  });

  // 카메라
  // launchImageLibrary(options, (response) => {
  //   if (response.error) {
  //     console.log('LaunchImageLibrary Error: ', response.error);
  //   } else {
  //     setImageSource(response.uri);
  //   }
  // });
};

const ProfileScreen = (props) => {
  const reduxState = useSelector((state) => state); // redux의 store 가져오기
  const dispatch = useDispatch();

  // 유저 정보
  const userInfo = reduxState.userInfo;
  const userPhoto = reduxState.userProfilePhoto;
  const [userEtc, setUserEtc] = useState({
    userName: '',
    userNickname: '',
    userDepartment: '',
  });

  useEffect(() => {
    fetch(Address.url + '/routes/getProfileEtc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userInfo.userId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUserEtc({
          userName: res.userName,
          userNickname: res.userNickname,
          userDepartment: res.userDepartment,
        });
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header style={{ backgroundColor: '#c0392b', height: height * 0.07 }}>
        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="chevron-back"
            type="Ionicons"
            style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
            onPress={() => props.navigation.goBack()}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'white',
              alignItems: 'center',
            }}>
            내 프로필 🛠
          </Text>
        </Left>
        <Right style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="settings-outline"
            style={{ color: 'white' }}
            onPress={() =>
              props.navigation.navigate('ChangeProfile', {
                Id: userInfo.userId,
                Name: userEtc.userName,
                Nickname: userEtc.userNickname,
                Department: userEtc.userDepartment,
              })
            }
          />
        </Right>
      </Header>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height * 0.3,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {userPhoto.fileName != '' ? (
              <View>
                <TouchableOpacity
                  onPress={() => handleChangePhoto(userInfo.userId, dispatch)}>
                  <Image
                    source={{
                      uri: Address.url + `/${userPhoto.filename}`,
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                    }}></Image>
                  <Icon
                    name="ios-add-circle"
                    type="Ionicons"
                    style={{
                      position: 'absolute',
                      paddingRight: 10,
                      fontSize: 30,
                      color: '#ff5050',
                      left: 80,
                      top: 100,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Thumbnail
                  circular={true}
                  large
                  style={{
                    borderRadius: 70,
                    borderWidth: 5,
                    borderColor: 'pink',
                    backgroundColor: 'snow',
                  }}
                />
                <Icon
                  name="camera"
                  type="Ionicons"
                  style={{
                    position: 'absolute',
                    paddingRight: 10,
                    fontSize: 70,
                    color: '#ff5050',
                    left: 35,
                    top: 30,
                  }}
                />
                <Icon
                  name="ios-add-circle"
                  type="Ionicons"
                  style={{
                    position: 'absolute',
                    paddingRight: 10,
                    fontSize: 30,
                    color: '#ff5050',
                    left: 80,
                    top: 100,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 프로필 하단부 */}
      <View style={{ height: height * 0.63 }}>
        <View
          style={{
            backgroundColor: 'black',
            padding: 10,
          }}>
          <Text
            style={{
              color: '#bdc3c7',
              fontSize: 13,
              fontWeight: 'bold',
            }}>
            계정 정보
          </Text>
        </View>
        <View style={styles.bottomTab}>
          <View>
            <Text style={styles.bottomTextTitle}>학번</Text>
            <Text style={styles.bottomText2}>{userInfo.userId}</Text>
          </View>
          <Right>
            <Icon
              name="chevron-forward"
              type="Ionicons"
              style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
            />
          </Right>
        </View>

        <View style={styles.bottomTab}>
          <View>
            <Text style={styles.bottomTextTitle}>이름</Text>
            <Text style={styles.bottomText2}>{userEtc.userName}</Text>
          </View>
          <Right>
            <Icon
              name="chevron-forward"
              type="Ionicons"
              style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
              onPress={() => {
                alert(2);
              }}
            />
          </Right>
        </View>
        <View style={styles.bottomTab}>
          <View>
            <Text style={styles.bottomTextTitle}>별명</Text>
            <Text style={styles.bottomText2}>{userEtc.userNickname}</Text>
          </View>
          <Right>
            <Icon
              name="chevron-forward"
              type="Ionicons"
              style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
              onPress={() => {
                alert(3);
              }}
            />
          </Right>
        </View>

        <View style={styles.bottomTab}>
          <View>
            <Text style={styles.bottomTextTitle}>학과</Text>
            <Text style={styles.bottomText2}>{userEtc.userDepartment}</Text>
          </View>
          <Right>
            <Icon
              name="chevron-forward"
              type="Ionicons"
              style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
              onPress={() => {
                alert(4);
              }}
            />
          </Right>
        </View>
        <View style={styles.bottomTab}>
          <View>
            <Text style={styles.bottomTextTitle}>지갑 정보</Text>
            <Text style={styles.bottomText2}>{userInfo.userWalletAddress}</Text>
          </View>
          <Right>
            <Icon
              name="chevron-forward"
              type="Ionicons"
              style={{ paddingRight: 10, fontSize: 25, color: 'white' }}
            />
          </Right>
        </View>
      </View>
    </View>
  );
};

ProfileScreen.navigationOptions = () => ({
  headerShown: false,
  tabBarIcon: ({ tintColor }) => (
    <Icon name="chevron-back" type="Ionicons" style={{ color: tintColor }} />
  ),
});

export default ProfileScreen;

const styles = StyleSheet.create({
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 20,
  },
  profileButton: {
    height: 30,
    marginHorizontal: 10,
    marginTop: 10,
  },
  bottomTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#464646',
    paddingLeft: 10,
  },
  bottomTextTitle: {
    fontSize: 15,
    color: '#bdc3c7',
    marginBottom: 5
  },
  bottomText2: {
    fontSize: 16,
    color: '#a0a0a0',
  },
});
