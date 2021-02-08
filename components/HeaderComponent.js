import * as React from 'react';

export const HeaderComponent = (props) => {
    return (
        <Header style={{backgroundColor: '#fff', height: height * 0.1}}>
          <Left>
            <Icon
              name="person"
              style={{paddingLeft: 10, color: props.color}}
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}
            />
          </Left>
          <Right>
            <Icon
              name="menu"
              onPress={() => this.props.navigation.toggleDrawer()}
              style={{paddingRight: 10, color: props.color}}
            />
          </Right>
        </Header>
      );
};

