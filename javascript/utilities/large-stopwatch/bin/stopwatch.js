#!/usr/bin/env node
const { program } = require('commander');
const Stopwatch = require('../lib/stopwatch');

program
  .name('stopwatch')
  .description('Large display terminal stopwatch with resume functionality')
  .version('1.0.0')
  .argument('[time]', 'Resume from previous time (formats: 30.5, 2:30.5, 1:15:30.5)', '0')
  .option('-f, --fancy', 'Use fancy colorful display')
  .option('-c, --compact', 'Use compact display without figlet')
  .option('-s, --silent', 'Start without initial messages')
  .parse();

const options = program.opts();
const resumeTime = program.args[0] || '0';

const stopwatch = new Stopwatch({
  fancy: options.fancy,
  compact: options.compact,
  silent: options.silent
});
stopwatch.start(resumeTime);
