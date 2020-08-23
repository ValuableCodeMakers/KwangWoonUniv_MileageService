import React, { Component } from 'react';
import { Icon } from 'native-base';

import { 
    View,
    Text,
    StyleSheet
    } from 'react-native';
 
class RankTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-bar-chart' style={{ color: tintColor }} />
        )
    }
    render(){
        return (
            <View style={style.container}>
                <Text>랭킹</Text>
            </View>
        );
    }
}
export default RankTab;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
