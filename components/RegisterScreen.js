import React, {Component}  from 'react';
import {View, Text, StyleSheet} from 'react-native';

class RegisterScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>register Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default RegisterScreen;
