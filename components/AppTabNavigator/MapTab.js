import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Polygon,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  KW_Area,
  HwaDo,
  BiMa,
  OgUi,
  BokJi,
  YeonGu,
  DongHae,
  ChamBit,
  SaeBit,
  HanWool,
  NooRi,
  Anni80,
  IceLink,
} from './Coordinates/Coordinate';
import {completeEvent} from '../../redux/action'

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
  const [arriveLocation, setArriveLocation] = useState(false);
  const buildingList = [
    HwaDo,
    BiMa,
    OgUi,
    BokJi,
    YeonGu,
    DongHae,
    ChamBit,
    SaeBit,
    HanWool,
    NooRi,
    Anni80,
    IceLink,
  ];
  const dispatch = useDispatch();

  // 현재 위치 변경시
  useEffect(() => {
    if (location && !arriveLocation) {
      const locationResult = geolib.isPointInPolygon(
        {latitude: location.latitude, longitude: location.longitude},
        KW_Area[0],
      );
      if (locationResult) {
        console.log('학교도착! 시간 이벤트 실행', locationResult);
        setArriveLocation(true)

        dispatch(completeEvent("학교도착")) // dispatch 에 true 전달
      }
    }
  }, [location]);

  // componentdidmount
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>위치 추적 권한이 필요합니다.</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, width: '100%'}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsCompass={true}
        zoomControlEnabled={true}
        minZoomLevel={17}
        showsUserLocation={true}
        followsUserLocation={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: 37.619484994520285,
          longitude: 127.05897358201273,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
        }}>
        {/* 광운대학교 영역 동쪽*/}
        <Polyline coordinates={KW_Area[0]} strokeColor="#000" strokeWidth={3} />
        <Polygon coordinates={KW_Area[0]} fillColor="rgba(100,100,0,0.3)" />
        {/* 광운대학교 영역 서쪽*/}
        <Polyline coordinates={KW_Area[1]} strokeColor="#000" strokeWidth={3} />
        <Polygon coordinates={KW_Area[1]} fillColor="rgba(100,100,0,0.3)" />

        {buildingList.map((building) => (
          <Marker
            coordinate={building.point}
            title={building.title}
            description="1토큰"
          />
        ))}

        {buildingList.map((building) => (
          <Polyline
            coordinates={building.coordinate}
            strokeColor="#000"
            strokeWidth={2}
          />
        ))}

        {buildingList.map((building) => (
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
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-map" style={{color: tintColor}} />
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
