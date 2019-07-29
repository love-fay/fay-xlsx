/**
 * Create by fay on 2019-07-17 16:59
 */
const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
];

const transformNumToLetter = function (num) {
    let letter = "";
    let loopNum = parseInt(num / 26);
    if(loopNum > 0){
        letter += transformNumToLetter(loopNum-1);
    }
    letter += letters[num%26];
    return letter;
};

export default transformNumToLetter;