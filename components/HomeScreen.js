import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

class HomeScreen extends Component {
  state = {
    email: '',
    displayName: '',
  };

  componentDidMount() {

  }

  // 로그아웃
  signOutUser = () => {

  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Text>어서오세요 {this.state.displayName}님!</Text>
        <TouchableOpacity onPress={this.signOutUser}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
