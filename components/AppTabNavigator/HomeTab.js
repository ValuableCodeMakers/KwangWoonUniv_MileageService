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
  static navigationOptions = {
    headerMode: 'none',
    headerShown: false,
    tabBarVisible: 'true',
  };

  constructor(props) {
    super(props);

    this.state = {
      balance: 'N/A',
    };
  }

  // props => state 업데이트
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('HomeTab getDerivedStateFromProps');
    console.log(nextProps.navigation.getScreenProps().userBalance);
    if (nextProps.navigation.getScreenProps().userBalance !== prevState.balance) {
      return {balance: nextProps.navigation.getScreenProps().userBalance};
    }
    return null;
  }

  signOutUser = () => {
    // fetch('http://192.168.0.5:3000/routes/logout', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    // }).then((res) => {
    //   console.log(res);
    //   this.props.navigation.navigate('Auth');
    // });
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
