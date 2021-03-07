import chalk from 'chalk';

if (process.argv[2]) {
    if (process.argv[3]) {
        const envExportString = Object.entries(JSON.parse(process.argv[2])).reduce((a, [k, v]) => a.concat(`export ${k}=${v}\n`), '');
        console.log(chalk.green(JSON.stringify(envExportString)));
    }
    else {
        const jsonO = process.argv[2].split('\n').filter((s) => s && !s.startsWith('#')).reduce((a, e) => {
            const pair = e.split(' ')[1];
            const eqI = pair.indexOf('=');
            const key = pair.slice(0, eqI), value = pair.slice(eqI + 1, pair.length);
            return {...a, [key]: value };
        }, {});
        console.log(chalk.green(JSON.stringify(jsonO)));
    }

}
else {
    console.log(chalk.red('Usage: node bash-env-to-json.js TEMPLATED_ENV_STRING [--reverse]\n'));
}


