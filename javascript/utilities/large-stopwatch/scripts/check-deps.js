const Utils = require('../lib/utils');

console.log('Setting up large-stopwatch...');
Utils.installSystemDependencies();

// test/test.js
const Stopwatch = require('../lib/stopwatch');

function testTimeParser() {
  const sw = new Stopwatch();
  
  const tests = [
    ['30.5', 30500],
    ['2:30.5', 150500],  
    ['1:15:30.5', 4530500],
    ['0', 0],
    ['120', 120000]
  ];

  console.log('Testing time parser...');
  
  tests.forEach(([input, expected]) => {
    const result = sw.parseTime(input);
    if (result === expected) {
      console.log(`✓ ${input} -> ${result}ms`);
    } else {
      console.log(`✗ ${input} -> ${result}ms (expected ${expected}ms)`);
    }
  });
}

if (require.main === module) {
  testTimeParser();
}
