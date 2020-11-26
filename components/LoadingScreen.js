import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class LoadingScreen extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading Screen</Text>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b33939'
  },
});
export default LoadingScreen;
