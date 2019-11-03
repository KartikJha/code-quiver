// import convert from 'xml-js';
// import chalk from 'chalk';
const convert = require('xml-js');
const chalk = require('chalk');

// console.log(JSON.stringify(process.argv));
const xmlString = process.argv[2];
const jsToXml = process.argv[3];

if (!xmlString) {
  console.log(chalk.red("Error"));
  return;
}


if (false) {
  const xmlString = convert.js2xml(a, {
    compact: true,
    ignoreComment: true,
    spaces: 4,
  });
  console.log("\n", chalk.blue("OUTPUT\n"), chalk.green(xmlString));
} else {
  const js = convert.xml2js(
    xmlString,
    {
      ignoreComment: true,
      alwaysChildren: true,
      compact: true,
    }
  );
  console.log("\n", chalk.blue("OUTPUT\n"), chalk.green(JSON.stringify(js)));
}
