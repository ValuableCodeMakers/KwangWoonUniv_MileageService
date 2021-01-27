import {createStore, combineReducers} from 'redux';
import {eventReducer} from './reducers'; // 리듀서들을 가져옵니다

const reducer = combineReducers({event: eventReducer}); // reducers 

const store = createStore(reducer); 

export default store;
