import React, { Component } from 'react';
import { Icon } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class MapTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-map' style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 37.61947,
                        longitude: 127.05899,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.002,
                    }}
                />
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
