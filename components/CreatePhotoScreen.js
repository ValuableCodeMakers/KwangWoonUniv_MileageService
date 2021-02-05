import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Card, Thumbnail} from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import basicImage from '../src/profile/profile2.png'; // 기본 이미지

const {width, height} = Dimensions.get('window');

export default class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    const userInfo = this.props.navigation.getParam('preState');
    console.log('이전 state', userInfo);

    this.state = {
      image: '',
    };
  }

  handleProfile = () => {
    fetch('http://192.168.0.5:3000/routes/saveProfile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo),
    }).then((res) => {
      this.props.navigation.navigate('Main');
    });
  };

  handlePickImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (res) => {
      console.log(res);
      if (res.error) {
        console.log('LaunchCamera Error: ', res.error);
      } else {
        this.setState({image: res.uri});
      }
    });

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
          <Text style={styles.title}>Photo</Text>
          <Card style={styles.card}>
            <View style={styles.photoContainer}>
              <TouchableOpacity onPress={this.handlePickImage}>
                {this.state.image ? (
                  <Thumbnail
                    circular={true}
                    large
                    source={{
                      uri: this.state.image,
                    }}></Thumbnail>
                ) : (
                  <Thumbnail
                    circular={true}
                    large
                    source={basicImage}></Thumbnail>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text>dd</Text>
            </View>
          </Card>

          <TouchableOpacity style={styles.button} onPress={this.handleProfile}>
            <Text style={{fontSize: 20}}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  inputContainer: {
    marginTop: height * 0.3,
    width: width / 1.1,
    position: 'absolute',
  },
  photoContainer: {width: width * 0.5},
  textContainer: {width: width * 0.5},
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
