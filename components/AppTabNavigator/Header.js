import * as React from 'react';
import {
  Icon,
  Right,
  Header,
  Left
} from 'native-base';

export const Header = (props) => {
  return (
    <Header style={{backgroundColor: '#c0392b', height: height * 0.1}}>
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
  );
};
