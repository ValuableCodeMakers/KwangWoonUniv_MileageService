import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  Icon,
  Right,
  Header,
  Left,
  Container,
  Card,
  CardItem,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

class WalletTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-wallet-sharp" style={{color: tintColor}} />
    ),
  };
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      balance: 'N/A',
    };
  }

  // props => state 업데이트
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('WalletTab getDerivedStateFromProps');
    console.log(nextProps.navigation.getScreenProps().userBalance);
    if (
      nextProps.navigation.getScreenProps().userBalance !== prevState.balance
    ) {
      return {
        address: nextProps.navigation.getScreenProps().userWalletAddress,
        balance: nextProps.navigation.getScreenProps().userBalance,
      };
    }
    return null;
  }

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
              onPress={() => this.props.navigation.toggleDrawer()}
              style={{paddingRight: 10, color: 'black'}}
            />
          </Right>
        </Header>

        <Container style={styles.container}>
          <Card style={styles.mainContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: 'white'}}>현재 잔액</Text>
              <Text style={{fontSize: 35, color: 'white'}}>
                <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
                {this.state.balance} 토큰
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Send', this.state.address);
                }}>
                <Icon
                  name="exit-outline"
                  style={{fontSize: 20, color: 'white'}}></Icon>
                <Text style={{fontSize: 15, color: 'white'}}>보내기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.receiveButton}
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Receive', this.state.address);
                }}>
                <Icon
                  name="enter-outline"
                  style={{fontSize: 20, color: 'white'}}></Icon>
                <Text style={{fontSize: 15, color: 'white'}}> 받기</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.bacodeContainer}>
            <CardItem>
              <View style={styles.detailButtonContainer}>
                <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
                  <Text style={{fontSize: 15}}>사용 내역</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.receiveButton}
                  activeOpacity={0.8}>
                  <Text style={{fontSize: 15}}>습득 내역</Text>
                </TouchableOpacity>
              </View>
            </CardItem>
            <CardItem>
              <Text style={{fontSize: 50}}>바코드</Text>
            </CardItem>
          </Card>
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
  mainContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: height * 0.25,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: '12%',
    backgroundColor: '#c0392b',
    elevation: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButton: {
    alignItems: 'center',
  },
  receiveButton: {
    alignItems: 'center',
  },
  bacodeContainer: {
    alignItems: 'center',
    width: width * 0.85,
    height: height * 0.5,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: 15,
    elevation: 10,
  },
  detailButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
});
