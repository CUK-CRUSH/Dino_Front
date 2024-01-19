
// only Eng
export const checkBadWord = (text : string) => {
    var Filter = require('bad-words'),
    filter = new Filter();
    console.log(filter.list)

    const checkBadWord = filter.clean(text).includes('*');
    const b = filter.list.includes(text);
    console.log(filter.clean(text))
    
    console.log(checkBadWord)
    return checkBadWord;

}