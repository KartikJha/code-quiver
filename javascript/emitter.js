const childProcess = require('child_process');

const batchIdArr = [
    123,
    456,
    789
]

function* generateNumbersTill(limit) {
    console.log(`DEBUG K: ${limit}`)
    let index = 0;
    while (true) {
      console.log(`DEBUG K: ${index}`)
      console.log(`DEBUG K: ${batchIdArr[index++]}`)
      index %= limit;
      yield batchIdArr[index];
    }
}

const numSequence = generateNumbersTill(batchIdArr.length);

let batch = {
    // id: numSequence.next().value,
    data: [
        {
            message: 'Hey',
            id: Date.now() 
        },
        {
            message: 'Hi',
            id: Date.now() 
        },
        {
            message: 'Hello',
            id: Date.now() 
        },        
    ]
}


setInterval(() => {
    const batchWithId =  { ...batch, id: numSequence.next().value, timestamp: Date.now()};
    console.log(`DEBUG K: ${JSON.stringify(batchWithId)}`);
    childProcess.exec(`curl -d '${JSON.stringify(batchWithId)}' -H "Content-Type: application/json" -X POST robogun.com:3000/webhook/messages }`);
    //childProcess.exec(`curl -d "${JSON.stringify(batch)} -H "Content-Type: application/json" -X POST localhost:3000/webhook/messages }`);
}, 5000);


