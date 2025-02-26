// const a = new Promise((res, rej) => {
//     res(2);
//     setTimeout(() => {
//         console.log('Hello from promise')
//         res(true);
//     }, 3000);
// })

// a.then((val) => {
//    console.log(val); 
// });

// function printSomething() {
//     return "hello"
// }

// const p = console.log;

// new Promise((X, Y) => {
//     setTimeout(X, 5000, printSomething.toString());
// }).then(p);

// Array.prototype.customMap = function(callback) {
//     const that = new Array(...this);
//     console.log(this === that);
//     for (i = 0; i < that.length; i++) {
//         that[i] = callback(that[i], i);
//     }
//     return that;
// }



// const a = new Array(1, 2, 3, 4);

// console.log(a.customMap((e) => 2 * e));


//a.map()

/**
 * undefined
 */


/**
 * 2
 * Hello from promise
 * 
 */


// function createCounter() {
//     let count = 0;

//     function increment() {
//         count++;
//         return count;
//     }

//     function decrement() {
//         count--;
//         return count;
//     }

//     function reset() {
//         count = 0;
//         return count;
//     }

//     return {
//         increment,
//         decrement,
//         reset,
//     }
// }

// const counter = createCounter();
// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2
// console.log(counter.decrement()); // 1
// console.log(counter.reset());  



// console.log('Start');

// setTimeout(() => {
//   console.log('Timeout 1');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Promise 1');
// });

// console.log('End');


// function dino(callback, delay) {
//     let timerId;

//     return function () {
//         if (timerId) {
//             clearTimeout(timerId);
//         }
//         timerId = setTimeout(() => {
//             callback();
//             clearTimeout(timerId);
//         }, delay);
//     }
// }

// const log = dino(() => console.log('Debounced!'), 300);
// log();
// log();
// log(); // Only the last call logs after 300ms

// function sequentialPromiseChaining(tasks, initialVal) {
//     for (let i = 0; i < tasks.length; i++) {
//         initialVal = tasks[i](initialVal);
//     }
// }

// const greeting = cycle('Hello!!');
// greeting(); // Hello!
// greeting(); // Hello!
// const repeatMe = cycle(1,2,3,4);
// repeatMe(); // 1
// repeatMe(); // 2
// repeatMe(); // 3
// repeatMe(); // 4
// repeatMe(); // 1

// function isSubsequence(subseq, y) {
//     let i = 0, j = 0;
//     while (i < subseq.length && j < y.length) {
//         if (subseq[i] === y[j]) i++;
//         j++;
//     }
//     return i === subseq.length;
// }

// function longestSubsequenceLength(x, y) {
//     const m = x.length;
    
//     // dp[i] stores all subsequences of length i
//     const dp = Array.from({ length: m + 1 }, () => new Set());
//     dp[0].add(""); // Empty subsequence

//     for (let char of x) {
//         for (let len = m; len > 0; len--) {
//             for (let subseq of dp[len - 1]) {
//                 dp[len].add(subseq + char);
//             }
//         }
//     }

//     // Check from longest to shortest subsequence
//     for (let len = m; len > 0; len--) {
//         for (let subseq of dp[len]) {
//             if (y.includes(subseq)) return len; // Found the longest valid subsequence
//         }
//     }

//     return 0;
// }

// // Example Usage
// const x = "pxmfjrmvkehafjpxrehkkqcqbjpcmxymsgnfdzzplkdaewzoteyavwwzcnbtsrxyccjxfmbwsfquqelpicmmvymatfvwpemabhlxpjxuywludjhkfwpyowvnkpupalimnnecvtesblatxnewkywvvohdbgfavjxumqhvkznutjpowuvhmnyvzbykuzmchbnlmuiavdfbcuutaqqgiwhjefmcapfisdtohavoputtnhzecalriymlnfabvtbkhtnpenxkbtubuyskwykpablacspjkanwlnxeuuksccptvtqwomusmvuygfdmbkftbdlwmmxeudbdknqudfcrsaefetouygyejfelfqoqvhfabprdbjcihqrzfdbqcafvoowjskqwzironkxxsqedgbycvhnuskhdkkgfpggahvuznqytlldquvbofbxafrxmnbaignazengaxngdobatpmqfzghlamzuoelwvajlvzbuoxwluxqhsmcj";
// const y = "ohazmsexovixkuuneqnzdhhsweyjmrevqszglreqzacuzefaszzyzramuctxeusmzmtajezzfnrqmmmcyvrogrhntqwlbfpatgjxlweewaiaqidxrqplxdudscuqhrfjtqvksksnfmfhcodvghtkgzojpzytmdcimjzwaonnwmhmsaacnrblvvzhwbiokgziuvsfersuxiiydcfcvnkpbzljsqrqtgmhywkjxlxsixlxrwsnyypjkoxgtyczbouvojmfoqptnqfkvrynavuywnemedlvbvlafhorcfpqixphfwoybefcsbubegqmhcgyfbetfsyuqbadugfylowmzrifijkzlpawkewixgcfvqxapcyzpegrzrqczfdssgvspnjktlshhjqvvlkcmvwtwclpfwlwwulvfvmnnzldpiotcalpktbklalusufgbkrqgzdbagtqzlzealvq";

// console.log(longestSubsequenceLength(x, y)); // Output: 64



// function maxEvenSum(arr) {
    // let sum = 0;
    // let minOdd = Infinity;
    
    // for (let num of arr) {
    //     if (num > 0) {
    //         sum += num;
    //         if (num % 2 !== 0) {
    //             minOdd = Math.min(minOdd, num);
    //         }
    //     }
    // }
    
    // // If the sum is even, return it
    // if (sum % 2 === 0) return sum;

    // // If the sum is odd, remove the smallest odd number
    // return minOdd !== Infinity ? sum - minOdd : 0;

// }


// console.log(maxEvenSum([6, 3, 4, -1, 9, 17]))


// function longestSubsequenceLength(x, y) {
//     const m = x.length, n = y.length;

//     // Helper function to check if a given subsequence of x is a substring of y
//     function isSubsequenceSubstring(subseq) {
//         return y.includes(subseq);
//     }

//     // DP approach to generate all increasing subsequences of x
//     let dp = Array(m).fill("").map(() => []);
    
//     for (let i = 0; i < m; i++) {
//         dp[i].push(x[i]); // Single character subsequences

//         for (let j = 0; j < i; j++) {
//             for (const sub of dp[j]) {
//                 const newSub = sub + x[i]; // Extend the previous subsequence
//                 dp[i].push(newSub);
//             }
//         }
//     }

//     // Flatten and sort subsequences by length (descending)
//     let allSubsequences = dp.flat().sort((a, b) => b.length - a.length);

//     // Find the longest valid subsequence that is a substring of y
//     for (const subseq of allSubsequences) {
//         if (isSubsequenceSubstring(subseq)) {
//             return subseq.length;
//         }
//     }

//     return 0;
// }

// console.log(longestSubsequenceLength(    "hackerranks",

//     "hackers"));

// // Example Test Cases
// console.log(longestSubsequenceLength(
//     "dvxvsqdvrbnkbfxymdzdmaavwvpoxfzcviujlpmmnbuklcarcqcovavuigotmnkzjdqwzjdqkohcijeqvmoryhhfiszqbkhjlnrktnoqtbketyseimvuadewbziuchpfgnyzvlxozzfkwupuylygbqqvyjfdlvpsgncrrefxsxeoznsrreflgbmsedzftthqoascmgqlxxjmpgozpiqkvwvvrzlkeshvmnqrmesvczgudpnzbofyabksvjyzxtirfsolepmbalegnwgbaspdolecqexnbhuxgacfvgcnjoqdjisqdmzkegazzdnzrmszstptilumssfvolxgmfwqxmbjznwfjfhyswkzmsfqvbogwyfcccopwkuedyhxtdopfurolxbxlfjjajbyrfbuhzfqzkqvntgoiyenwffehyqraojypwahtvhqffloxenkdnwpwlgerbjabwwfqyspbjmsillknmjsrurrradttaethzfyqcxa",
//     "dfkowfontyapclduozzlmkjonizpdxtvcyhwnimknetlfxrhcuahzrlgrbcbmytovmuqcnlpvhlvhllvqhgwwuuexpcwmtmzkfvxpgubnvivsvwxukeksadnvqedjykhlqcizbokijdztcqfobrpazdgszuzzbefkmiwuocwokjiwijjlsqzktnpylrusjecxcovekmedgdwuwbpramestddowojaeuoxtbtuazhsohcrvqoalgmqppqxmpsnwstvfjxnaodwmehhuntratafjjgvvfvbqwcpmjcpplbtowtkvwaexwyurwfxtpnxgacteyohyrxwtgpxcfkjpjcwicwzcazckftxonarwcqlpdymuxezdnvqoojcauzikhapxtnkkzgkhwvntnndfcpmucvuomwvmfnqtmvazfnzwpygblvgrsrbmftthxxgozvrkeqecdyximabdcnhfvngzmsfxfwmjwjfkzudhljrzzqvgifyyphqloxnjbqylmjsrrtahzqc"
// ));  // Expected Output: 122


const har = {
    "log": {
      "version": "1.2",
      "creator": {
        "name": "Firefox",
        "version": "130.0"
      },
      "browser": {
        "name": "Firefox",
        "version": "130.0"
      },
      "pages": [
        {
          "id": "page_1",
          "pageTimings": {
            "onContentLoad": 630,
            "onLoad": 882
          },
          "startedDateTime": "2025-02-26T00:01:46.857+05:30",
          "title": "https://ma.puffles.io/mint/wltest1522"
        }
      ],
      "entries": [
        {
          "startedDateTime": "2025-02-26T00:01:46.857+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ma.puffles.io/api/auth/session",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ma.puffles.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/mint/wltest1522"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Cookie",
                "value": "_ga_3XVZ6HMM5F=GS1.1.1740508255.6.1.1740508295.0.0.0; _ga=GA1.1.1367464358.1739811514; __Host-next-auth.csrf-token=e91558490887473474810c8db12a66b4347e79305abe4b550a9620dcf34674c4%7C7d1a1c1c3bb6e67c2d147209f52b92cc89b7a3367003de97f087dc93c8202d21; __Secure-next-auth.callback-url=https%3A%2F%2Fma.puffles.io"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "same-origin"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Pragma",
                "value": "no-cache"
              },
              {
                "name": "Cache-Control",
                "value": "no-cache"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [
              {
                "name": "_ga_3XVZ6HMM5F",
                "value": "GS1.1.1740508255.6.1.1740508295.0.0.0"
              },
              {
                "name": "_ga",
                "value": "GA1.1.1367464358.1739811514"
              },
              {
                "name": "__Host-next-auth.csrf-token",
                "value": "e91558490887473474810c8db12a66b4347e79305abe4b550a9620dcf34674c4|7d1a1c1c3bb6e67c2d147209f52b92cc89b7a3367003de97f087dc93c8202d21"
              },
              {
                "name": "__Secure-next-auth.callback-url",
                "value": "https://ma.puffles.io"
              }
            ],
            "queryString": [],
            "headersSize": 780
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "age",
                "value": "0"
              },
              {
                "name": "cache-control",
                "value": "public, max-age=0, must-revalidate"
              },
              {
                "name": "content-type",
                "value": "application/json; charset=utf-8"
              },
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:46 GMT"
              },
              {
                "name": "etag",
                "value": "\"bwc9mymkdm2\""
              },
              {
                "name": "server",
                "value": "Vercel"
              },
              {
                "name": "strict-transport-security",
                "value": "max-age=63072000"
              },
              {
                "name": "x-matched-path",
                "value": "/api/auth/[...nextauth]"
              },
              {
                "name": "x-vercel-cache",
                "value": "MISS"
              },
              {
                "name": "x-vercel-id",
                "value": "bom1::iad1::n2xw9-1740508306875-2e2d899dd3a0"
              },
              {
                "name": "content-length",
                "value": "2"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "application/json; charset=utf-8",
              "size": 2,
              "text": "{}"
            },
            "redirectURL": "",
            "headersSize": 401,
            "bodySize": 403
          },
          "cache": {},
          "timings": {
            "blocked": -1,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 245,
            "receive": 0
          },
          "time": 245,
          "_securityState": "secure",
          "serverIPAddress": "76.76.21.98",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:46.900+05:30",
          "request": {
            "bodySize": 37,
            "method": "POST",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "application/json"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              },
              {
                "name": "ngrok-skip-browser-warning",
                "value": "true"
              },
              {
                "name": "Content-Length",
                "value": "37"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Pragma",
                "value": "no-cache"
              },
              {
                "name": "Cache-Control",
                "value": "no-cache"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 578,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"title\":\"search\",\"URI\":\"wltest1522\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:47 GMT"
              },
              {
                "name": "content-type",
                "value": "text/plain; charset=utf-8"
              },
              {
                "name": "content-length",
                "value": "3530"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnCi9MBcwEMPA="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain; charset=utf-8",
              "size": 3530,
              "text": "{\"status\":true,\"message\":{\"_id\":\"67be01500654b7b46538656a\",\"PK\":\"ADR#0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"SK\":\"ART#8a6bf7f4-8a64-4be2-b4e4-193bf6262ca7\",\"metadataUrls\":[\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/2\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/3\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/4\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/5\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/6\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/7\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/8\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/9\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/10\"],\"timestamp\":\"2025-02-25T17:43:44.742Z\",\"ip\":\"122.169.93.104\",\"nft_count\":15,\"thumbnail\":\"1740505429248jpeg\",\"URI\":\"wltest1522\",\"URI_status\":true,\"title\":\"wltest15\",\"theme\":1,\"address\":\"0xaADa84022C6402a5fef5ed0706d4CbBaa294473c\",\"chain\":\"Apechain Mainnet\",\"mint_structure\":{\"title\":\"Whitelist + Public\",\"theme\":[{\"title\":\"Modern\",\"id\":\"modern\"},{\"title\":\"Classic\",\"id\":\"classic\"}],\"type\":\"wl_public\",\"pricing\":[{\"title\":\"Whitelist + Public\",\"options\":[{\"field_type\":\"number\",\"state\":\"total_supply\",\"title\":\"Total Supply\",\"value\":15}]},{\"title\":\"Phase 1\",\"startTime\":1740505800,\"endTime\":1740509100,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.005\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Phase 2\",\"startTime\":1740509400,\"endTime\":1740512700,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.006\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Public\",\"startTime\":1740516300,\"endTime\":0,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.007\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Max Tokens per wallet (Global)\",\"value\":\"5\"}]}]},\"mint_structure_type\":\"Whitelist + Public\",\"revenue_shares\":{\"shares\":[{\"id\":\"8b05eaea-0888-4014-9fda-77a72c95983c\",\"address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"share\":95}]},\"revenue_split_address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"list\":{\"twitter\":\"\",\"opensea\":\"\",\"etherscan\":\"https://apescan.io/address/0xaADa84022C6402a5fef5ed0706d4CbBaa294473c#readContract\"},\"linkGenerated\":true,\"whitelist\":[\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0x28C1edC3f91e167a93E34452af6023D10893ac49\",\"0xe12D1fEb86054E9554A212B1F2A4227E9f700e51\",\"0x658e54e4578A46D251ABa72380AFB2D08D8ccC30\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0xb26fbf5fbd32a095f925ffbc71073261e1081573\",\"0x735eda0472f8a05f3828cc404082f1c375c273a5\",\"0x483b613641720bdd7848f4d90a01883141b753db\",\"0x8d067b54a1310ac962eb846363ae407de6588d74\",\"0xac8d8062c36b3409f5889b647477e30997b8f4d5\",\"0xca3a2224b60140f86ab1e58ced0f894342fc6ee2\",\"0xc97e8b0baba04f0ddf1d9a7631031e1a240f34d9\",\"0x47efa06855b712ea57254b6aa256e8d58e4e87ab\",\"0xbebd0675d33093284f63e56779b41407fba77835\"],\"total_minted_count\":0}}"
            },
            "redirectURL": "",
            "headersSize": 202,
            "bodySize": 3732
          },
          "cache": {},
          "timings": {
            "blocked": -1,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 465,
            "receive": 0
          },
          "time": 465,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:46.908+05:30",
          "request": {
            "bodySize": 0,
            "method": "OPTIONS",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Access-Control-Request-Method",
                "value": "POST"
              },
              {
                "name": "Access-Control-Request-Headers",
                "value": "content-type,ngrok-skip-browser-warning"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Pragma",
                "value": "no-cache"
              },
              {
                "name": "Cache-Control",
                "value": "no-cache"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 592
          },
          "response": {
            "status": 204,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:46 GMT"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-methods",
                "value": "*"
              },
              {
                "name": "access-control-allow-headers",
                "value": "*"
              },
              {
                "name": "access-control-max-age",
                "value": "0"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnBh01BcwEMjQ="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 232,
            "bodySize": 232
          },
          "cache": {},
          "timings": {
            "blocked": 44,
            "dns": 0,
            "connect": 27,
            "ssl": 0,
            "send": 0,
            "wait": 32,
            "receive": 0
          },
          "time": 103,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.042+05:30",
          "request": {
            "bodySize": 0,
            "method": "POST",
            "url": "https://www.google-analytics.com/g/collect?v=2&tid=G-3XVZ6HMM5F&gtm=45je52o0v9192107169za200&_p=1740508306969&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101732279~101732281~102067808~102482433~102539968~102558064~102587591~102605417~102640600~102658453~102717421&cid=1367464358.1739811514&ul=en-us&sr=1920x1080&frm=0&pscdl=noapi&_s=1&sid=1740508255&sct=6&seg=1&dl=https%3A%2F%2Fma.puffles.io%2Fmint%2Fwltest1522&dt=Puffles%20-%20Mint%20Page&en=page_view&_ee=1&tfd=996",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "www.google-analytics.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "no-cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=6"
              },
              {
                "name": "Pragma",
                "value": "no-cache"
              },
              {
                "name": "Cache-Control",
                "value": "no-cache"
              },
              {
                "name": "Content-Length",
                "value": "0"
              }
            ],
            "cookies": [],
            "queryString": [
              {
                "name": "v",
                "value": "2"
              },
              {
                "name": "tid",
                "value": "G-3XVZ6HMM5F"
              },
              {
                "name": "gtm",
                "value": "45je52o0v9192107169za200"
              },
              {
                "name": "_p",
                "value": "1740508306969"
              },
              {
                "name": "gcd",
                "value": "13l3l3l3l1l1"
              },
              {
                "name": "npa",
                "value": "0"
              },
              {
                "name": "dma",
                "value": "0"
              },
              {
                "name": "tag_exp",
                "value": "101732279~101732281~102067808~102482433~102539968~102558064~102587591~102605417~102640600~102658453~102717421"
              },
              {
                "name": "cid",
                "value": "1367464358.1739811514"
              },
              {
                "name": "ul",
                "value": "en-us"
              },
              {
                "name": "sr",
                "value": "1920x1080"
              },
              {
                "name": "frm",
                "value": "0"
              },
              {
                "name": "pscdl",
                "value": "noapi"
              },
              {
                "name": "_s",
                "value": "1"
              },
              {
                "name": "sid",
                "value": "1740508255"
              },
              {
                "name": "sct",
                "value": "6"
              },
              {
                "name": "seg",
                "value": "1"
              },
              {
                "name": "dl",
                "value": "https://ma.puffles.io/mint/wltest1522"
              },
              {
                "name": "dt",
                "value": "Puffles - Mint Page"
              },
              {
                "name": "en",
                "value": "page_view"
              },
              {
                "name": "_ee",
                "value": "1"
              },
              {
                "name": "tfd",
                "value": "996"
              }
            ],
            "headersSize": 892
          },
          "response": {
            "status": 204,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:47 GMT"
              },
              {
                "name": "pragma",
                "value": "no-cache"
              },
              {
                "name": "expires",
                "value": "Fri, 01 Jan 1990 00:00:00 GMT"
              },
              {
                "name": "cache-control",
                "value": "no-cache, no-store, must-revalidate"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "content-type",
                "value": "text/plain"
              },
              {
                "name": "cross-origin-resource-policy",
                "value": "cross-origin"
              },
              {
                "name": "content-security-policy-report-only",
                "value": "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/scaffolding/ascnsrsggc:86:0"
              },
              {
                "name": "cross-origin-opener-policy-report-only",
                "value": "same-origin; report-to=ascnsrsggc:86:0"
              },
              {
                "name": "report-to",
                "value": "{\"group\":\"ascnsrsggc:86:0\",\"max_age\":2592000,\"endpoints\":[{\"url\":\"https://csp.withgoogle.com/csp/report-to/scaffolding/ascnsrsggc:86:0\"}],}"
              },
              {
                "name": "server",
                "value": "Golfe2"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "alt-svc",
                "value": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 833,
            "bodySize": 833
          },
          "cache": {},
          "timings": {
            "blocked": 138,
            "dns": 0,
            "connect": 53,
            "ssl": 84,
            "send": 0,
            "wait": 74,
            "receive": 0
          },
          "time": 349,
          "_securityState": "secure",
          "serverIPAddress": "2404:6800:4007:81a::200e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.492+05:30",
          "request": {
            "bodySize": 41,
            "method": "POST",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "application/json"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              },
              {
                "name": "ngrok-skip-browser-warning",
                "value": "true"
              },
              {
                "name": "Content-Length",
                "value": "41"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 535,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"title\":\"wltest1522\",\"URI\":\"wltest1522\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:47 GMT"
              },
              {
                "name": "content-type",
                "value": "text/plain; charset=utf-8"
              },
              {
                "name": "content-length",
                "value": "3530"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnHjGbhcwEMaw="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain; charset=utf-8",
              "size": 3530,
              "text": "{\"status\":true,\"message\":{\"_id\":\"67be01500654b7b46538656a\",\"PK\":\"ADR#0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"SK\":\"ART#8a6bf7f4-8a64-4be2-b4e4-193bf6262ca7\",\"metadataUrls\":[\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/2\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/3\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/4\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/5\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/6\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/7\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/8\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/9\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/10\"],\"timestamp\":\"2025-02-25T17:43:44.742Z\",\"ip\":\"122.169.93.104\",\"nft_count\":15,\"thumbnail\":\"1740505429248jpeg\",\"URI\":\"wltest1522\",\"URI_status\":true,\"title\":\"wltest15\",\"theme\":1,\"address\":\"0xaADa84022C6402a5fef5ed0706d4CbBaa294473c\",\"chain\":\"Apechain Mainnet\",\"mint_structure\":{\"title\":\"Whitelist + Public\",\"theme\":[{\"title\":\"Modern\",\"id\":\"modern\"},{\"title\":\"Classic\",\"id\":\"classic\"}],\"type\":\"wl_public\",\"pricing\":[{\"title\":\"Whitelist + Public\",\"options\":[{\"field_type\":\"number\",\"state\":\"total_supply\",\"title\":\"Total Supply\",\"value\":15}]},{\"title\":\"Phase 1\",\"startTime\":1740505800,\"endTime\":1740509100,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.005\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Phase 2\",\"startTime\":1740509400,\"endTime\":1740512700,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.006\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Public\",\"startTime\":1740516300,\"endTime\":0,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.007\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Max Tokens per wallet (Global)\",\"value\":\"5\"}]}]},\"mint_structure_type\":\"Whitelist + Public\",\"revenue_shares\":{\"shares\":[{\"id\":\"8b05eaea-0888-4014-9fda-77a72c95983c\",\"address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"share\":95}]},\"revenue_split_address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"list\":{\"twitter\":\"\",\"opensea\":\"\",\"etherscan\":\"https://apescan.io/address/0xaADa84022C6402a5fef5ed0706d4CbBaa294473c#readContract\"},\"linkGenerated\":true,\"whitelist\":[\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0x28C1edC3f91e167a93E34452af6023D10893ac49\",\"0xe12D1fEb86054E9554A212B1F2A4227E9f700e51\",\"0x658e54e4578A46D251ABa72380AFB2D08D8ccC30\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0xb26fbf5fbd32a095f925ffbc71073261e1081573\",\"0x735eda0472f8a05f3828cc404082f1c375c273a5\",\"0x483b613641720bdd7848f4d90a01883141b753db\",\"0x8d067b54a1310ac962eb846363ae407de6588d74\",\"0xac8d8062c36b3409f5889b647477e30997b8f4d5\",\"0xca3a2224b60140f86ab1e58ced0f894342fc6ee2\",\"0xc97e8b0baba04f0ddf1d9a7631031e1a240f34d9\",\"0x47efa06855b712ea57254b6aa256e8d58e4e87ab\",\"0xbebd0675d33093284f63e56779b41407fba77835\"],\"total_minted_count\":0}}"
            },
            "redirectURL": "",
            "headersSize": 202,
            "bodySize": 3732
          },
          "cache": {},
          "timings": {
            "blocked": -1,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 443,
            "receive": 0
          },
          "time": 443,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.493+05:30",
          "request": {
            "bodySize": 0,
            "method": "OPTIONS",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Access-Control-Request-Method",
                "value": "POST"
              },
              {
                "name": "Access-Control-Request-Headers",
                "value": "content-type,ngrok-skip-browser-warning"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 549
          },
          "response": {
            "status": 204,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:47 GMT"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-methods",
                "value": "*"
              },
              {
                "name": "access-control-allow-headers",
                "value": "*"
              },
              {
                "name": "access-control-max-age",
                "value": "0"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnHh1XhcwEMjQ="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 232,
            "bodySize": 232
          },
          "cache": {},
          "timings": {
            "blocked": -1,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 37,
            "receive": 0
          },
          "time": 37,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.513+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ma.puffles.io/_next/static/css/310ffd0160f15337.css",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ma.puffles.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/mint/wltest1522"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Cookie",
                "value": "_ga_3XVZ6HMM5F=GS1.1.1740508255.6.1.1740508307.0.0.0; _ga=GA1.1.1367464358.1739811514; __Host-next-auth.csrf-token=e91558490887473474810c8db12a66b4347e79305abe4b550a9620dcf34674c4%7C7d1a1c1c3bb6e67c2d147209f52b92cc89b7a3367003de97f087dc93c8202d21; __Secure-next-auth.callback-url=https%3A%2F%2Fma.puffles.io"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "same-origin"
              }
            ],
            "cookies": [
              {
                "name": "_ga_3XVZ6HMM5F",
                "value": "GS1.1.1740508255.6.1.1740508307.0.0.0"
              },
              {
                "name": "_ga",
                "value": "GA1.1.1367464358.1739811514"
              },
              {
                "name": "__Host-next-auth.csrf-token",
                "value": "e91558490887473474810c8db12a66b4347e79305abe4b550a9620dcf34674c4|7d1a1c1c3bb6e67c2d147209f52b92cc89b7a3367003de97f087dc93c8202d21"
              },
              {
                "name": "__Secure-next-auth.callback-url",
                "value": "https://ma.puffles.io"
              }
            ],
            "queryString": [],
            "headersSize": 0
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "age",
                "value": "2145"
              },
              {
                "name": "cache-control",
                "value": "public,max-age=31536000,immutable"
              },
              {
                "name": "content-disposition",
                "value": "inline; filename=\"310ffd0160f15337.css\""
              },
              {
                "name": "content-encoding",
                "value": "br"
              },
              {
                "name": "content-type",
                "value": "text/css; charset=utf-8"
              },
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:46 GMT"
              },
              {
                "name": "etag",
                "value": "W/\"3bb6b8a14ddd4e04c6aa102e6fbaed3a\""
              },
              {
                "name": "last-modified",
                "value": "Tue, 25 Feb 2025 17:56:01 GMT"
              },
              {
                "name": "server",
                "value": "Vercel"
              },
              {
                "name": "strict-transport-security",
                "value": "max-age=63072000"
              },
              {
                "name": "x-matched-path",
                "value": "/_next/static/css/310ffd0160f15337.css"
              },
              {
                "name": "x-vercel-cache",
                "value": "HIT"
              },
              {
                "name": "x-vercel-id",
                "value": "bom1::sswws-1740508306282-51229f301c60"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/css; charset=utf-8",
              "size": 11040,
              "text": "@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/cf83d9a9314ace15-s.woff2) format(\"woff2\");unicode-range:u+0460-052f,u+1c80-1c8a,u+20b4,u+2de0-2dff,u+a640-a69f,u+fe2e-fe2f}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/f99d0f13e08eec38-s.woff2) format(\"woff2\");unicode-range:u+0301,u+0400-045f,u+0490-0491,u+04b0-04b1,u+2116}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/910c9cf6ce5a9237-s.woff2) format(\"woff2\");unicode-range:u+1f??}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/d6e71db82912037c-s.woff2) format(\"woff2\");unicode-range:u+0370-0377,u+037a-037f,u+0384-038a,u+038c,u+038e-03a1,u+03a3-03ff}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/412b56bcddc2e346-s.woff2) format(\"woff2\");unicode-range:u+0102-0103,u+0110-0111,u+0128-0129,u+0168-0169,u+01a0-01a1,u+01af-01b0,u+0300-0301,u+0303-0304,u+0308-0309,u+0323,u+0329,u+1ea0-1ef9,u+20ab}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/a45f4326d28270b6-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Inter_4ad8c2;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/af0f98f8abe3733a-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Inter_Fallback_4ad8c2;src:local(\"Arial\");ascent-override:90.20%;descent-override:22.48%;line-gap-override:0.00%;size-adjust:107.40%}.__className_4ad8c2{font-family:__Inter_4ad8c2,__Inter_Fallback_4ad8c2;font-weight:700;font-style:normal}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/a59d7bd9627a77dd-s.woff2) format(\"woff2\");unicode-range:u+0460-052f,u+1c80-1c8a,u+20b4,u+2de0-2dff,u+a640-a69f,u+fe2e-fe2f}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/b42529728e60f8ac-s.woff2) format(\"woff2\");unicode-range:u+0301,u+0400-045f,u+0490-0491,u+04b0-04b1,u+2116}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/75b5eda53d8a1864-s.woff2) format(\"woff2\");unicode-range:u+1f??}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/f18589f7100d2668-s.woff2) format(\"woff2\");unicode-range:u+0370-0377,u+037a-037f,u+0384-038a,u+038c,u+038e-03a1,u+03a3-03ff}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/3dd4ac5ee01e35f2-s.woff2) format(\"woff2\");unicode-range:u+0102-0103,u+0110-0111,u+0128-0129,u+0168-0169,u+01a0-01a1,u+01af-01b0,u+0300-0301,u+0303-0304,u+0308-0309,u+0323,u+0329,u+1ea0-1ef9,u+20ab}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/ef30d321fb7b89ce-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Inter_a31108;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/7a17f3930f2fadbd-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Inter_Fallback_a31108;src:local(\"Arial\");ascent-override:90.20%;descent-override:22.48%;line-gap-override:0.00%;size-adjust:107.40%}.__className_a31108{font-family:__Inter_a31108,__Inter_Fallback_a31108;font-weight:300;font-style:normal}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/ae357f7dee27bf4d-s.woff2) format(\"woff2\");unicode-range:u+0460-052f,u+1c80-1c8a,u+20b4,u+2de0-2dff,u+a640-a69f,u+fe2e-fe2f}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/3e9f63773af2fec9-s.woff2) format(\"woff2\");unicode-range:u+0301,u+0400-045f,u+0490-0491,u+04b0-04b1,u+2116}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/88a5a823296b8d02-s.woff2) format(\"woff2\");unicode-range:u+1f??}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/e4fef391e30775e8-s.woff2) format(\"woff2\");unicode-range:u+0370-0377,u+037a-037f,u+0384-038a,u+038c,u+038e-03a1,u+03a3-03ff}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/a23863eadbc4ef8d-s.woff2) format(\"woff2\");unicode-range:u+0102-0103,u+0110-0111,u+0128-0129,u+0168-0169,u+01a0-01a1,u+01af-01b0,u+0300-0301,u+0303-0304,u+0308-0309,u+0323,u+0329,u+1ea0-1ef9,u+20ab}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/9682870bf079cbd5-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Inter_eab0dd;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/415f6059eaa8a4bb-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Inter_Fallback_eab0dd;src:local(\"Arial\");ascent-override:90.20%;descent-override:22.48%;line-gap-override:0.00%;size-adjust:107.40%}.__className_eab0dd{font-family:__Inter_eab0dd,__Inter_Fallback_eab0dd;font-weight:500;font-style:normal}@font-face{font-family:__Poppins_6ec608;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/6c9a125e97d835e1-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Poppins_6ec608;font-style:normal;font-weight:300;font-display:swap;src:url(/_next/static/media/4c285fdca692ea22-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Poppins_Fallback_6ec608;src:local(\"Arial\");ascent-override:92.33%;descent-override:30.78%;line-gap-override:8.79%;size-adjust:113.73%}.__className_6ec608{font-family:__Poppins_6ec608,__Poppins_Fallback_6ec608;font-weight:300;font-style:normal}@font-face{font-family:__Poppins_6ad317;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/f10b8e9d91f3edcb-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Poppins_6ad317;font-style:normal;font-weight:500;font-display:swap;src:url(/_next/static/media/8888a3826f4a3af4-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Poppins_Fallback_6ad317;src:local(\"Arial\");ascent-override:92.33%;descent-override:30.78%;line-gap-override:8.79%;size-adjust:113.73%}.__className_6ad317{font-family:__Poppins_6ad317,__Poppins_Fallback_6ad317;font-weight:500;font-style:normal}@font-face{font-family:__Maitree_3e4030;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/a0696f2c603ff66e-s.woff2) format(\"woff2\");unicode-range:u+02d7,u+0303,u+0331,u+0e01-0e5b,u+200c-200d,u+25cc}@font-face{font-family:__Maitree_3e4030;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/5031a9001716e338-s.woff2) format(\"woff2\");unicode-range:u+0102-0103,u+0110-0111,u+0128-0129,u+0168-0169,u+01a0-01a1,u+01af-01b0,u+0300-0301,u+0303-0304,u+0308-0309,u+0323,u+0329,u+1ea0-1ef9,u+20ab}@font-face{font-family:__Maitree_3e4030;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/5c0947f2b0f84a64-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Maitree_3e4030;font-style:normal;font-weight:700;font-display:swap;src:url(/_next/static/media/8dacbfe062796eb0-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Maitree_Fallback_3e4030;src:local(\"Times New Roman\");ascent-override:97.85%;descent-override:42.54%;line-gap-override:0.00%;size-adjust:117.53%}.__className_3e4030{font-family:__Maitree_3e4030,__Maitree_Fallback_3e4030;font-weight:700;font-style:normal}@font-face{font-family:__Tiro_Telugu_f3c7d0;font-style:normal;font-weight:400;font-display:swap;src:url(/_next/static/media/5704da5db535d5b3-s.woff2) format(\"woff2\");unicode-range:u+0951-0952,u+0964-0965,u+0c00-0c7f,u+1cda,u+1cf2,u+200c-200d,u+25cc}@font-face{font-family:__Tiro_Telugu_f3c7d0;font-style:normal;font-weight:400;font-display:swap;src:url(/_next/static/media/022ce172df8ccf62-s.woff2) format(\"woff2\");unicode-range:u+0100-02ba,u+02bd-02c5,u+02c7-02cc,u+02ce-02d7,u+02dd-02ff,u+0304,u+0308,u+0329,u+1d00-1dbf,u+1e00-1e9f,u+1ef2-1eff,u+2020,u+20a0-20ab,u+20ad-20c0,u+2113,u+2c60-2c7f,u+a720-a7ff}@font-face{font-family:__Tiro_Telugu_f3c7d0;font-style:normal;font-weight:400;font-display:swap;src:url(/_next/static/media/5f284208c119214a-s.woff2) format(\"woff2\");unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd}@font-face{font-family:__Tiro_Telugu_Fallback_f3c7d0;src:local(\"Times New Roman\");ascent-override:66.95%;descent-override:21.72%;line-gap-override:70.40%;size-adjust:112.78%}.__className_f3c7d0{font-family:__Tiro_Telugu_f3c7d0,__Tiro_Telugu_Fallback_f3c7d0;font-weight:400;font-style:normal}"
            },
            "redirectURL": "",
            "headersSize": 0,
            "bodySize": 1413
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "ssl": 0,
            "connect": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.626+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=8e2abd1c137cc8c9e7a15fb709178311&sdkType=wcm&sdkVersion=js-2.6.2&page=1&entries=9&version=2",
            "httpVersion": "",
            "headers": [
              {
                "name": "Host",
                "value": "explorer-api.walletconnect.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              }
            ],
            "cookies": [],
            "queryString": [
              {
                "name": "projectId",
                "value": "8e2abd1c137cc8c9e7a15fb709178311"
              },
              {
                "name": "sdkType",
                "value": "wcm"
              },
              {
                "name": "sdkVersion",
                "value": "js-2.6.2"
              },
              {
                "name": "page",
                "value": "1"
              },
              {
                "name": "entries",
                "value": "9"
              },
              {
                "name": "version",
                "value": "2"
              }
            ],
            "headersSize": 531
          },
          "response": {
            "status": 0,
            "statusText": "",
            "httpVersion": "",
            "headers": [],
            "cookies": [],
            "content": {
              "mimeType": "application/json; charset=utf-8",
              "size": 7669,
              "text": "{\"listings\":{\"19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927\":{\"id\":\"19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927\",\"name\":\"Ledger Live\",\"homepage\":\"https://www.ledger.com/ledger-live\",\"image_id\":\"c20e1cec-05e8-4ac6-a086-7ce355092400\",\"order\":100,\"app\":{\"browser\":null,\"ios\":\"https://itunes.apple.com/app/id1361671700\",\"android\":\"https://play.google.com/store/apps/details?id=com.ledger.live\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":null,\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":null,\"rdns\":null,\"mobile\":{\"native\":\"ledgerlive://\",\"universal\":null},\"desktop\":{\"native\":\"ledgerlive://\",\"universal\":null}},\"ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18\":{\"id\":\"ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18\",\"name\":\"Zerion\",\"homepage\":\"https://zerion.io/\",\"image_id\":\"77c1d3dd-0213-400a-f9cc-bfd524c47f00\",\"order\":130,\"app\":{\"browser\":\"https://app.zerion.io\",\"ios\":\"https://apps.apple.com/app/id1456732565\",\"android\":\"https://play.google.com/store/apps/details?id=io.zerion.android&hl=en&gl=US\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":\"https://chrome.google.com/webstore/detail/zerion-wallet-for-web3-nf/klghhnkeealcohjjanjjdaeeggmfmlpl\",\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":[{\"injected_id\":\"isZerion\",\"namespace\":\"eip155\"}],\"rdns\":\"io.zerion.wallet\",\"mobile\":{\"native\":\"zerion://\",\"universal\":\"https://wallet.zerion.io/wc\"},\"desktop\":{\"native\":\"zerion://\",\"universal\":\"https://wallet.zerion.io\"}},\"5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489\":{\"id\":\"5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489\",\"name\":\"Fireblocks\",\"homepage\":\"https://www.fireblocks.com/\",\"image_id\":\"7e1514ba-932d-415d-1bdb-bccb6c2cbc00\",\"order\":230,\"app\":{\"browser\":\"https://console.fireblocks.io/\",\"ios\":\"https://apps.apple.com/us/app/fireblocks/id1439296596\",\"android\":\"https://play.google.com/store/apps/details?id=com.fireblocks.client&gl=IL\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":null,\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":null,\"rdns\":null,\"mobile\":{\"native\":\"fireblocks-wc://\",\"universal\":null},\"desktop\":{\"native\":null,\"universal\":\"https://console.fireblocks.io/v2/\"}},\"7ee7b95f4ae8b3e08aab5158be7fe8e71f79bcd3717594254b34fa1f3cd4611a\":{\"id\":\"7ee7b95f4ae8b3e08aab5158be7fe8e71f79bcd3717594254b34fa1f3cd4611a\",\"name\":\"Puzzle Wallet\",\"homepage\":\"https://puzzle.online\",\"image_id\":\"08cb0a68-6271-4e25-90c3-bcc3c0226a00\",\"order\":400,\"app\":{\"browser\":\"https://jigsaw-dev.puzzle.online\",\"ios\":\"https://apps.apple.com/au/app/puzzle-aleo-wallet/id6450268321\",\"android\":\"https://play.google.com/store/apps/details?id=online.puzzle\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":\"https://chromewebstore.google.com/detail/puzzle-aleo-wallet/fdchdcpieegfofnofhgdombfckhbcokj\",\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":null,\"rdns\":null,\"mobile\":{\"native\":\"puzzleapp://\",\"universal\":\"https://jigsaw-dev.puzzle.online/\"},\"desktop\":{\"native\":null,\"universal\":\"https://walletconnect.puzzle.online\"}},\"9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a\":{\"id\":\"9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a\",\"name\":\"SubWallet\",\"homepage\":\"https://www.subwallet.app/\",\"image_id\":\"03f5c08c-fb30-46a0-ca5c-d8fdd7250b00\",\"order\":420,\"app\":{\"browser\":null,\"ios\":\"https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285\",\"android\":\"https://play.google.com/store/apps/details?id=app.subwallet.mobile&hl=en_US\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":\"https://chrome.google.com/webstore/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn\",\"firefox\":\"https://addons.mozilla.org/en-US/firefox/addon/subwallet/\",\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":[{\"injected_id\":\"isSubWallet\",\"namespace\":\"eip155\"},{\"injected_id\":\"subwallet-js\",\"namespace\":\"polkadot\"}],\"rdns\":\"app.subwallet\",\"mobile\":{\"native\":\"subwallet://\",\"universal\":\"https://mobile.subwallet.app/\"},\"desktop\":{\"native\":\"subwallet://\",\"universal\":null}},\"a29498d225fa4b13468ff4d6cf4ae0ea4adcbd95f07ce8a843a1dee10b632f3f\":{\"id\":\"a29498d225fa4b13468ff4d6cf4ae0ea4adcbd95f07ce8a843a1dee10b632f3f\",\"name\":\"HashPack\",\"homepage\":\"https://hashpack.app\",\"image_id\":\"8d55dd5a-7c9f-4929-d2d1-00564e41ac00\",\"order\":490,\"app\":{\"browser\":\"https://wallet.hashpack.app/\",\"ios\":\"https://apps.apple.com/app/id6444389849\",\"android\":\"https://play.google.com/store/apps/details?id=app.hashpack.wallet.twa\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":\"https://chrome.google.com/webstore/detail/hashpack/gjagmgiddbbciopjhllkdnddhcglnemk\",\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":null,\"rdns\":\"com.hashpack.wallet\",\"mobile\":{\"native\":\"hashpack://\",\"universal\":\"https://link.hashpack.app\"},\"desktop\":{\"native\":null,\"universal\":\"https://link.hashpack.app\"}},\"f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c\":{\"id\":\"f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c\",\"name\":\"Core\",\"homepage\":\"https://core.app/?utm_source=referral&utm_medium=website&utm_campaign=walletconnect\",\"image_id\":\"35f9c46e-cc57-4aa7-315d-e6ccb2a1d600\",\"order\":510,\"app\":{\"browser\":\"https://core.app/?utm_source=referral&utm_medium=website&utm_campaign=walletconnect\",\"ios\":\"https://apps.apple.com/us/app/core-crypto-wallet-nfts/id6443685999\",\"android\":\"https://play.google.com/store/apps/details?id=com.avaxwallet&hl=en_US&gl=US\",\"mac\":null,\"windows\":null,\"linux\":null,\"chrome\":\"https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb\",\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":[{\"injected_id\":\"isAvalanche\",\"namespace\":\"eip155\"}],\"rdns\":\"app.core.extension\",\"mobile\":{\"native\":\"core://\",\"universal\":\"https://core.app\"},\"desktop\":{\"native\":\"core://\",\"universal\":null}},\"1aedbcfc1f31aade56ca34c38b0a1607b41cccfa3de93c946ef3b4ba2dfab11c\":{\"id\":\"1aedbcfc1f31aade56ca34c38b0a1607b41cccfa3de93c946ef3b4ba2dfab11c\",\"name\":\"OneKey\",\"homepage\":\"https://onekey.so\",\"image_id\":\"0720d396-1d61-4985-e240-3194484f3100\",\"order\":590,\"app\":{\"browser\":\"https://onekey.so\",\"ios\":\"https://apps.apple.com/us/app/onekey-open-source-wallet/id1609559473\",\"android\":\"https://play.google.com/store/apps/details?id=so.onekey.app.wallet&hl=en_US&gl=US\",\"mac\":\"https://github.com/OneKeyHQ/app-monorepo/releases\",\"windows\":\"https://github.com/OneKeyHQ/app-monorepo/releases\",\"linux\":\"https://github.com/OneKeyHQ/app-monorepo/releases\",\"chrome\":\"https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj\",\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":[{\"injected_id\":\"isOneKey\",\"namespace\":\"eip155\"},{\"injected_id\":\"isOneKey\",\"namespace\":\"solana\"}],\"rdns\":\"so.onekey.app.wallet\",\"mobile\":{\"native\":\"onekey-wallet://\",\"universal\":\"https://app.onekey.so/wc/connect\"},\"desktop\":{\"native\":\"onekey-wallet://\",\"universal\":\"https://app.onekey.so/wc/connect\"}},\"689e621a3585ca018fd44ff404bc89079a0e55e9c632574e8bf8d2b1c7918911\":{\"id\":\"689e621a3585ca018fd44ff404bc89079a0e55e9c632574e8bf8d2b1c7918911\",\"name\":\"GoodDollar\",\"homepage\":\"https://gooddollar.org\",\"image_id\":\"371ab65b-e2c8-4843-f18a-cbcf2ba2ed00\",\"order\":630,\"app\":{\"browser\":null,\"ios\":null,\"android\":\"https://play.google.com/store/apps/details?id=org.gooddollar\",\"mac\":\"\",\"windows\":null,\"linux\":null,\"chrome\":null,\"firefox\":null,\"safari\":null,\"edge\":null,\"opera\":null},\"injected\":null,\"rdns\":null,\"mobile\":{\"native\":\"gooddollar://\",\"universal\":\"https://wallet.gooddollar.org/\"},\"desktop\":{\"native\":\"gooddollar://\",\"universal\":\"https://wallet.gooddollar.org/\"}}},\"count\":9,\"total\":105}"
            },
            "redirectURL": "",
            "headersSize": 0,
            "bodySize": 2006
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.998+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "x-secret-key",
                "value": "X21_zM5s_9kJGyGn9ktLYXNVrFKRaqa2mTSsElRoO_Saxlevpk7v9acpju-8jFeCBK-e0vFrA_5iKPz4Xb6XFg"
              },
              {
                "name": "x-sdk-version",
                "value": "4.4.11"
              },
              {
                "name": "x-sdk-name",
                "value": "@thirdweb-dev/react"
              },
              {
                "name": "x-sdk-platform",
                "value": "browser"
              },
              {
                "name": "x-sdk-os",
                "value": "Linux"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 0
          },
          "response": {
            "status": 301,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:00 GMT"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "location",
                "value": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c510f952a748-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "application/json",
              "size": 623,
              "comment": "Response bodies are not included."
            },
            "redirectURL": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/",
            "headersSize": 0,
            "bodySize": 374
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "ssl": 0,
            "connect": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:47.999+05:30",
          "request": {
            "bodySize": 0,
            "method": "OPTIONS",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Access-Control-Request-Method",
                "value": "GET"
              },
              {
                "name": "Access-Control-Request-Headers",
                "value": "x-sdk-name,x-sdk-os,x-sdk-platform,x-sdk-version,x-secret-key"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 618
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-headers",
                "value": "x-sdk-name,x-sdk-os,x-sdk-platform,x-sdk-version,x-secret-key"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c63d0b83a7ca-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 339,
            "bodySize": 339
          },
          "cache": {},
          "timings": {
            "blocked": 23,
            "dns": 0,
            "connect": 7,
            "ssl": 0,
            "send": 0,
            "wait": 26,
            "receive": 0
          },
          "time": 56,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:3263:b3a8:14a:f559:5ac8",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.017+05:30",
          "request": {
            "bodySize": 41,
            "method": "POST",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "application/json"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Content-Type",
                "value": "application/json"
              },
              {
                "name": "ngrok-skip-browser-warning",
                "value": "true"
              },
              {
                "name": "Content-Length",
                "value": "41"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 535,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"title\":\"wltest1522\",\"URI\":\"wltest1522\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "text/plain; charset=utf-8"
              },
              {
                "name": "content-length",
                "value": "3530"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnMg19BcwEMVw="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain; charset=utf-8",
              "size": 3530,
              "text": "{\"status\":true,\"message\":{\"_id\":\"67be01500654b7b46538656a\",\"PK\":\"ADR#0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"SK\":\"ART#8a6bf7f4-8a64-4be2-b4e4-193bf6262ca7\",\"metadataUrls\":[\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/2\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/3\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/4\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/5\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/6\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/7\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/8\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/9\",\"ipfs://bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/10\"],\"timestamp\":\"2025-02-25T17:43:44.742Z\",\"ip\":\"122.169.93.104\",\"nft_count\":15,\"thumbnail\":\"1740505429248jpeg\",\"URI\":\"wltest1522\",\"URI_status\":true,\"title\":\"wltest15\",\"theme\":1,\"address\":\"0xaADa84022C6402a5fef5ed0706d4CbBaa294473c\",\"chain\":\"Apechain Mainnet\",\"mint_structure\":{\"title\":\"Whitelist + Public\",\"theme\":[{\"title\":\"Modern\",\"id\":\"modern\"},{\"title\":\"Classic\",\"id\":\"classic\"}],\"type\":\"wl_public\",\"pricing\":[{\"title\":\"Whitelist + Public\",\"options\":[{\"field_type\":\"number\",\"state\":\"total_supply\",\"title\":\"Total Supply\",\"value\":15}]},{\"title\":\"Phase 1\",\"startTime\":1740505800,\"endTime\":1740509100,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.005\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Phase 2\",\"startTime\":1740509400,\"endTime\":1740512700,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.006\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Tokens per wallet\",\"value\":\"5\"}]},{\"title\":\"Public\",\"startTime\":1740516300,\"endTime\":0,\"options\":[{\"field_type\":\"number\",\"state\":\"supply\",\"title\":\"Supply\",\"value\":5},{\"field_type\":\"number\",\"state\":\"token_price\",\"title\":\"Token price per NFT\",\"value\":\"0.007\"},{\"field_type\":\"number\",\"state\":\"token_per_wallet\",\"title\":\"Max Tokens per wallet (Global)\",\"value\":\"5\"}]}]},\"mint_structure_type\":\"Whitelist + Public\",\"revenue_shares\":{\"shares\":[{\"id\":\"8b05eaea-0888-4014-9fda-77a72c95983c\",\"address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"share\":95}]},\"revenue_split_address\":\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"list\":{\"twitter\":\"\",\"opensea\":\"\",\"etherscan\":\"https://apescan.io/address/0xaADa84022C6402a5fef5ed0706d4CbBaa294473c#readContract\"},\"linkGenerated\":true,\"whitelist\":[\"0x11aF04531D9EbAdD0FA9e56230fC09B57149EF42\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0x28C1edC3f91e167a93E34452af6023D10893ac49\",\"0xe12D1fEb86054E9554A212B1F2A4227E9f700e51\",\"0x658e54e4578A46D251ABa72380AFB2D08D8ccC30\",\"0x098FBcC766086D66377A3FF49e7D2cF57fE64954\",\"0xb26fbf5fbd32a095f925ffbc71073261e1081573\",\"0x735eda0472f8a05f3828cc404082f1c375c273a5\",\"0x483b613641720bdd7848f4d90a01883141b753db\",\"0x8d067b54a1310ac962eb846363ae407de6588d74\",\"0xac8d8062c36b3409f5889b647477e30997b8f4d5\",\"0xca3a2224b60140f86ab1e58ced0f894342fc6ee2\",\"0xc97e8b0baba04f0ddf1d9a7631031e1a240f34d9\",\"0x47efa06855b712ea57254b6aa256e8d58e4e87ab\",\"0xbebd0675d33093284f63e56779b41407fba77835\"],\"total_minted_count\":0}}"
            },
            "redirectURL": "",
            "headersSize": 202,
            "bodySize": 3732
          },
          "cache": {},
          "timings": {
            "blocked": -1,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 450,
            "receive": 0
          },
          "time": 450,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.018+05:30",
          "request": {
            "bodySize": 0,
            "method": "OPTIONS",
            "url": "https://hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com/address_by_URI",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "hwqjq3qi2e.execute-api.ap-south-1.amazonaws.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Access-Control-Request-Method",
                "value": "POST"
              },
              {
                "name": "Access-Control-Request-Headers",
                "value": "content-type,ngrok-skip-browser-warning"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 549
          },
          "response": {
            "status": 204,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-methods",
                "value": "*"
              },
              {
                "name": "access-control-allow-headers",
                "value": "*"
              },
              {
                "name": "access-control-max-age",
                "value": "0"
              },
              {
                "name": "apigw-requestid",
                "value": "GjbnMh4KhcwEMhw="
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 232,
            "bodySize": 232
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 30,
            "receive": 0
          },
          "time": 30,
          "_securityState": "secure",
          "serverIPAddress": "35.154.13.137",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.062+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "x-secret-key",
                "value": "X21_zM5s_9kJGyGn9ktLYXNVrFKRaqa2mTSsElRoO_Saxlevpk7v9acpju-8jFeCBK-e0vFrA_5iKPz4Xb6XFg"
              },
              {
                "name": "x-sdk-version",
                "value": "4.4.11"
              },
              {
                "name": "x-sdk-name",
                "value": "@thirdweb-dev/react"
              },
              {
                "name": "x-sdk-platform",
                "value": "browser"
              },
              {
                "name": "x-sdk-os",
                "value": "Linux"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 0
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:02 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "cf-ray",
                "value": "9179c5173c77a748-DEL"
              },
              {
                "name": "cf-cache-status",
                "value": "HIT"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "cache-control",
                "value": "public, max-age=315360000, immutable"
              },
              {
                "name": "content-encoding",
                "value": "gzip"
              },
              {
                "name": "etag",
                "value": "W/\"bafkreihpas7cvx5cqo4hqtg2v53yyru74lr4nuq2wlcqv4pptwd3yti5em\""
              },
              {
                "name": "vary",
                "value": "Origin, Accept-Encoding"
              },
              {
                "name": "access-control-allow-headers",
                "value": "Content-Type, Range, User-Agent, X-Requested-With"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "access-control-expose-headers",
                "value": "Content-Length, Content-Range, X-Chunked-Output, X-Ipfs-Path, X-Ipfs-Roots, X-Stream-Output"
              },
              {
                "name": "cache-tag",
                "value": "82585dde77583fdd41e37218fe33346556b8a25b09876cde6f298d2c00419751"
              },
              {
                "name": "content-security-policy",
                "value": "sandbox"
              },
              {
                "name": "cross-origin-resource-policy",
                "value": "cross-origin"
              },
              {
                "name": "x-ipfs-path",
                "value": "/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/"
              },
              {
                "name": "x-ipfs-pop",
                "value": "rainbow-sg1-03"
              },
              {
                "name": "x-ipfs-roots",
                "value": "bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4,bafkreihpas7cvx5cqo4hqtg2v53yyru74lr4nuq2wlcqv4pptwd3yti5em"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "application/json",
              "size": 623,
              "text": "{\"name\":\"Rocket Boys #0\",\"description\":\"Rocket Boys NFTs\",\"image\":\"ipfs://QmV7DF85JFGWw4ZYnPdd6QtuhCrWVNWWuUUHL8FxZxBjw1/gears_of_war_4_kait_jd_del-wallpaper-1366x768.jpg\",\"dna\":\"30f9a748be56893212278a090aa3d337843b3ff1\",\"edition\":0,\"date\":1693342263594,\"attributes\":[{\"trait_type\":\"Background\",\"value\":\"Teal Bear Texture\"},{\"trait_type\":\"Back\",\"value\":\"Weapons\"},{\"trait_type\":\"Body\",\"value\":\"Peach\"},{\"trait_type\":\"Wearing\",\"value\":\"Soldier Shirt\"},{\"trait_type\":\"Head\",\"value\":\"Guru\"},{\"trait_type\":\"Eye\",\"value\":\"Square Spectacles\"},{\"trait_type\":\"Ear\",\"value\":\"Earpods\"},{\"trait_type\":\"Mouth\",\"value\":\"Robotic Mask\"}]}"
            },
            "redirectURL": "",
            "headersSize": 0,
            "bodySize": 374
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "ssl": 0,
            "connect": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.063+05:30",
          "request": {
            "bodySize": 0,
            "method": "OPTIONS",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Access-Control-Request-Method",
                "value": "GET"
              },
              {
                "name": "Access-Control-Request-Headers",
                "value": "x-sdk-name,x-sdk-os,x-sdk-platform,x-sdk-version,x-secret-key"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 619
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-headers",
                "value": "x-sdk-name,x-sdk-os,x-sdk-platform,x-sdk-version,x-secret-key"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c63d4b9fa7ca-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 339,
            "bodySize": 339
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 11,
            "receive": 0
          },
          "time": 11,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:3263:b3a8:14a:f559:5ac8",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.090+05:30",
          "request": {
            "bodySize": 60,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "60"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 518,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_chainId\",\"params\":[],\"id\":42,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "content-length",
                "value": "43"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=90gr55wQLOSVQ4656jwUMKJzvdRO.qMfIVnE.ml_NJI-1740508308101-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c63d8b09a6d4-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "90gr55wQLOSVQ4656jwUMKJzvdRO.qMfIVnE.ml_NJI-1740508308101-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 43,
              "text": "{\"id\":42,\"jsonrpc\":\"2.0\",\"result\":\"0x8173\"}"
            },
            "redirectURL": "",
            "headersSize": 450,
            "bodySize": 493
          },
          "cache": {},
          "timings": {
            "blocked": 16,
            "dns": 0,
            "connect": 5,
            "ssl": 10,
            "send": 0,
            "wait": 30,
            "receive": 0
          },
          "time": 61,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.139+05:30",
          "request": {
            "bodySize": 60,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "60"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 518,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_chainId\",\"params\":[],\"id\":43,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "content-length",
                "value": "43"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=kXlH.68opoON9HqopcZB7V7BlU5kIyev1MLtRDmtRf0-1740508308125-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c63dbb27a6d4-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "kXlH.68opoON9HqopcZB7V7BlU5kIyev1MLtRDmtRf0-1740508308125-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 43,
              "text": "{\"id\":43,\"jsonrpc\":\"2.0\",\"result\":\"0x8173\"}"
            },
            "redirectURL": "",
            "headersSize": 450,
            "bodySize": 493
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 16,
            "receive": 0
          },
          "time": 16,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.159+05:30",
          "request": {
            "bodySize": 137,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "137"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 519,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_call\",\"params\":[{\"to\":\"0xaada84022c6402a5fef5ed0706d4cbbaa294473c\",\"data\":\"0x18160ddd\"},\"latest\"],\"id\":44,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "cf-ray",
                "value": "9179c63deb38a6d4-DEL"
              },
              {
                "name": "cf-cache-status",
                "value": "DYNAMIC"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "vary",
                "value": "Origin, Accept-Encoding"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "x-alchemy-trace-id",
                "value": "438359f171be9ce5bd5cfe9ada474d47"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=M53QDuooPm7wEACgoIiTtOpq1rgy0EfBeSrlbCz3C3E-1740508308479-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "content-encoding",
                "value": "gzip"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "M53QDuooPm7wEACgoIiTtOpq1rgy0EfBeSrlbCz3C3E-1740508308479-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 103,
              "text": "{\"jsonrpc\":\"2.0\",\"id\":44,\"result\":\"0x0000000000000000000000000000000000000000000000000000000000000002\"}"
            },
            "redirectURL": "",
            "headersSize": 542,
            "bodySize": 611
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 347,
            "receive": 0
          },
          "time": 347,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.513+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "x-secret-key",
                "value": "X21_zM5s_9kJGyGn9ktLYXNVrFKRaqa2mTSsElRoO_Saxlevpk7v9acpju-8jFeCBK-e0vFrA_5iKPz4Xb6XFg"
              },
              {
                "name": "x-sdk-version",
                "value": "4.4.11"
              },
              {
                "name": "x-sdk-name",
                "value": "@thirdweb-dev/react"
              },
              {
                "name": "x-sdk-platform",
                "value": "browser"
              },
              {
                "name": "x-sdk-os",
                "value": "Linux"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 0
          },
          "response": {
            "status": 301,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:00 GMT"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "location",
                "value": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c510f952a748-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "application/json",
              "size": 623,
              "comment": "Response bodies are not included."
            },
            "redirectURL": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/",
            "headersSize": 0,
            "bodySize": 374
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "ssl": 0,
            "connect": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.527+05:30",
          "request": {
            "bodySize": 0,
            "method": "GET",
            "url": "https://ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "ec28892eea59f2a5f609a56e7a2152d0.ipfscdn.io"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "x-secret-key",
                "value": "X21_zM5s_9kJGyGn9ktLYXNVrFKRaqa2mTSsElRoO_Saxlevpk7v9acpju-8jFeCBK-e0vFrA_5iKPz4Xb6XFg"
              },
              {
                "name": "x-sdk-version",
                "value": "4.4.11"
              },
              {
                "name": "x-sdk-name",
                "value": "@thirdweb-dev/react"
              },
              {
                "name": "x-sdk-platform",
                "value": "browser"
              },
              {
                "name": "x-sdk-os",
                "value": "Linux"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 0
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:02 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "cf-ray",
                "value": "9179c5173c77a748-DEL"
              },
              {
                "name": "cf-cache-status",
                "value": "HIT"
              },
              {
                "name": "access-control-allow-origin",
                "value": "*"
              },
              {
                "name": "cache-control",
                "value": "public, max-age=315360000, immutable"
              },
              {
                "name": "content-encoding",
                "value": "gzip"
              },
              {
                "name": "etag",
                "value": "W/\"bafkreihpas7cvx5cqo4hqtg2v53yyru74lr4nuq2wlcqv4pptwd3yti5em\""
              },
              {
                "name": "vary",
                "value": "Origin, Accept-Encoding"
              },
              {
                "name": "access-control-allow-headers",
                "value": "Content-Type, Range, User-Agent, X-Requested-With"
              },
              {
                "name": "access-control-allow-methods",
                "value": "GET, OPTIONS, HEAD"
              },
              {
                "name": "access-control-expose-headers",
                "value": "Content-Length, Content-Range, X-Chunked-Output, X-Ipfs-Path, X-Ipfs-Roots, X-Stream-Output"
              },
              {
                "name": "cache-tag",
                "value": "82585dde77583fdd41e37218fe33346556b8a25b09876cde6f298d2c00419751"
              },
              {
                "name": "content-security-policy",
                "value": "sandbox"
              },
              {
                "name": "cross-origin-resource-policy",
                "value": "cross-origin"
              },
              {
                "name": "x-ipfs-path",
                "value": "/ipfs/bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4/1/"
              },
              {
                "name": "x-ipfs-pop",
                "value": "rainbow-sg1-03"
              },
              {
                "name": "x-ipfs-roots",
                "value": "bafybeic4x4qzbwwgaxhdlgktfmdhooj77hj4fwfc4nie6fxkihapmy3lc4,bafkreihpas7cvx5cqo4hqtg2v53yyru74lr4nuq2wlcqv4pptwd3yti5em"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "application/json",
              "size": 623,
              "text": "{\"name\":\"Rocket Boys #0\",\"description\":\"Rocket Boys NFTs\",\"image\":\"ipfs://QmV7DF85JFGWw4ZYnPdd6QtuhCrWVNWWuUUHL8FxZxBjw1/gears_of_war_4_kait_jd_del-wallpaper-1366x768.jpg\",\"dna\":\"30f9a748be56893212278a090aa3d337843b3ff1\",\"edition\":0,\"date\":1693342263594,\"attributes\":[{\"trait_type\":\"Background\",\"value\":\"Teal Bear Texture\"},{\"trait_type\":\"Back\",\"value\":\"Weapons\"},{\"trait_type\":\"Body\",\"value\":\"Peach\"},{\"trait_type\":\"Wearing\",\"value\":\"Soldier Shirt\"},{\"trait_type\":\"Head\",\"value\":\"Guru\"},{\"trait_type\":\"Eye\",\"value\":\"Square Spectacles\"},{\"trait_type\":\"Ear\",\"value\":\"Earpods\"},{\"trait_type\":\"Mouth\",\"value\":\"Robotic Mask\"}]}"
            },
            "redirectURL": "",
            "headersSize": 0,
            "bodySize": 374
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "ssl": 0,
            "connect": 0,
            "send": 0,
            "wait": 0,
            "receive": 0
          },
          "time": 0,
          "_securityState": "secure",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.559+05:30",
          "request": {
            "bodySize": 60,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "60"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 518,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_chainId\",\"params\":[],\"id\":42,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "content-length",
                "value": "43"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=tPLuT3gWS8nF.2z8SqkuL0avNbNfvYrAVxRjQjQaVZ8-1740508308546-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c6405c6ba6d4-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "tPLuT3gWS8nF.2z8SqkuL0avNbNfvYrAVxRjQjQaVZ8-1740508308546-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 43,
              "text": "{\"id\":42,\"jsonrpc\":\"2.0\",\"result\":\"0x8173\"}"
            },
            "redirectURL": "",
            "headersSize": 450,
            "bodySize": 493
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 12,
            "receive": 0
          },
          "time": 12,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.574+05:30",
          "request": {
            "bodySize": 60,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "60"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 518,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_chainId\",\"params\":[],\"id\":43,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "content-length",
                "value": "43"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "vary",
                "value": "Accept-Encoding"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=4woX71si1_7owDo1Eu7WDycXNwy0xh73dHjFQK.dG88-1740508308560-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "cf-ray",
                "value": "9179c6407c6fa6d4-DEL"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "4woX71si1_7owDo1Eu7WDycXNwy0xh73dHjFQK.dG88-1740508308560-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 43,
              "text": "{\"id\":43,\"jsonrpc\":\"2.0\",\"result\":\"0x8173\"}"
            },
            "redirectURL": "",
            "headersSize": 450,
            "bodySize": 493
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 11,
            "receive": 0
          },
          "time": 11,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:48.589+05:30",
          "request": {
            "bodySize": 137,
            "method": "POST",
            "url": "https://apechain-mainnet.g.alchemy.com/v2/L2M5n90JUF5RHwqY_6uSCV8frMew81RZ",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "Host",
                "value": "apechain-mainnet.g.alchemy.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "Content-Length",
                "value": "137"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=4"
              },
              {
                "name": "Cache-Control",
                "value": "max-age=0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [],
            "headersSize": 519,
            "postData": {
              "mimeType": "application/json",
              "params": [],
              "text": "{\"method\":\"eth_call\",\"params\":[{\"to\":\"0xaada84022c6402a5fef5ed0706d4cbbaa294473c\",\"data\":\"0x18160ddd\"},\"latest\"],\"id\":44,\"jsonrpc\":\"2.0\"}"
            }
          },
          "response": {
            "status": 200,
            "statusText": "",
            "httpVersion": "HTTP/2",
            "headers": [
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:48 GMT"
              },
              {
                "name": "content-type",
                "value": "application/json"
              },
              {
                "name": "cf-ray",
                "value": "9179c6408c73a6d4-DEL"
              },
              {
                "name": "cf-cache-status",
                "value": "DYNAMIC"
              },
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "vary",
                "value": "Origin, Accept-Encoding"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "x-alchemy-trace-id",
                "value": "85b5ca1594348e1c5afb8b7b02bd8966"
              },
              {
                "name": "set-cookie",
                "value": "_cfuvid=jAgqdRUzWk0gH3wpK1p8FYC6E5iJYcnX5XZNYTHwUfA-1740508308875-0.0.1.1-604800000; path=/; domain=.g.alchemy.com; HttpOnly; Secure; SameSite=None"
              },
              {
                "name": "server",
                "value": "cloudflare"
              },
              {
                "name": "content-encoding",
                "value": "gzip"
              },
              {
                "name": "X-Firefox-Spdy",
                "value": "h2"
              }
            ],
            "cookies": [
              {
                "name": "_cfuvid",
                "value": "jAgqdRUzWk0gH3wpK1p8FYC6E5iJYcnX5XZNYTHwUfA-1740508308875-0.0.1.1-604800000"
              }
            ],
            "content": {
              "mimeType": "application/json",
              "size": 103,
              "text": "{\"jsonrpc\":\"2.0\",\"id\":44,\"result\":\"0x0000000000000000000000000000000000000000000000000000000000000002\"}"
            },
            "redirectURL": "",
            "headersSize": 542,
            "bodySize": 616
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 322,
            "receive": 0
          },
          "time": 322,
          "_securityState": "secure",
          "serverIPAddress": "2606:4700:8392:441e:2939:14a:6813:9d0e",
          "connection": "443",
          "pageref": "page_1"
        },
        {
          "startedDateTime": "2025-02-26T00:01:52.042+05:30",
          "request": {
            "bodySize": 0,
            "method": "POST",
            "url": "https://www.google-analytics.com/g/collect?v=2&tid=G-3XVZ6HMM5F&gtm=45je52o0v9192107169za200&_p=1740508306969&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101732279~101732281~102067808~102482433~102539968~102558064~102587591~102605417~102640600~102658453~102717421&cid=1367464358.1739811514&ul=en-us&sr=1920x1080&frm=0&pscdl=noapi&_eu=AEA&_s=2&sid=1740508255&sct=6&seg=1&dl=https%3A%2F%2Fma.puffles.io%2Fmint%2Fwltest1522&dt=Puffles%20-%20Mint%20Page&en=scroll&epn.percent_scrolled=90&tfd=5997",
            "httpVersion": "HTTP/3",
            "headers": [
              {
                "name": "Host",
                "value": "www.google-analytics.com"
              },
              {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
              },
              {
                "name": "Accept",
                "value": "*/*"
              },
              {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.5"
              },
              {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br, zstd"
              },
              {
                "name": "Referer",
                "value": "https://ma.puffles.io/"
              },
              {
                "name": "Origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "Alt-Used",
                "value": "www.google-analytics.com"
              },
              {
                "name": "Connection",
                "value": "keep-alive"
              },
              {
                "name": "Sec-Fetch-Dest",
                "value": "empty"
              },
              {
                "name": "Sec-Fetch-Mode",
                "value": "no-cors"
              },
              {
                "name": "Sec-Fetch-Site",
                "value": "cross-site"
              },
              {
                "name": "Priority",
                "value": "u=6"
              },
              {
                "name": "Pragma",
                "value": "no-cache"
              },
              {
                "name": "Cache-Control",
                "value": "no-cache"
              },
              {
                "name": "Content-Length",
                "value": "0"
              },
              {
                "name": "TE",
                "value": "trailers"
              }
            ],
            "cookies": [],
            "queryString": [
              {
                "name": "v",
                "value": "2"
              },
              {
                "name": "tid",
                "value": "G-3XVZ6HMM5F"
              },
              {
                "name": "gtm",
                "value": "45je52o0v9192107169za200"
              },
              {
                "name": "_p",
                "value": "1740508306969"
              },
              {
                "name": "gcd",
                "value": "13l3l3l3l1l1"
              },
              {
                "name": "npa",
                "value": "0"
              },
              {
                "name": "dma",
                "value": "0"
              },
              {
                "name": "tag_exp",
                "value": "101732279~101732281~102067808~102482433~102539968~102558064~102587591~102605417~102640600~102658453~102717421"
              },
              {
                "name": "cid",
                "value": "1367464358.1739811514"
              },
              {
                "name": "ul",
                "value": "en-us"
              },
              {
                "name": "sr",
                "value": "1920x1080"
              },
              {
                "name": "frm",
                "value": "0"
              },
              {
                "name": "pscdl",
                "value": "noapi"
              },
              {
                "name": "_eu",
                "value": "AEA"
              },
              {
                "name": "_s",
                "value": "2"
              },
              {
                "name": "sid",
                "value": "1740508255"
              },
              {
                "name": "sct",
                "value": "6"
              },
              {
                "name": "seg",
                "value": "1"
              },
              {
                "name": "dl",
                "value": "https://ma.puffles.io/mint/wltest1522"
              },
              {
                "name": "dt",
                "value": "Puffles - Mint Page"
              },
              {
                "name": "en",
                "value": "scroll"
              },
              {
                "name": "epn.percent_scrolled",
                "value": "90"
              },
              {
                "name": "tfd",
                "value": "5997"
              }
            ],
            "headersSize": 952
          },
          "response": {
            "status": 204,
            "statusText": "",
            "httpVersion": "HTTP/3",
            "headers": [
              {
                "name": "access-control-allow-origin",
                "value": "https://ma.puffles.io"
              },
              {
                "name": "date",
                "value": "Tue, 25 Feb 2025 18:31:52 GMT"
              },
              {
                "name": "pragma",
                "value": "no-cache"
              },
              {
                "name": "expires",
                "value": "Fri, 01 Jan 1990 00:00:00 GMT"
              },
              {
                "name": "cache-control",
                "value": "no-cache, no-store, must-revalidate"
              },
              {
                "name": "access-control-allow-credentials",
                "value": "true"
              },
              {
                "name": "content-type",
                "value": "text/plain"
              },
              {
                "name": "cross-origin-resource-policy",
                "value": "cross-origin"
              },
              {
                "name": "content-security-policy-report-only",
                "value": "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/scaffolding/ascnsrsggc:86:0"
              },
              {
                "name": "cross-origin-opener-policy-report-only",
                "value": "same-origin; report-to=ascnsrsggc:86:0"
              },
              {
                "name": "report-to",
                "value": "{\"group\":\"ascnsrsggc:86:0\",\"max_age\":2592000,\"endpoints\":[{\"url\":\"https://csp.withgoogle.com/csp/report-to/scaffolding/ascnsrsggc:86:0\"}],}"
              },
              {
                "name": "server",
                "value": "Golfe2"
              },
              {
                "name": "content-length",
                "value": "0"
              },
              {
                "name": "alt-svc",
                "value": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000"
              }
            ],
            "cookies": [],
            "content": {
              "mimeType": "text/plain",
              "size": 0,
              "text": ""
            },
            "redirectURL": "",
            "headersSize": 813,
            "bodySize": 813
          },
          "cache": {},
          "timings": {
            "blocked": 0,
            "dns": 0,
            "connect": 0,
            "ssl": 0,
            "send": 0,
            "wait": 70,
            "receive": 0
          },
          "time": 70,
          "_securityState": "secure",
          "serverIPAddress": "2404:6800:4007:81a::200e",
          "connection": "443",
          "pageref": "page_1"
        }
      ]
    }
  }



function getHighWaitTimeEntries(harData) {
  // Extract entries from HAR data
  const entries = harData.log.entries;
  
  // Filter entries where wait time > 200ms
  return entries.filter(entry => entry.timings.wait > 200);
}

console.log(getHighWaitTimeEntries(har));
