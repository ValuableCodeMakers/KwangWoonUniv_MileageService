import {FlatList} from 'react-native-gesture-handler';

const eventReducer_initialState = {
  HwaDo: false,
  BiMa: false,
  OgUi: false,
  BokJi: false,
  YeonGu: false,
  DongHae: false,
  ChamBit: false,
  SaeBit: false,
  HanWool: false,
  NooRi: false,
  Anni80: false,
  IceLink: false,
  Arrive: false,
};

const userData_initialState = {
  event1: false,
};

// 건물 도착 이벤트 관련 reducer
export const eventReducer = (state = eventReducer_initialState, action) => {
  switch (action.type) {
    case '화도관':
      return {...state, HwaDo: action.result};
    case '비마관':
      return {...state, BiMa: action.result};
    case '옥의관':
      return {...state, OgUi: action.result};
    case '복지관':
      return {...state, BokJi: action.result};
    case '연구관':
      return {...state, YeonGu: action.result};
    case '동해문화예술관':
      return {...state, DongHae: action.result};
    case '참빛관':
      return {...state, ChamBit: action.result};
    case '새빛관':
      return {...state, SaeBit: action.result};
    case '한울관':
      return {...state, HanWool: action.result};
    case '누리관':
      return {...state, NooRi: action.result};
    case '80주년기념관':
      return {...state, Anni80: action.result};
    case '아이스링크':
      return {...state, IceLink: action.result};
    case '학교도착':
      return {...state, Arrive: action.result};
    default:
      return state;
  }
};

// 유저 정보 관련 reducer
export const userinfoReducer = (state = userData_initialState, action) => {
  switch (action.type) {
    case 'ID':
      return {...state, id: true};
    default:
      return state;
  }
};
