import React, {Component} from 'react';
import {
  Card,
  CardItem,
  Icon,
  Right,
  Header,
  Left,
  Container,
} from 'native-base';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';

const {width, height} = Dimensions.get('window');

class HomeTab extends Component {
  // 로그아웃 기능
  state = {
    balance: "N/A",
  };

  componentDidMount() {
    console.log(this.props.navigation.getScreenProps());

    const address = this.props.navigation.getScreenProps().userWalletAddress;
    const handleBalance = this.props.navigation.getScreenProps().handleBalance;

    if (address != null) {
      fetch('http://192.168.0.5:3000/routes/getWalletBalance', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({address: address}),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let balance = res.balance;
          balance = balance.substr(0, balance.length - 18);
          this.setState({balance: balance});
          handleBalance(balance)
        });
    }
  }

  signOutUser = () => {
    fetch('http://192.168.0.5:3000/routes/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then((res) => {
      console.log(res);
      this.props.navigation.navigate('Auth');
    });
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home" style={{color: tintColor}} />
    ),
  };

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#c0392b'}}>
          <Left>
            <Icon
              name="person"
              style={{paddingLeft: 10, color: '#fff'}}
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
              style={{paddingRight: 10, color: '#fff'}}
            />
          </Right>
        </Header>

        <Container style={styles.container}>
          <View style={styles.background}></View>

          <View style={styles.cardContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: 'white'}}>현재 잔액</Text>
              <Text style={{fontSize: 35, color: 'white'}}>
                <Icon name="server-outline" style={{color: 'white'}}></Icon>{' '}
                {this.state.balance} 토큰
              </Text>
            </View>
          </View>

          <Card style={styles.eventContainer}>
            <Text style={styles.eventText}>Event</Text>
            <ScrollView style={styles.eventScrollView}>
              <Card style={styles.currentEvent}>
                <CardItem style={{height: 120}}>
                  <Text>진행중인 이벤트가 없습니다. 😂</Text>
                </CardItem>
              </Card>
              <Card style={styles.currentEvent}>
                <CardItem style={{height: 120}}>
                  <Text>진행중인 이벤트</Text>
                </CardItem>
              </Card>
              <Card style={styles.currentEvent}>
                <CardItem style={{height: 120}}>
                  <Text>진행중인 이벤트</Text>
                </CardItem>
              </Card>
              <Card style={styles.currentEvent}>
                <CardItem style={{height: 120}}>
                  <Text>진행중인 이벤트</Text>
                </CardItem>
              </Card>
            </ScrollView>
          </Card>
        </Container>
      </Container>
    );
  }
}
export default HomeTab;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  background: {
    marginTop: 0,
    height: height,
    width: width,
    backgroundColor: '#c0392b',
  },
  cardContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width,
    marginTop: '12%',
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
