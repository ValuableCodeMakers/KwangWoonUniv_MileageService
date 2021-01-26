import React, { useState, useEffect } from 'react';
import { Icon } from 'native-base';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Polygon,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';
import { KW_Area, HwaDo, BiMa, OgUi, BokJi, YeonGu, DongHae, ChamBit, SaeBit, HanWool, NooRi, Anni80, IceLink } from './Coordinates/Coordinate';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';

async function requestPermission() {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

const MapTab = (props) => {
  const [location, setLocation] = useState();
  useEffect(() => {
    requestPermission().then((result) => {
      console.log('위치 접근 권한', result);
      if (result === 'granted') {
        const watchId = Geolocation.watchPosition(
          (pos) => {
            setLocation(pos.coords);
          },
          (error) => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 0,
            interval: 5000,
            fastestInterval: 2000,
          },
        );

        return () => {
          if (watchId) {
            Geolocation.clearWatch(watchId);
          }
        };
      }
    });
  }, []);

  if (!location) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>위치 추적 권한이 필요합니다.</Text>
      </View>
    );
  }

  const buildingList = [HwaDo, BiMa, OgUi, BokJi, YeonGu, DongHae, ChamBit, SaeBit, HanWool, NooRi, Anni80, IceLink];
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomControlEnabled={true}
        minZoomLevel={16}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: 37.619436177817924,
          longitude: 127.0589724196906,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
        }}>

        <Polyline
          coordinates={KW_Area[0]}
          strokeColor="#000"
          strokeWidth={3}
        />
        <Polygon
          coordinates={KW_Area[0]}
          fillColor="rgba(100,100,0,0.3)"
        />
        <Polyline
          coordinates={KW_Area[1]}
          strokeColor="#000"
          strokeWidth={3}
        />
        <Polygon
          coordinates={KW_Area[1]}
          fillColor="rgba(100,100,0,0.3)"
        />

        {buildingList.map(building => (
          <Marker
            coordinate={building.point}
            title={building.title}
            description="1토큰"
          />
        ))}

        {buildingList.map(building => (
          <Polyline
            coordinates={building.coordinate}
            strokeColor="#000"
            strokeWidth={3}
          />
        ))}

        {buildingList.map(building => (
          <Polygon
            coordinates={building.coordinate}
            fillColor="rgba(100,100,0,0.5)"
          />
        ))}
      </MapView>
    </View>
  );
};

MapTab.navigationOptions = (screenProps) => ({
  tabBarIcon: ({ tintColor }) => (
    <Icon name="ios-map" style={{ color: tintColor }} />
  ),
});

export default MapTab;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
