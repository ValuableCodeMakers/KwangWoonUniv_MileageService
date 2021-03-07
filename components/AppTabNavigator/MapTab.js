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
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Image,
} from 'react-native';
import Animated from 'react-native-reanimated';

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
import {handleBuildingEvent, handleHoldingEvent} from '../../redux/action';

import pinImage from '../../src/pin.png';
import HwaDoImage from '../../src/building/HwaDo.jpg';

const {width, height} = Dimensions.get('window');

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

  // 건물 이벤트 상태
  const buildingState = useSelector((state) => state.buildingEvent.events);
  //console.log(JSON.stringify(buildingState));

  // 위치 이벤트 상태
  const holdingState = useSelector((state) => state.holdingEvent);

  // 이벤트 1
  // 건물 방문 이벤트
  useEffect(() => {
    var locationBuilding = '';
    var i;
    if (location) {
      for (i = 0; i < buildingList.length; i++) {
        if (
          geolib.isPointInPolygon(
            {latitude: location.latitude, longitude: location.longitude},
            buildingList[i].coordinate,
          )
        ) {
          console.log(buildingList[i].title);
          locationBuilding = buildingList[i].title;
        }
      }

      if (locationBuilding != '') {
        console.log(locationBuilding + '도착! 시간 이벤트 실행');
        setArriveLocation(true);
        dispatch(handleBuildingEvent(locationBuilding)); // dispatch 에 true 전달
      }
    }
  }, [location]);

  // 이벤트 2
  // 학교 머물기 이벤트
  useEffect(() => {
    if (location) {
      const locationResult = geolib.isPointInPolygon(
        {latitude: location.latitude, longitude: location.longitude},
        KW_Area[0],
      );

      if (locationResult && !holdingState.state) {
        console.log('학교도착! 시간 이벤트 실행', locationResult);

        setTimeout(() => {
          dispatch(handleHoldingEvent('학교도착, 이벤트 실행')); // dispatch 에 true 전달
        }, 1000);
      } else if (!locationResult && holdingState.state) {
        console.log('학교 이탈! 시간 이벤트 중단', locationResult);

        dispatch(handleHoldingEvent('학교도착, 이벤트 중단')); // dispatch 에 false 전달
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
            interval: 2000,
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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  // useEffect(()=>{
  //   mapAnimation.addListener(({value})=>{
  //     let index = Math.floor(value / 100);

  //   })
  // })

  const onMarkerPress = (mapEventData) => {
    const markerId = mapEventData._targetInst.return.key;

    let x = markerId * width;
    console.log(markerId);

    _scrollView.current.getNode().scrollTo({x: x, y: 0, animated: true});
  };

  const _scrollView = React.useRef(null);

  if (!location) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>위치 추적 권한이 필요합니다.</Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          showsCompass={true}
          zoomControlEnabled={true}
          minZoomLevel={14}
          showsUserLocation={true}
          loadingEnabled={true}
          moveOnMarkerPress={true}
          userLocationUpdateInterval={1000}
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
          <Polyline
            coordinates={KW_Area[0]}
            strokeColor="#000"
            strokeWidth={3}
          />
          <Polygon coordinates={KW_Area[0]} fillColor="rgba(100,100,100,0.3)" />
          {/* 광운대학교 영역 서쪽*/}
          <Polyline
            coordinates={KW_Area[1]}
            strokeColor="#000"
            strokeWidth={3}
          />
          <Polygon coordinates={KW_Area[1]} fillColor="rgba(100,100,100,0.3)" />

          {buildingList.map((building, index) => (
            <Polyline
              coordinates={building.coordinate}
              strokeColor="#000"
              strokeWidth={2}
              key={index}
            />
          ))}

          {buildingList.map((building, index) => (
            <Polygon
              coordinates={building.coordinate}
              fillColor="rgba(100,70,0,0.5)"
              key={index}
            />
          ))}

          {/* 마커 */}
          {buildingList.map((building, index) => (
            <Marker
              coordinate={building.point}
              title={building.title}
              description="500 토큰"
              key={index}
              image={pinImage}
              onPress={(e) => onMarkerPress(e)}
              style={{width: 5, height: 5}}></Marker>
          ))}
        </MapView>

        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ])}>
          {buildingList.map((building, index) => (
            <View style={styles.buildingCard} key={index}>
              <View style={{width: '100%', height: '50%'}}>
                <Image
                  source={HwaDoImage}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"></Image>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '100%',
                  height: '50%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      fontFamily: 'BMDOHYEON',
                    }}>
                    {building.title}
                  </Text>
                  <Text style={{fontSize: 15, marginLeft: 10}}>500 토큰</Text>
                </View>
                <View>
                  <Text style={{fontSize: 15}}>화도관 설명</Text>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
};

MapTab.navigationOptions = (screenProps) => ({
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-map" style={{color: tintColor}} />
  ),
});

export default MapTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  buildingCard: {
    display: 'flex',
    width: width * 0.85,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.075,
    backgroundColor: '#fff',
    borderBottomEndRadius: 35,
    elevation: 6,
  },
});
