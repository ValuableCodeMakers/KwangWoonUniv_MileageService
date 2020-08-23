import React, { Component } from 'react';
import { Icon } from 'native-base';

import { 
    View,
    Text,
    StyleSheet
    } from 'react-native';
 
class WalletTab extends Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-wallet-sharp' style={{ color: tintColor }} />
        )
    }
    render(){
        return (
            <View style={style.container}>
                <Text>결제 & 지갑</Text>
            </View>
        );
    }
}
export default WalletTab;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
