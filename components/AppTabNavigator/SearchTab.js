import React, { Component } from 'react';
import { Icon } from 'native-base';

import { 
    View,
    Text,
    StyleSheet
    } from 'react-native';
 
class HomeTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-search' style={{ color: tintColor }} />
        )
    }
    render(){
        return (
            <View style={style.container}>
                <Text>Search</Text>
            </View>
        );
    }
}
export default HomeTab;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
