export function completeEvent(type) {
  switch (type) {
    // 학교 도착
    case '학교도착':
      return {
        type: '학교도착',
        result: true,
      };
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

    default:
      return false;
  }
}
