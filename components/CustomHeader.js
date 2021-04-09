import * as React from 'react';
import { Icon, Right, Header, Left } from 'native-base';
import { width, height } from '../Modules/Dimensions.js';

const CustomHeader = (props) => {
  return (
    <Header style={{ backgroundColor: props.menuColor, height: height * 0.07 }}>
      <Left>
        <Icon
          name="person"
          style={{ paddingLeft: 10, color: props.iconColor }}
          onPress={() => {
            props.props.navigation.navigate('Profile');
          }}
        />
      </Left>
      <Right>
        <Icon
          name="menu"
          onPress={() => props.props.navigation.toggleDrawer()}
          style={{ paddingRight: 10, color: props.iconColor }}
        />
      </Right>
    </Header>
  );
};

export default CustomHeader;
