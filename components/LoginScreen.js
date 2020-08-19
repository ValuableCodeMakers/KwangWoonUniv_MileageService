import React, {Component}  from 'react';
import {View, Text, StyleSheet } from 'react-native';

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>
            {`Hello again.\n Welcome back`}
        </Text>
        <View style={styles.errorMessage}>
          <Text>Error</Text>
      </View>

      </View>

    
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30
    }
    
})

export default LoginScreen;
