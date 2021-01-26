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

import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
const KW_Area = [[
  // 참빛관 시작
  { latitude: 37.618721, longitude: 127.061062 },
  { latitude: 37.61894, longitude: 127.061424 },
  { latitude: 37.620114, longitude: 127.061139 },
  { latitude: 37.620425, longitude: 127.060679 },
  { latitude: 37.620382, longitude: 127.060467 },
  { latitude: 37.620382, longitude: 127.06005 },
  { latitude: 37.620618, longitude: 127.059637 },
  { latitude: 37.620618, longitude: 127.059615 },
  { latitude: 37.620619, longitude: 127.05957 },
  { latitude: 37.620626, longitude: 127.059521 },
  { latitude: 37.620678, longitude: 127.059383 },
  { latitude: 37.62083, longitude: 127.059116 },
  { latitude: 37.62086, longitude: 127.059048 },
  { latitude: 37.619225, longitude: 127.05797 },
  { latitude: 37.619175, longitude: 127.058019 },
  { latitude: 37.619124, longitude: 127.058176 },
  { latitude: 37.618957, longitude: 127.058412 },
  { latitude: 37.618686, longitude: 127.058648 },
  { latitude: 37.618551, longitude: 127.058875 },
  { latitude: 37.6191, longitude: 127.05984 },
  { latitude: 37.6191, longitude: 127.05988 },
  { latitude: 37.61898, longitude: 127.060064 },
  { latitude: 37.61907, longitude: 127.060177 },
  { latitude: 37.619034, longitude: 127.060224 },
  { latitude: 37.618989, longitude: 127.060714 },
  { latitude: 37.618721, longitude: 127.061062 },
],
[
  // 연구관 아래 시작
  { latitude: 37.619164, longitude: 127.057809 },
  { latitude: 37.619937, longitude: 127.05829 },
  { latitude: 37.620139, longitude: 127.05749 },
  { latitude: 37.620176, longitude: 127.057416 },
  { latitude: 37.620396, longitude: 127.057286 },
  { latitude: 37.620623, longitude: 127.057416 },
  { latitude: 37.620974, longitude: 127.057273 },
  { latitude: 37.620996, longitude: 127.057195 },
  { latitude: 37.620984, longitude: 127.057069 },
  { latitude: 37.621524, longitude: 127.056722 },
  { latitude: 37.621657, longitude: 127.05656 },
  { latitude: 37.621732, longitude: 127.055994 },
  { latitude: 37.621632, longitude: 127.055176 },
  { latitude: 37.621166, longitude: 127.054638 },
  { latitude: 37.620735, longitude: 127.054395 },
  { latitude: 37.620637, longitude: 127.054478 },
  { latitude: 37.620497, longitude: 127.054541 },
  { latitude: 37.620142, longitude: 127.054637 },
  { latitude: 37.619719, longitude: 127.055348 },
  { latitude: 37.619768, longitude: 127.05545 },
  { latitude: 37.619431, longitude: 127.056207 },
  { latitude: 37.619236, longitude: 127.056366 },
  { latitude: 37.619214, longitude: 127.05646 },
  { latitude: 37.619343, longitude: 127.056502 },
  { latitude: 37.619475, longitude: 127.056477 },
  { latitude: 37.619693, longitude: 127.056777 },
  { latitude: 37.619698, longitude: 127.056826 },
  { latitude: 37.619779, longitude: 127.05694 },
  { latitude: 37.619766, longitude: 127.056954 },
  { latitude: 37.619776, longitude: 127.056974 },
  { latitude: 37.619164, longitude: 127.057809 },
]];
const HwaDo = [
  { latitude: 37.6204659, longitude: 127.05944285 }
  ,
  [
    { latitude: 37.620704, longitude: 127.059090 },
    { latitude: 37.620686, longitude: 127.059071 },
    { latitude: 37.620682, longitude: 127.059079 },
    { latitude: 37.620591, longitude: 127.059024 },
    { latitude: 37.620566, longitude: 127.059081 },
    { latitude: 37.620520, longitude: 127.059054 },
    { latitude: 37.620431, longitude: 127.059260 },
    { latitude: 37.620402, longitude: 127.059246 },
    { latitude: 37.620269, longitude: 127.059559 },
    { latitude: 37.620296, longitude: 127.059573 },
    { latitude: 37.620204, longitude: 127.059792 },
    { latitude: 37.620225, longitude: 127.059897 },
    { latitude: 37.620309, longitude: 127.059945 },
    { latitude: 37.620300, longitude: 127.059969 },
    { latitude: 37.620334, longitude: 127.059991 },
    { latitude: 37.620389, longitude: 127.059872 },
    { latitude: 37.620372, longitude: 127.059853 },
    { latitude: 37.620657, longitude: 127.059199 },
    { latitude: 37.620677, longitude: 127.059212 },
    { latitude: 37.620704, longitude: 127.059090 },
  ]
];

const BiMa = [
  { latitude: 37.619515535848116, longitude: 127.05991798998568, }
  ,
  [
    { latitude: 37.619143, longitude: 127.059720 },
    { latitude: 37.619214, longitude: 127.059943 },
    { latitude: 37.619220, longitude: 127.059939 },
    { latitude: 37.619281, longitude: 127.060146 },
    { latitude: 37.619268, longitude: 127.060151 },
    { latitude: 37.619296, longitude: 127.060240 },
    { latitude: 37.619334, longitude: 127.060223 },
    { latitude: 37.619391, longitude: 127.060408 },
    { latitude: 37.619434, longitude: 127.060388 },
    { latitude: 37.619445, longitude: 127.060425 },
    { latitude: 37.619725, longitude: 127.060272 },
    { latitude: 37.619736, longitude: 127.060285 },
    { latitude: 37.619765, longitude: 127.060267 },
    { latitude: 37.619768, longitude: 127.060253 },
    { latitude: 37.619750, longitude: 127.060186 },
    { latitude: 37.619868, longitude: 127.059853 },
    { latitude: 37.619761, longitude: 127.059539 },
    { latitude: 37.619701, longitude: 127.059565 },
    { latitude: 37.619692, longitude: 127.059536 },
    { latitude: 37.619682, longitude: 127.059539 },
    { latitude: 37.619662, longitude: 127.059479 },
    { latitude: 37.619656, longitude: 127.059480 },
    { latitude: 37.619645, longitude: 127.059448 },
    { latitude: 37.619143, longitude: 127.059720 },
  ]
];

const OgUi = [

];

const BokJi = [

];

const YeonGu = [

];

const DongHae = [

];

const ChamBit = [

];

const SaeBit = [
  { latitude: 37.61973223747628, longitude: 127.06088358524107 }
  ,
  []
];

const HanWool = [
  { latitude: 37.62065002559912, longitude: 127.05701583976301 }
  ,
  []
];

const NooRi = [

];

const Anni80 = [

];

const IceLink = [

];

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
        <Marker
          coordinate={BiMa[0]}
          title="비마관"
          description="1토큰"
        />
        <Marker
          coordinate={SaeBit[0]}
          title="새빛관"
          description="1토큰"
        />
        <Marker
          coordinate={HanWool[0]}
          title="한울관"
          description="1토큰"
        />
        <Marker
          coordinate={HwaDo[0]}
          title="화도관"
          description="1토큰"
        />
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
        <Polyline
          coordinates={HwaDo[1]}
          strokeColor="#000"
          strokeWidth={3}
        />
        <Polygon
          coordinates={HwaDo[1]}
          fillColor="rgba(100,100,0,0.5)"
        />
        <Polyline
          coordinates={BiMa[1]}
          strokeColor="#000"
          strokeWidth={3}
        />
        <Polygon
          coordinates={BiMa[1]}
          fillColor="rgba(100,100,0,0.5)"
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
