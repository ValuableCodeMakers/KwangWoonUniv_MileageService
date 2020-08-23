import React, { Component } from 'react';
import { Icon } from 'native-base';

import { 
    View,
    Text,
    StyleSheet
    } from 'react-native';
 
class MapTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-map' style={{ color: tintColor }} />
        )
    }
    render(){
        return (
            <View style={style.container}>
                <Text>지도</Text>
            </View>
        );
    }
}
export default MapTab;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
