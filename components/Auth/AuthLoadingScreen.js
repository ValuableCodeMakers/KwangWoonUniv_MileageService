import React, {useEffect} from 'react';
import {View} from 'react-native';

import {Address} from '../Modules/Url.js';

async function fetchUserId(props) {
  const userData = await fetch(Address.url + '/routes/getUserId', {
    method: 'GET',
  });
  const parsed_userData = await userData.json();
  const userToken = parsed_userData.userId;

  props.navigation.navigate(
    userToken === null || userToken === undefined ? 'Auth' : 'Main',
  );
}

const AuthLoading = (props) => {
  useEffect(() => {
    fetchUserId(props);
  }, []);
  return <View>{/* 기본 빨간색 배경 */}</View>;
};

export default AuthLoading;
