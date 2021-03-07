import initTerminal from './node-terminal.js';
import redis from 'redis';

const redisClient = redis.createClient(process.argv[3], process.argv[2]);

initTerminal(
    {
        'hmset': (...args) => {
            console.log(JSON.stringify(args));
            redisClient.hmset(args[0], JSON.parse(args[1].slice(1, args[1].length - 1)), (err) => {
                if (err) {
                    console.log('Error', err.message);
                }
                else {
                    console.log('Success');
                }
            });
        },
        'setlist': (...args) => {
            console.log(JSON.stringify(args));
            args[0].forEach((pair) => {
                redisClient.set(pair[0], pair[1], (err) => {
                    if (err) {
                        console.log('Error ', err.message);
                    }
                    else {
                        console.log('Success');
                    }
                });
            })
        },
        'decr': (...args) => {
            console.log(JSON.stringify(args));
            redisClient.decr(args[0], (err, reply) => {
                if (err) {
                    console.log('Error ', err.message);
                }
                else {
                    console.log('Success');
                }
            });
        },
        'getlist': (...args) => {
            console.log(JSON.stringify(args));
            args[0].forEach((pair) => {
                redisClient.set(pair[0], pair[1], (err) => {
                    if (err) {
                        console.log('Error ', err.message);
                    }
                    else {
                        console.log('Success');
                    }
                });
            })
        }
    },
    ['hmset', 'decr']
)