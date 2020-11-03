import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SettingScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingScreen</Text>
        <Text>어서오세요 님!</Text>
        <TouchableOpacity onPress={this.props.navigation.navigate('CreateWallet')}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
