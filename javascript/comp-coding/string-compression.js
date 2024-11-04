/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
    const inputA = [...chars]
    let count = 1;

    if (chars.length == 1) {
        return 1;
    }
    
    chars.length = 0;
    
    for (let i = 0; i < inputA.length - 1; i++) {
        const cC = inputA[i], nC = inputA[i + 1];

        if (cC == nC) {
            count++;
        } else {
            chars.push(cC);
            if (count > 1) {
                chars.push(...String(count).split(''))
            }
            count = 1;
        }   

        if (i == inputA.length - 2) {
            if (count > 1) {
                chars.push(cC);
                chars.push(...String(count).split(''))
            } else {
                chars.push(nC);
            }
        } 
    }

    return chars.length;
};

export default compress;