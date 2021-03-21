import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, CardItem, Thumbnail } from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import basicImage from '../../src/profile/profile.png'; // 기본 이미지

const { width, height } = Dimensions.get('window');

export default class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.userInfo = this.props.navigation.getParam('preState');
    console.log('이전 state', this.userInfo);

    this.state = {
      userId: '',
      image: '',
    };
  }

  componentDidMount() {
    fetch('http://172.30.1.55:3000/routes/getUserId', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ userId: res.userId });
      });
  }

  createFormData = (photo) => {
    const data = new FormData();

    data.append('userId', this.state.userId);
    data.append('image', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    });

    return data;
  };

  handleSavePhoto = () => {
    const data = this.createFormData(this.state.image);
    console.log(data);
    fetch('http://172.30.1.55:3000/routes/savePhoto', {
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
      })
      .then(() => {
        this.props.navigation.navigate('Main');
      });
  };

  handlePickImage = () => {
    const options = {
      mediaType: 'photo',
    };

    // 갤러리
    launchImageLibrary(options, (res) => {
      console.log(res);
      if (res.error) {
        console.log('LaunchCamera Error: ', res.error);
      } else {
        this.setState({ image: res });
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}></View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Result</Text>
          <Card style={styles.card}>
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={this.handlePickImage}>
                {this.state.image ? (
                  <Thumbnail
                    circular={true}
                    large
                    source={{
                      uri: this.state.image.uri,
                    }}></Thumbnail>
                ) : (
                  <Thumbnail
                    circular={true}
                    large
                    source={basicImage}></Thumbnail>
                )}
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginTop: 10 }}>프로필 사진</Text>
            </View>
            <CardItem style={styles.textContainer}>
              <View style={{ width: '100%' }}>
                <Text
                  style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
                  유저 정보
                </Text>
                <Text style={{ fontSize: 15 }}>이름: {this.userInfo.name}</Text>
                <Text style={{ fontSize: 15 }}>
                  학과: {this.userInfo.department}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  닉네임: {this.userInfo.nickname}
                </Text>
              </View>

              <View style={{ width: '100%', marginTop: 40 }}>
                <Text
                  style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
                  지갑 정보
                </Text>

                <Text style={{ fontSize: 15 }}>
                  주소: {this.userInfo.address.substr(0, 10)} ...
                </Text>
                <Text style={{ fontSize: 15 }}>
                  니모닉: {this.userInfo.mnemonic.substr(0, 15)} ...
                </Text>
              </View>
            </CardItem>
          </Card>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSavePhoto}>
            <Text style={{ fontSize: 20 }}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  background: {
    marginTop: 0,
    height: height * 0.65,
    width: width,
    backgroundColor: '#c0392b',
    //position: "absolute"
  },
  card: {
    alignItems: 'center',
    height: height * 0.45,
    flexDirection: 'row',
    elevation: 5,
  },
  inputContainer: {
    marginTop: height * 0.3,
    width: width / 1.1,
    position: 'absolute',
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
    padding: 20,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    width: '58%',
    height: '96%',
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    marginLeft: 10,
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    height: 50,
    elevation: 20,
  },
});
