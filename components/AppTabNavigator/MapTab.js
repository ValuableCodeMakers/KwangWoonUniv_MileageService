import React, { useState, useEffect } from 'react';
import { Icon } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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
      console.log("위치 접근 권한", result);
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
            Geolocation.clearWatch(watchId)
          }
        }
      }
    });
  }, []);

  if (!location) {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="현재위치"
          description="https://www.kw.ac.kr/ko/"></Marker>
        <Polyline
          coordinates={[
            // 참빛관 시작
            { latitude: 37.618721, longitude: 127.061062 },
            { latitude: 37.618940, longitude: 127.061424 },
            { latitude: 37.620114, longitude: 127.061139 },
            { latitude: 37.620425, longitude: 127.060679 },
            { latitude: 37.620382, longitude: 127.060467 },
            { latitude: 37.620382, longitude: 127.060050 },
            { latitude: 37.620618, longitude: 127.059637 },
            { latitude: 37.620618, longitude: 127.059615 },
            { latitude: 37.620619, longitude: 127.059570 },
            { latitude: 37.620626, longitude: 127.059521 },
            { latitude: 37.620678, longitude: 127.059383 },
            { latitude: 37.620830, longitude: 127.059116 },
            { latitude: 37.620860, longitude: 127.059048 },
            { latitude: 37.619225, longitude: 127.057970 },
            { latitude: 37.619175, longitude: 127.058019 },
            { latitude: 37.619124, longitude: 127.058176 },
            { latitude: 37.618957, longitude: 127.058412 },
            { latitude: 37.618686, longitude: 127.058648 },
            { latitude: 37.618551, longitude: 127.058875 },
            { latitude: 37.61910, longitude: 127.05984 },
            { latitude: 37.61910, longitude: 127.05988 },
            { latitude: 37.618980, longitude: 127.060064 },
            { latitude: 37.619070, longitude: 127.060177 },
            { latitude: 37.619034, longitude: 127.060224 },
            { latitude: 37.618989, longitude: 127.060714 },
            { latitude: 37.618721, longitude: 127.061062 },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
        <Polygon
          coordinates={[
            { latitude: 37.618721, longitude: 127.061062 },
            { latitude: 37.618940, longitude: 127.061424 },
            { latitude: 37.620114, longitude: 127.061139 },
            { latitude: 37.620425, longitude: 127.060679 },
            { latitude: 37.620382, longitude: 127.060467 },
            { latitude: 37.620382, longitude: 127.060050 },
            { latitude: 37.620618, longitude: 127.059637 },
            { latitude: 37.620618, longitude: 127.059615 },
            { latitude: 37.620619, longitude: 127.059570 },
            { latitude: 37.620626, longitude: 127.059521 },
            { latitude: 37.620678, longitude: 127.059383 },
            { latitude: 37.620830, longitude: 127.059116 },
            { latitude: 37.620860, longitude: 127.059048 },
            { latitude: 37.619225, longitude: 127.057970 },
            { latitude: 37.619175, longitude: 127.058019 },
            { latitude: 37.619124, longitude: 127.058176 },
            { latitude: 37.618957, longitude: 127.058412 },
            { latitude: 37.618686, longitude: 127.058648 },
            { latitude: 37.618551, longitude: 127.058875 },
            { latitude: 37.61910, longitude: 127.05984 },
            { latitude: 37.61910, longitude: 127.05988 },
            { latitude: 37.618980, longitude: 127.060064 },
            { latitude: 37.619070, longitude: 127.060177 },
            { latitude: 37.619034, longitude: 127.060224 },
            { latitude: 37.618989, longitude: 127.060714 },
            { latitude: 37.618721, longitude: 127.061062 },
          ]}
          fillColor="rgba(100,100,0,0.3)"
        />
        <Polyline
          coordinates={[
            // 연구관 아래 시작
            { latitude: 37.619164, longitude: 127.057809 },
            { latitude: 37.619937, longitude: 127.058290 },
            { latitude: 37.620139, longitude: 127.057490 },
            { latitude: 37.620176, longitude: 127.057416 },
            { latitude: 37.620396, longitude: 127.057286 },
            { latitude: 37.620623, longitude: 127.057416 },
            { latitude: 37.620974, longitude: 127.057273 },
            { latitude: 37.620996, longitude: 127.057195 },
            { latitude: 37.620984, longitude: 127.057069 },
            { latitude: 37.621524, longitude: 127.056722 },
            { latitude: 37.621657, longitude: 127.056560 },
            { latitude: 37.621732, longitude: 127.055994 },
            { latitude: 37.621632, longitude: 127.055176 },
            { latitude: 37.621166, longitude: 127.054638 },
            { latitude: 37.620735, longitude: 127.054395 },
            { latitude: 37.620637, longitude: 127.054478 },
            { latitude: 37.620497, longitude: 127.054541 },
            { latitude: 37.620142, longitude: 127.054637 },
            { latitude: 37.619719, longitude: 127.055348 },
            { latitude: 37.619768, longitude: 127.055450 },
            { latitude: 37.619431, longitude: 127.056207 },
            { latitude: 37.619236, longitude: 127.056366 },
            { latitude: 37.619214, longitude: 127.056460 },
            { latitude: 37.619343, longitude: 127.056502 },
            { latitude: 37.619475, longitude: 127.056477 },
            { latitude: 37.619693, longitude: 127.056777 },
            { latitude: 37.619698, longitude: 127.056826 },
            { latitude: 37.619779, longitude: 127.056940 },
            { latitude: 37.619766, longitude: 127.056954 },
            { latitude: 37.619776, longitude: 127.056974 },
            { latitude: 37.619164, longitude: 127.057809 },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
        <Polygon
          coordinates={[
            { latitude: 37.619164, longitude: 127.057809 },
            { latitude: 37.619937, longitude: 127.058290 },
            { latitude: 37.620139, longitude: 127.057490 },
            { latitude: 37.620176, longitude: 127.057416 },
            { latitude: 37.620396, longitude: 127.057286 },
            { latitude: 37.620623, longitude: 127.057416 },
            { latitude: 37.620974, longitude: 127.057273 },
            { latitude: 37.620996, longitude: 127.057195 },
            { latitude: 37.620984, longitude: 127.057069 },
            { latitude: 37.621524, longitude: 127.056722 },
            { latitude: 37.621657, longitude: 127.056560 },
            { latitude: 37.621732, longitude: 127.055994 },
            { latitude: 37.621632, longitude: 127.055176 },
            { latitude: 37.621166, longitude: 127.054638 },
            { latitude: 37.620735, longitude: 127.054395 },
            { latitude: 37.620637, longitude: 127.054478 },
            { latitude: 37.620497, longitude: 127.054541 },
            { latitude: 37.620142, longitude: 127.054637 },
            { latitude: 37.619719, longitude: 127.055348 },
            { latitude: 37.619768, longitude: 127.055450 },
            { latitude: 37.619431, longitude: 127.056207 },
            { latitude: 37.619236, longitude: 127.056366 },
            { latitude: 37.619214, longitude: 127.056460 },
            { latitude: 37.619343, longitude: 127.056502 },
            { latitude: 37.619475, longitude: 127.056477 },
            { latitude: 37.619693, longitude: 127.056777 },
            { latitude: 37.619698, longitude: 127.056826 },
            { latitude: 37.619779, longitude: 127.056940 },
            { latitude: 37.619766, longitude: 127.056954 },
            { latitude: 37.619776, longitude: 127.056974 },
            { latitude: 37.619164, longitude: 127.057809 },
          ]}
          fillColor="rgba(100,100,0,0.3)"
        />
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
