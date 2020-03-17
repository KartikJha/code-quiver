// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding('utf-8');
var stdin_input = '';

process.stdin.on('data', function(input) {
  stdin_input += input; // Reading input from STDIN
});

process.stdin.on('end', function() {
  main(stdin_input);
});

function main(input) {
  // process.stdout.write(input);       // Writing output to STDOUT
  const [line1, str, ...queries] = input.split('\n'); // O(n)
  process.stdout.write(getResult(str, queries.slice(0, queries.length - 1)));
}

export function getResult(str, queries) {
  console.log(str, queries);
  let result = '';
  let min = str.length;
  queries.forEach((query, i) => {
    // O(n)
    const [l, r] = query.split(' '); // O(n)
    const sub = str.substring(l - 1, r); // O(n)
    console.log(sub);
    const countForChar = {};
    for (let i = 0; i < sub.length; i++) {
      if (countForChar[sub[i]]) countForChar[sub[i]]++;
      else countForChar[sub[i]] = 1;
      if (countForChar[sub[i]] < min) {
        min = countForChar[sub[i]];
      }
    }
    console.log(countForChar, min);
    const change = Object.values(countForChar).reduce(
      (diff, count) => diff + (count - min),
      0
    );
    result += change;
    if (i !== queries.length - 1) {
      result += '\n';
    }
	});
	console.log(result);
  return result;
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail

// Write your code here
