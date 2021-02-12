import {createStore, combineReducers} from 'redux';
import {
  buildingEventReducer,
  holdingEventReducer,
  userInfoReducer,
  profilePhotoReducer
} from './reducers';

const reducer = combineReducers({
  buildingEvent: buildingEventReducer,
  holdingEvent: holdingEventReducer,
  userInfo: userInfoReducer,
  userProfilePhoto: profilePhotoReducer
});

const store = createStore(reducer);

export default store;
