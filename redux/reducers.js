import { FlatList } from 'react-native-gesture-handler';

const eventReducer_initialState = {
  events: [
    { id: '화도관', state: false },
    { id: '비마관', state: false },
    { id: '옥의관', state: false },
    { id: '복지관', state: false },
    { id: '연구관', state: false },
    { id: '동해문화예술관', state: false },
    { id: '참빛관', state: false },
    { id: '새빛관', state: false },
    { id: '한울관', state: false },
    { id: '누리관', state: false },
    { id: '80주년기념관', state: false },
    { id: '아이스링크', state: false },
    { id: '학교도착', state: false },
  ],
};

const userData_initialState = {
  event1: false,
};

var index = null;
var newArray = null;
var i = 0;
// 건물 도착 이벤트 관련 reducer
export const eventReducer = (state = eventReducer_initialState, action) => {
  switch (action.type) {
    case '화도관':
      return { ...state, HwaDo: action.result };
    case '비마관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index)
          newArray[index].state = true;
        else
          newArray[i].state = false;
      }
      return state;
    case '옥의관':
      return { ...state, OgUi: action.result };
    case '복지관':
      return { ...state, BokJi: action.result };
    case '연구관':
      return { ...state, YeonGu: action.result };
    case '동해문화예술관':
      return { ...state, DongHae: action.result };
    case '참빛관':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      for (i = 0; i < state.events.length - 1; i++) {
        if (i == index)
          newArray[index].state = true;
        else
          newArray[i].state = false;
      }
      return state;
    case '새빛관':
      return { ...state, SaeBit: action.result };
    case '한울관':
      return { ...state, HanWool: action.result };
    case '누리관':
      return { ...state, NooRi: action.result };
    case '80주년기념관':
      return { ...state, Anni80: action.result };
    case '아이스링크':
      return { ...state, events: newArray };
    case '학교도착':
      index = state.events.findIndex((data) => data.id === action.type);
      newArray = [...state.events];
      newArray[index].state = true;
    default:
      return state;

  }
};

// 유저 정보 관련 reducer
export const userinfoReducer = (state = userData_initialState, action) => {
  switch (action.type) {
    case 'ID':
      return { ...state, id: true };
    default:
      return state;
  }
};
