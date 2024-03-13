const truncateText = (text: string, windowWidth: number, fontSize: number, rank? : boolean) => {
  if (!text) {
    return;
  }
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = `${fontSize}px Pretendard`; // 폰트 사이즈와 폰트 스타일 설정

  let maxLength = text.length;
  // 글자넓이
  const textWidth = context.measureText(text).width;

  function countKoreanCharacters(text: string): number {
    // 한글 문자에 해당하는 정규 표현식
    const koreanCharacterRegex = /[\uac00-\ud7a3]/g;
  
    // 주어진 텍스트에서 한글 문자만을 찾아내어 배열로 반환, 결과가 null일 경우 빈 배열을 반환
    const matchedCharacters = text.match(koreanCharacterRegex) || [];
  
    // 한글 문자의 개수를 반환
    return matchedCharacters.length;
  }
  
  const maxWidth = windowWidth >= 430 ? (rank ? 200 + countKoreanCharacters(text) : 250 + countKoreanCharacters(text)) 
  : (rank ? (windowWidth * 0.5) + countKoreanCharacters(text) : (windowWidth * 0.65) + countKoreanCharacters(text)); // 화면 너비의 80%를 최대 너비로 설정
  
  // 텍스트의 너비가 최대 너비를 초과하지 않을 때까지 글자수 조정
  while (textWidth > maxWidth && maxLength > 0) {
    maxLength--;
    const newText = text.substring(0, maxLength);
    const newTextWidth = context.measureText(newText + "...").width;
    if (newTextWidth <= maxWidth) {
      return newText + "...";
    }
  }
  return text;
}

export default truncateText;