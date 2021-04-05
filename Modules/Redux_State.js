import { useSelector } from 'react-redux';

// 전반적인 redux 상태
export const reduxState = useSelector((state) => state);
// 건물 이벤트 상태
export const buildingState = useSelector((state) => state.buildingEvent.events);
// 위치 이벤트 상태
export const holdingState = useSelector((state) => state.holdingEvent);
// 앱 로딩 상태
export const loadState = useSelector((state) => state.loadState);
// 유저 정보 State
export const userInfoState = useSelector((state) => state.userInfo);

// 21.04.05
// 리팩토링 중 사용하다 실패
// 조금 더 공부해볼 필요성이 있어 남겨둠
