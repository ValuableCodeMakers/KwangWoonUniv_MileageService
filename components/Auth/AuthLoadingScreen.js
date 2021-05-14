import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Address} from '../Modules/Url.js';

import {handleLoginState} from '../../redux/action';

async function fetchUserId(props, dispatch) {
  const userData = await fetch(Address.url + '/routes/getUserId', {
    method: 'GET',
  });
  const parsed_userData = await userData.json();
  const userToken = parsed_userData.userId;

  if (userToken === null || userToken === undefined) {
    props.navigation.navigate('Auth');
  } else {
    dispatch(handleLoginState('Login'));
    props.navigation.navigate('Main');
  }
}

const AuthLoading = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserId(props, dispatch);
  }, []);
  return <View>{/* 기본 빨간색 배경 */}</View>;
};

export default AuthLoading;
