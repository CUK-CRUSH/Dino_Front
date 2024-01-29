
// only Eng
// 욕이면 true
export const checkBadWord = (text: string) => {
  var Filter = require('bad-words'),
    filter = new Filter();
  const containsBadWord = filter.list.some((badWord: string) => text.toLowerCase().includes(badWord.toLowerCase()));
  return containsBadWord;

}