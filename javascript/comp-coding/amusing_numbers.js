process.stdin.resume();
process.stdin.setEncoding('utf8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    console.log(`Received input: ${inputStdin}`);
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    console.log('End of input stream.');
    inputString = inputString.trim().split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    // Read input using readLine()
    const input = readLine();
    // Your code logic here
    console.log(`Input received: ${input}`);
}