/**
 * An S string is built up from "+" and "-" characters exclusively. The balance of such string is the number of all plus characters subtracted by the number of all minus characters within S. 



For example the balance of "++-+" is 2 and the balance of "+-+-" is 0. 



You can modify the account balance by removing the rightmost character. This result can be further modified using this same method until the resulting string is empty. 



Your task is to write a function that accepts String S and Integer N. This function returns the minimum number of removals necessary for the balance to become greater than or equal to N. If the desired balance isn’t achievable the function should return -1.



Example:

possibleBalance("++-", 2) // should return 1



possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 12) // 1

possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 13) // 2

possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 14) // -1

possibleBalance("+++---", 3) // 3

possibleBalance("+++-+---", 3) // 3

possibleBalance("----+-", -2) // 4
 */


function possibleBalance(s, n) {
    let p = 0, m = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c == '+') {
            p++;
        } else {
            m++;
        }
    }
    const initBal = p - m;
    if (initBal >= n) {
        return 0;
    }
    let modifiedBal = initBal, count = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];
        if (c == '-') {
            modifiedBal++;
        } else {
            modifiedBal--;
        }
        count++;
        if (modifiedBal >= n) {
            return count;
        }
    }
    return -1;
}

console.log(possibleBalance("++-", 2));

console.log(possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 12));

console.log(possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 13));

console.log(possibleBalance("+++-++-++--+-++++-+--++-++-+-++++-+++--", 14));

console.log(possibleBalance("+++---", 3));

console.log(possibleBalance("+++-+---", 3));

console.log(possibleBalance("----+-", -2));



