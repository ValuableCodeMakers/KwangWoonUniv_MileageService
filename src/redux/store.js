import {createStore, combineReducers} from 'redux';
import {
  buildingEventReducer,
  holdingEventReducer,
  userInfoReducer,
  profilePhotoReducer,
  loadingStateReducer,
  loginStateReducer
} from './reducers';

const reducer = combineReducers({
  buildingEvent: buildingEventReducer,
  holdingEvent: holdingEventReducer,
  userInfo: userInfoReducer,
  userProfilePhoto: profilePhotoReducer,
  loadState: loadingStateReducer,
  loginState: loginStateReducer
});

const store = createStore(reducer);

export default store;
