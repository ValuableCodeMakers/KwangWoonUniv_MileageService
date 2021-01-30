import {createStore, combineReducers} from 'redux';
import {buildingEventReducer, holdingEventReducer} from './reducers'; 

const reducer = combineReducers({
  buildingEvent: buildingEventReducer,
  holdingEvent: holdingEventReducer,
}); 

const store = createStore(reducer);

export default store;
