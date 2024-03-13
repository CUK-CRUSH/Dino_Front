const truncateText = (text: string, windowWidth: number, fontSize: number) => {
  let maxLength;

  if (windowWidth <= 385) { // 예: 모바일
    if (fontSize >= 18) {
      maxLength = 19;
    } else {
      maxLength = 25;
    }

  } else if (windowWidth < 430) {
    if (fontSize >= 18) {
      maxLength = 20;
    } else {
      maxLength = 26;
    }
  }
  else {
    if (fontSize >= 18) {
      maxLength = 19;
    } else {
      maxLength = 25;
    }
  }

  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

export default truncateText