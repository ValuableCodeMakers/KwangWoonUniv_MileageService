import {createStore, combineReducers} from 'redux';
import {
  buildingEventReducer,
  holdingEventReducer,
  userInfoReducer,
} from './reducers';

const reducer = combineReducers({
  buildingEvent: buildingEventReducer,
  holdingEvent: holdingEventReducer,
  userInfo: userInfoReducer,
});

const store = createStore(reducer);

export default store;
