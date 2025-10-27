    const readline = require('readline')
     
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
     
     
    const input = []
    rl.on('line', (line) => {
      input.push(line);
    })
     
    rl.on('close', () => {
      solve(input)
    })
     
    function solve(input) {
        let line = 0;
        let t = parseInt(input[line++]);
        
        while (t--) {
            let n = parseInt(input[line++]);
            //let arr = input[line++].split(' ').map(Number);
            
            // Your solution logic
            console.log(n - 1);
        }
    }
