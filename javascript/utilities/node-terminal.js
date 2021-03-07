import readline from 'readline';

const initTerminal = (handlerForCommand, commandList, prompt = 'NODE_TERM') => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: prompt + '>'
    });
    rl.prompt();
    rl.on('line', (line) => {
        const x = line.trim()
        const [tLine, ...args] = x.split(/\s+/);
        if (tLine == 'hello') {
            console.log('world!');
        }
        else if (tLine == 'help') {
            console.log(`Available commands:\n${commandList.join('\n')}`)
        }
        else if (!commandList.find((e) => e == tLine)) {
            console.log(`Say what? I might have read '${tLine}'`);
        }
        else {
            const handler = handlerForCommand[tLine];
            handler(...args);
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Have a great day!');
    })
};

export default initTerminal;