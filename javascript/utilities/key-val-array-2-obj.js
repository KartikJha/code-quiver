import chalk from 'chalk';

const x = process.argv[2];

if (!x) {
    console.log(chalk.red('Usage: node app.js []'));
}
else {
    const t = x.split(/\t|\n/).filter((e) => e);
    let k = null;
    const res = {};
    t.forEach((e, i) => {
        if (i % 2 == 0) {
            k = e;
        }
        else {
            res[k] = e;
        }
    });
    console.log(chalk.green(JSON.stringify(res)));
}