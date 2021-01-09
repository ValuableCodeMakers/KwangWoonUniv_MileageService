import React, {Component} from 'react';
import {
  Icon,
  Card,
  CardItem,
  Right,
  Header,
  Left,
  Container,
} from 'native-base';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

class WalletTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-wallet-sharp" style={{color: tintColor}} />
    ),
  };
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#fff'}}>
          <Left>
            <Icon
              name="person"
              style={{paddingLeft: 10, color: 'black'}}
              onPress={() => {
                console.log(this.props.navigation);
                this.props.navigation.navigate('Profile');
              }}
            />
          </Left>
          <Right>
            <Icon
              name="menu"
              onPress={this.signOutUser}
              style={{paddingRight: 10, color: 'black'}}
            />
          </Right>
        </Header>

        <Container style={styles.container}>
          <View style={styles.totalToken}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: 'white'}}>현재 잔액</Text>
              <Text style={{fontSize: 35, color: 'white'}}>
                <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
                토큰
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity activeOpacity={0.8}>
                <Card>
                  <Text>현재 잔액</Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </Container>
    );
  }
}
export default WalletTab;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  totalToken: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: height * 0.2,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowRadius: 20,
    marginTop: '12%',
    backgroundColor: '#c0392b',
    
  },
  eventContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width * 0.98,
    height: '70%',
    marginTop: '40%',

    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#fff',
  },
  eventText: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 0,
  },
  eventScrollView: {
    marginTop: 5,
    marginBottom: 10,
  },
  wallet: {
    width: width * 0.95,
  },
  currentEvent: {
    width: width * 0.95,
  },
});
