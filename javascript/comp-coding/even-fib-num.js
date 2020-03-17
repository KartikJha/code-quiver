const chalk = require('chalk');

const limit = process.argv.pop();

const seq = [1n, 2n];

let sum = 2n;

for (let i = 2n; 4000000 >= seq[i - 1n]; i++) {
	const next = seq[i - 1n] + seq[i - 2n];
	if (next % 2n === 0n) {
		sum += next;
	}
	seq[i] = next;
}

console.log(chalk.green(sum));