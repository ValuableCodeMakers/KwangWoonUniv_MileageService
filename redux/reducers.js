import {FlatList} from 'react-native-gesture-handler';

const buildingEvent_Reducer_initialState = {
  events: [
    {id: '화도관', state: false},
    {id: '비마관', state: false},
    {id: '옥의관', state: false},
    {id: '복지관', state: false},
    {id: '연구관', state: false},
    {id: '동해문화예술관', state: false},
    {id: '참빛관', state: false},
    {id: '새빛관', state: false},
    {id: '한울관', state: false},
    {id: '누리관', state: false},
    {id: '80주년기념관', state: false},
    {id: '아이스링크', state: false},
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

export const buildingEventReducer = (
  state = buildingEvent_Reducer_initialState,
  action,
) => {
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
      return {...state, events: newArray};
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
      return {...state, state: action.result};
    case '이벤트 중단':
      return {...state, state: action.result};
    default:
      return state;
  }
};

// 유저 정보 관련 reducer
export const userInfoReducer = (state = userData_initialState, action) => {
  console.log("reducer",action)
  switch (action.type) {
    case 'UPDATE_id':
      return {...state, userId: action.userId};
      break;
    case 'UPDATE_address':
      return {...state, userWalletAddress: action.userWalletAddress};
      break;
    case 'UPDATE_balacne':
      return {...state, userBalance: action.userBalance};
      break;
    default:
      console.log('기본')
      return state;
  }
};
