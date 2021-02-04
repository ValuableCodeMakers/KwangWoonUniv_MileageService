import { FlatList } from 'react-native-gesture-handler';
// 이벤트 재발생 대기시간
const TIME_LAPSE = 60000;
const buildingEvent_Reducer_initialState = {
  events: [
    { id: '화도관', state: false, time: new Date() },
    { id: '비마관', state: false, time: new Date() },
    { id: '옥의관', state: false, time: new Date() },
    { id: '복지관', state: false, time: new Date() },
    { id: '연구관', state: false, time: new Date() },
    { id: '동해문화예술관', state: false, time: new Date() },
    { id: '참빛관', state: false, time: new Date() },
    { id: '새빛관', state: false, time: new Date() },
    { id: '한울관', state: false, time: new Date() },
    { id: '누리관', state: false, time: new Date() },
    { id: '80주년기념관', state: false, time: new Date() },
    { id: '아이스링크', state: false, time: new Date() },
  ],
};

const holdingEvent_Reducer_initialState = {
  id: '학교도착',
  state: false,
};

const userData_initialState = {
  userId: '',
  userWalletAddress: '',
  userBalance: 'N/A',
};

// 건물 도착 이벤트 관련 reducer

// buildingEvent_Reducer_initialState 변경시 참고 코드

// const index = state.events.findIndex((data) => data.id === action.type);
// const newArray = [...state.events];
// newArray[index].state = true;

var index = null;
var newArray = null;
var i = 0;
export const buildingEventReducer = (
  state = buildingEvent_Reducer_initialState,
  action,
) => {
  switch (action.type) {
    case '화도관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, HwaDo: action.result };
    case '비마관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, BiMa: action.result };
    case '옥의관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, OgUi: action.result };
    case '복지관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, BokJi: action.result };
    case '연구관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, YeonGu: action.result };
    case '동해문화예술관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, DongHae: action.result };
    case '참빛관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, ChamBit: action.result };
    case '새빛관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, SaeBit: action.result };
    case '한울관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, HanWool: action.result };
    case '누리관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, NooRi: action.result };
    case '80주년기념관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, Anni80: action.result };
    case '아이스링크':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index && Date.now() - newArray[index].time > TIME_LAPSE) {
          newArray[index].state = true;
        }
        else {
          if (newArray[i].state == true) {
            newArray[i].state = false;
          }
        }
      }
      return { ...state, events: newArray };
    case '방문 이벤트 중단':
      index = state.events.findIndex((data) => data.state === true);
      newArray = [...state.events];
      newArray[index].state = false;
      newArray[index].time = Date.now();
      return { ...state, events: newArray };
    default:
      return state;
  }
};

export const holdingEventReducer = (
  state = holdingEvent_Reducer_initialState,
  action,
) => {
  switch (action.type) {
    case '이벤트 실행':
      return { ...state, state: action.result };
    case '이벤트 중단':
      return { ...state, state: action.result };
    default:
      return state;
  }
};

// 유저 정보 관련 reducer
export const userInfoReducer = (state = userData_initialState, action) => {
  switch (action.type) {
<<<<<<< HEAD
    case 'UPDATE_id':
      return {...state, userId: action.userId};
    case 'UPDATE_address':
      return {...state, userWalletAddress: action.userWalletAddress};
    case 'UPDATE_balacne':
      return {...state, userBalance: action.userBalance};
=======
    case 'ID':
      return { ...state, id: true };
>>>>>>> dev_map_detectBuilding
    default:
      console.log('기본')
      return state;
  }
};
