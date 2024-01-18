
// only Eng
export const checkBadWord = (text : string) => {
    var Filter = require('bad-words'),
    filter = new Filter();

    const checkBadWord = filter.clean(text).includes('*')
    console.log(checkBadWord)
    return checkBadWord;

}