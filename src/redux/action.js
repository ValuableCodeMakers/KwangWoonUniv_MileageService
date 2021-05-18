export function handleBuildingEvent(type) {
  switch (type) {
    case '화도관':
      return {
        type: '화도관',
        result: true,
      };
    case '비마관':
      return {
        type: '비마관',
        result: true,
      };
    case '옥의관':
      return {
        type: '옥의관',
        result: true,
      };
    case '복지관':
      return {
        type: '복지관',
        result: true,
      };
    case '연구관':
      return {
        type: '연구관',
        result: true,
      };
    case '동해문화예술관':
      return {
        type: '동해문화예술관',
        result: true,
      };
    case '참빛관':
      return {
        type: '참빛관',
        result: true,
      };
    case '새빛관':
      return {
        type: '새빛관',
        result: true,
      };
    case '한울관':
      return {
        type: '한울관',
        result: true,
      };
    case '누리관':
      return {
        type: '누리관',
        result: true,
      };
    case '80주년기념관':
      return {
        type: '80주년기념관',
        result: true,
      };
    case '아이스링크':
      return {
        type: '아이스링크',
        result: true,
      };
    case '방문 코인 수령, 이벤트 중단':
      return {
        type: '방문 이벤트 중단',
        result: false,
      };
    default:
      return false;
  }
}

export function handleHoldingEvent(type) {
  switch (type) {
    // 학교 도착
    case '학교도착, 이벤트 실행':
      return {
        type: '이벤트 실행',
        result: true,
      };
    case '학교대기, 이벤트 중단':
      return {
        type: '이벤트 중단',
        result: false,
      };
    default:
      return {
        type: '이벤트 중단',
        result: false,
      };
  }
}

export function handleUserInfo(type, input) {
  switch (type) {
    case 'UPDATE_info':
      return {type: 'UPDATE_info', userInfo: input};
    case 'UPDATE_balacne':
      return {type: 'UPDATE_balacne', userBalance: input};
    default:
      return {
        type: 'none',
      };
  }
}

export function handleProfilePhoto(type, input) {
  return {type: 'UPDATE_photo', photo: input};
}

export function handleLoadingState(type) {
  switch (type) {
    case '로딩완료':
      return {type: '로딩완료', result: true};
    case '로딩중':
      return {type: '로딩중', result: false};
  }
}

export function handleLoginState(type) {
  switch (type) {
    case 'Login':
      return {type: type, result: true};
    case 'Logout':
      return {type: type, result: false};
  }
}
