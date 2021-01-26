const eventReducer_initialState = {
  event1: false,
  event2: false
};

const userData_initialState = {
  event1: false,
};

// 이벤트 관련 reducer
export const eventReducer = (state = eventReducer_initialState, action) => {
  switch (action.type) {
    case 'SET_EVENT1':
      return {...state, event1: true};
    case 'SET_EVENT2':
      return {...state, event2: true};
    case 'SET_EVENT3':
      return {...state, event3: true};
    default:
      return state;
  }
};

// 유저 정보 관련 reducer
export const userinfoReducer = (state = userData_initialState, action) => {
  switch (action.type) {
    case 'ID':
      return {...state, event1: true};
    default:
      return state;
  }
};
