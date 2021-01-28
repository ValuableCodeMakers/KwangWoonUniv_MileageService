import React, {Component} from 'react';
import {useState, useEffect} from 'react';
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
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const HomeTab = (props) => {
  const [balance, setBalance] = useState('N/A');
  const reduxState = useSelector((state) => state); // redux의 store 가져오기
  console.log(JSON.stringify(reduxState));

  if (props.navigation.getScreenProps().userBalance) {
    if (props.navigation.getScreenProps().userBalance !== balance) {
      return setBalance(props.navigation.getScreenProps().userBalance);
    }
  }
 
  return (
    <Container>
      <Header style={{backgroundColor: '#c0392b'}}>
        <Left>
          <Icon
            name="person"
            style={{paddingLeft: 10, color: '#fff'}}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </Left>
        <Right>
          <Icon
            name="menu"
            onPress={() => props.navigation.toggleDrawer()}
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
              {balance} 토큰
            </Text>
          </View>
        </View>

        <Card style={styles.eventContainer}>
          <Text style={styles.eventText}>Event</Text>
          <ScrollView style={styles.eventScrollView}>
            {/* {eventList.map((data) => (
              <Card style={styles.currentEvent}>
                <CardItem style={{height: 120}}>
                  <Text style={{fontSize:18}}> 이벤트 완료! 😊</Text>
                </CardItem>
              </Card>
            ))} */}
          </ScrollView>
        </Card>
      </Container>
    </Container>
  );
};

HomeTab.navigationOptions = () => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-home" style={{color: tintColor}} />
  ),
});

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
  currentEvent: {
    width: width * 0.95,
    position: 'relative',
  },
});
