import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card} from 'native-base';

const {width, height} = Dimensions.get('window');

export default class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nickname: '',
      department: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}></View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Status</Text>
          <Card style={styles.card}>
            <View style={{marginTop: 30}}>
              <Text style={styles.inputTitle}>이름</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}></TextInput>
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.inputTitle}>학과</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(department) => this.setState({department})}
                value={this.state.department}></TextInput>
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.inputTitle}>별명</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(nickname) => this.setState({nickname})}
                value={this.state.nickname}></TextInput>
            </View>
          </Card>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate({
                routeName: 'CreateWallet',
                params: {preState: this.state}, // 다음 화면으로 state 전달
              })
            }>
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
    //justifyContent: 'center',
    position: 'relative',
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
  title: {
    marginLeft: 10,
    color: 'white',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  inputTitle: {
    color: '#7f8c8d',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  input: {
    borderColor: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    fontSize: 15,
    height: 40,
    width: width / 1.2,
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
  background: {
    marginTop: 0,
    height: height * 0.65,
    width: width,
    backgroundColor: '#c0392b',
    //position: "absolute"
  },
});
