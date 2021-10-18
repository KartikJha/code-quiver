/**
 * A precedence rule is given as "P>E", which means that letter "P" is followed directly by the letter "E". Write a function, given an array of precedence rules, that finds the word represented by the given rules.



Note: Each represented word contains a set of unique characters, i.e. the word does not contain duplicate letters.



Examples:

findWord(["P>E","E>R","R>U"]) // PERU

findWord(["I>N","A>I","P>A","S>P"]) // SPAIN





findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"]) // HUNGARY

findWord(["I>F", "W>I", "S>W", "F>T"]) // SWIFT

findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"]) // PORTUGAL

findWord(["W>I", "R>L", "T>Z", "Z>E", "S>W", "E>R", "L>A", "A>N", "N>D", "I>T"]) // SWITZERLAND
 */

function findWord(arr) {
    const map = {};

    for (let i = 0; i < arr.length; i++) {
        const [first, sec] = arr[i].split('>');

        if (map[first]) {
            
            const str = map[first]

            const splitStr = str.splir(first);

            splitStr[0] + first + sec + splitStr[1];

        } else if (map[sec]) {
            const str = map[sec]

            const splitStr = str.splir(first);

            splitStr[0] + first + sec + splitStr[1];
        }

        map[first] = first + sec;

        map[sec] = first + sec;


        
    }
}

console.log(findWord(["P>E","E>R","R>U"])); // PERU

console.log(findWord(["I>N","A>I","P>A","S>P"])); // SPAIN





console.log(findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"])); // HUNGARY

console.log(findWord(["I>F", "W>I", "S>W", "F>T"])); // SWIFT

console.log(findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"])); // PORTUGAL

console.log(findWord(["W>I", "R>L", "T>Z", "Z>E", "S>W", "E>R", "L>A", "A>N", "N>D", "I>T"])); // SWITZERLAND