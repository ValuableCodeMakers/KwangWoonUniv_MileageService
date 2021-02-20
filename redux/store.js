import {createStore, combineReducers} from 'redux';
import {
  buildingEventReducer,
  holdingEventReducer,
  userInfoReducer,
  profilePhotoReducer,
  loadingStateReducer,
} from './reducers';

const reducer = combineReducers({
  buildingEvent: buildingEventReducer,
  holdingEvent: holdingEventReducer,
  userInfo: userInfoReducer,
  userProfilePhoto: profilePhotoReducer,
  loadState: loadingStateReducer,
});

const store = createStore(reducer);

export default store;
