const read_domain_storage = (async () => {
  // --- 1. Local Storage ---
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageData[key] = localStorage.getItem(key);
  }

  // --- 2. Session Storage ---
  const sessionStorageData = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionStorageData[key] = sessionStorage.getItem(key);
  }

  // --- 3. Cookies ---
  // document.cookie returns a single string
  const cookiesData = document.cookie.split(";").reduce((acc, c) => {
    const [name, ...rest] = c.trim().split("=");
    acc[name] = rest.join("=");
    return acc;
  }, {});

  // --- 4. IndexedDB ---
  async function getAllIndexedDB() {
    const dbs = await indexedDB.databases();
    const result = {};
    for (const dbInfo of dbs) {
      const dbName = dbInfo.name;
      result[dbName] = {};
      const request = indexedDB.open(dbName);
      await new Promise((resolve, reject) => {
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const objectStoreNames = db.objectStoreNames;
          const dbData = {};
          const txs = [];
          for (const storeName of objectStoreNames) {
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const getAllReq = store.getAll();
            txs.push(
              new Promise((res, rej) => {
                getAllReq.onsuccess = () => {
                  dbData[storeName] = getAllReq.result;
                  res();
                };
                getAllReq.onerror = () => rej(getAllReq.error);
              })
            );
          }
          Promise.all(txs)
            .then(() => {
              result[dbName] = dbData;
              db.close();
              resolve();
            })
            .catch(reject);
        };
      });
    }
    return result;
  }

  const indexedDBData = await getAllIndexedDB();

  // --- Combined Result ---
  console.log("LocalStorage:", localStorageData);
  console.log("SessionStorage:", sessionStorageData);
  console.log("Cookies:", cookiesData);
  console.log("IndexedDB:", indexedDBData);

  // If you want as JSON:
  const allData = {
    localStorage: localStorageData,
    sessionStorage: sessionStorageData,
    cookies: cookiesData,
    indexedDB: indexedDBData,
  };
  console.log("All storage data as JSON:", JSON.stringify(allData, null, 2));
});


const apply_domain_storage = (async (allData) => {
  if (!allData) {
    console.error("No data provided to restore.");
    return;
  }

  // --- 1. Restore LocalStorage ---
  if (allData.localStorage) {
    for (const key in allData.localStorage) {
      localStorage.setItem(key, allData.localStorage[key]);
    }
    console.log("LocalStorage restored.");
  }

  // --- 2. Restore SessionStorage ---
  if (allData.sessionStorage) {
    for (const key in allData.sessionStorage) {
      sessionStorage.setItem(key, allData.sessionStorage[key]);
    }
    console.log("SessionStorage restored.");
  }

  // --- 3. Restore Cookies ---
  if (allData.cookies) {
    for (const name in allData.cookies) {
      // Default path=/ and max-age=1 year
      document.cookie = `${name}=${allData.cookies[name]}; path=/; max-age=${60*60*24*365}`;
    }
    console.log("Cookies restored.");
  }

  // --- 4. Restore IndexedDB ---
  if (allData.indexedDB) {
    for (const dbName in allData.indexedDB) {
      const dbData = allData.indexedDB[dbName];
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (const storeName in dbData) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { autoIncrement: true });
          }
        }
      };
      request.onsuccess = (event) => {
        const db = event.target.result;
        const txs = [];
        for (const storeName in dbData) {
          const tx = db.transaction(storeName, "readwrite");
          const store = tx.objectStore(storeName);
          dbData[storeName].forEach(item => store.add(item));
          txs.push(new Promise((res, rej) => {
            tx.oncomplete = () => res();
            tx.onerror = () => rej(tx.error);
          }));
        }
        Promise.all(txs).then(() => {
          console.log(`IndexedDB "${dbName}" restored.`);
          db.close();
        }).catch(err => console.error(err));
      };
      request.onerror = (e) => console.error("DB open error:", e);
    }
  }
});

const val = {
  "localStorage": {
    "_grecaptcha": "09ANMylNBra6WGaUPgfO6XRoB5Sd1DocpE1Zu8Y5hZewSy50rL8AmsNa6BOlZUIeBy-nRT-Fu6TI6iot4T-aQXhHgeoMlaPLx38jq8ZgfjS-fNH1dyAiyoS4_sHCnYlfTi",
    "bounceLolomo": "false",
    "newUserTutorialStep-LUED35EOXVHKVGOFOSO2DLMTAQ": "{\"value\":4,\"expiry\":1760183366943}",
    "profile-edit": "0.05677186489947117"
  },
  "sessionStorage": {},
  "cookies": {
    "flwssn": "c636d35f-2907-4d25-87e7-d1399bdd887b",
    "nfvdid": "BQFmAAEBELKKG74t5q4IqHVv5oX7pchgTMYeXtbWBC8wxO_wvYGzFv2NIhHEJUWdKMiAWnvKmwtH3xdkDt7cEFWwcYG5Srxvwa-SlsEweqotB1e441cf3_FhqO0yAChm17_NnLt3-i45cY_O1SF20_dqkR223MZH",
    "SecureNetflixId": "v%3D3%26mac%3DAQEAEQABABT5VAW8lTN5nGQw9bdk8RXnUStNmWKlqiY.%26dt%3D1757591355152",
    "NetflixId": "v%3D3%26ct%3DBgjHlOvcAxL2ApzexET8AOdIK7mvQnWMSPceELBFUij0vgsOMiVOO7NkktX-Wd5WoTba5PNCHMxz-lUu_6klLKPTtElzlXDH86mKbEgvLpry7YumYS7atCQ2brPlUqfTT6CcHSqkSXZHD9ptz3a76Qm7TMQVaeCg5P_2jBgqCBm018JJBHInZwO6RABCbB-6Y9MULODZhCrAKZC9zvu3YOLGL09koTpT9SzySRpWhqiOPHcNdnn-ogVUL14-yZIbAc2BOecJLY5UG35sGKJtSXLZJmJsLL-jBPWts7Swe8wIjfEaubX1BiEUeSomd-98OBwWx3kC7A_YeHF_HMNNmxG1Yb4MaLZiW_WEw5a-FFbWhMctZ2nSUD-2UMm6m2E0-dAR1Mk3YpqZUDK2dByDxnIDX5oTtZqLub8NUoepfO554rKuskeOl24UunoMKmtfDgrHDr3zL2J51IEkf8JXYZSryDubGtsThrLCS608gWSIkmYEpO7boqQm_1CiXUNgGAYiDgoMELWXJEHJK99JNev0%26pg%3DLUED35EOXVHKVGOFOSO2DLMTAQ%26ch%3DAQEAEAABABS5sfeuJM_iNdxsQiQ719pQ2gMcueGA93k.",
    "netflix-sans-normal-3-loaded": "true",
    "netflix-sans-bold-3-loaded": "true",
    "OptanonConsent": "isGpcEnabled=0&datestamp=Thu+Sep+11+2025+18%3A02%3A46+GMT%2B0530+(India+Standard+Time)&version=202508.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=2b696160-741d-488d-91da-b6f0709397c1&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false",
    "profilesNewSession": "0"
  },
  "indexedDB": {
    "keyval-store": {
      "keyval": [
        "4931783718067394"
      ]
    },
    "netflix.player": {
      "namedatapairs": [
        {
          "name": "deviceid",
          "data": "MD5EL3TLR0Q0CH1A73LMP4HU5TWXRA"
        },
        {
          "name": "gh",
          "data": {
            "c": 3,
            "t": 1757594087173,
            "tp": {
              "a": 103.494,
              "s": 5128600,
              "n": 73
            },
            "itp": null,
            "tcii": null,
            "tcil": null,
            "tcih": null,
            "rt": {
              "a": 86.7094,
              "s": 94943.8,
              "n": 900
            },
            "hrt": {
              "a": 113.149,
              "s": 132834,
              "n": 3239
            },
            "iqr": null,
            "td": {
              "tdigest": "[{\"mean\":150,\"n\":0.9980764435756277},{\"mean\":155,\"n\":0.9985569855219018},{\"mean\":190.00004813522082,\"n\":1.9974023887480101},{\"mean\":216.0001925408811,\"n\":1.9963451039262026},{\"mean\":228.00192540879772,\"n\":1.997402444283774},{\"mean\":266.4042489210266,\"n\":4.995766944409534},{\"mean\":316.0028575152692,\"n\":6.995285744799339},{\"mean\":489.61505817133843,\"n\":5.989901638313665},{\"mean\":4140.049097925252,\"n\":1.9949041718190146},{\"mean\":26536.58779022869,\"n\":5.963148391067015},{\"mean\":42671.51157749045,\"n\":13.929236448998202},{\"mean\":53525.383338641346,\"n\":14.934786177858133},{\"mean\":57421.496143594464,\"n\":6.970606823494759},{\"mean\":58901.02233474242,\"n\":1.9903960979121968},{\"mean\":59553,\"n\":0.9957730593313181}]"
            },
            "dta": null,
            "dtv": null,
            "dtta": null,
            "dttv": null
          }
        },
        {
          "name": "lh",
          "data": {
            "2-24309-high": {
              "2406:7400:56:fe9f:dd5b:496d:5b1f:af21": {
                "g": {
                  "c": 3,
                  "t": 1757594014166,
                  "tp": {
                    "a": 2.97826,
                    "s": 64608.8,
                    "n": 11
                  },
                  "itp": null,
                  "tcii": null,
                  "tcil": null,
                  "tcih": null,
                  "rt": {
                    "a": 60.4635,
                    "s": 110345,
                    "n": 32
                  },
                  "hrt": {
                    "a": 115.449,
                    "s": 202338,
                    "n": 79
                  },
                  "iqr": null,
                  "td": {
                    "tdigest": "[{\"mean\":150,\"n\":0.9999037341921059},{\"mean\":215,\"n\":0.9998074776513174},{\"mean\":283.99812272639906,\"n\":1.9997112303767428},{\"mean\":402,\"n\":0.9996149923674896},{\"mean\":458,\"n\":0.9995187636226662},{\"mean\":741,\"n\":0.9994225441413807},{\"mean\":3120,\"n\":0.999230132965856},{\"mean\":5160,\"n\":0.9993263339227412},{\"mean\":25083,\"n\":0.999037758833783},{\"mean\":26004,\"n\":0.9991339412698339}]"
                  },
                  "dta": null,
                  "dtv": null,
                  "dtta": null,
                  "dttv": null
                },
                "h": [
                  null,
                  null,
                  null,
                  null
                ]
              }
            },
            "1-24309-high": {
              "2406:7400:56:fe9f:dd5b:496d:5b1f:af21": {
                "g": {
                  "c": 3,
                  "t": 1757594087173,
                  "tp": {
                    "a": 100.567,
                    "s": 5066380,
                    "n": 62
                  },
                  "itp": null,
                  "tcii": null,
                  "tcil": null,
                  "tcih": null,
                  "rt": {
                    "a": 49.2771,
                    "s": 8743.59,
                    "n": 868
                  },
                  "hrt": {
                    "a": 61.9794,
                    "s": 17241.7,
                    "n": 3160
                  },
                  "iqr": null,
                  "td": {
                    "tdigest": "[{\"mean\":155,\"n\":0.998556985521902},{\"mean\":189,\"n\":0.9986531216714658},{\"mean\":191,\"n\":0.9987492670765445},{\"mean\":217,\"n\":0.9983647409857559},{\"mean\":300.9369385059136,\"n\":13.990954775365722},{\"mean\":556,\"n\":0.9982686325973917},{\"mean\":22294,\"n\":0.9941447124599048},{\"mean\":25881,\"n\":0.9942404238175447},{\"mean\":32509.143532318678,\"n\":3.9842433472012275},{\"mean\":40603.10592497522,\"n\":4.975798983552686},{\"mean\":45803.232816963486,\"n\":5.978766078080001},{\"mean\":49528.70899016516,\"n\":4.979156297807745},{\"mean\":53548.03010936606,\"n\":4.9844332762447},{\"mean\":54998.99306852956,\"n\":1.9902050718479791},{\"mean\":56740.37956666844,\"n\":3.988369019749461},{\"mean\":57421.496143594464,\"n\":6.976649011278281},{\"mean\":58669,\"n\":0.9959648048147461},{\"mean\":59133,\"n\":0.9961565872205735},{\"mean\":59553,\"n\":0.9966362048172996}]"
                  },
                  "dta": null,
                  "dtv": null,
                  "dtta": null,
                  "dttv": null
                },
                "h": [
                  null,
                  null,
                  null,
                  null
                ]
              }
            }
          }
        },
        {
          "name": "mslstore",
          "data": {
            "encryptionKey": {},
            "hmacKey": {},
            "esn": "NFCDFF-LX-MD5EL3TLR0Q0CH1A73LMP4HU5TWXRA",
            "masterTokenJSON": {
              "tokendata": "eyJzZXNzaW9uZGF0YSI6IkJRQ0FBQUVCRUNuSTVabW1wT2lYWHk4TTFCMStUTjZCUUdoZU0vbDRDR2RYamFvMnhmOE81RzlyYjNlcUw0V0RNYWpUbVZTdnNHOE9uVXJiUGt4VDVwS3ZsanBlVVpWRGtNSUZ3S0xrcjVoblZrWmJSOGREK0NXektYRjJsVjBPc1FZcy9JSmRpc1lxYVR3b3JiR1BsSVJUTlNqSDYvVExGN1pNWGlVY3o4c1B5SmtzemVtVlpIeWFmOFU1bVA2V2hRNXlkbjZsUXBMaU9ZaWFjOHlKRHVTV0lqYW1BRmlKYm1GWTRZTFhVc1hIWWtUQXJ1WUxhQi9qdVRRZGJFdmliR0NIZkI1Y0xQUG9UbTRSaitnNm1DZWU2Y0djS1p1dkY3Z240WFNwYUlrRUZrbHFWUGdjQ0R2MjNBMG5NN2hiN3F3ekpzcnBQKzZhM0NRQ0lrQjVxZG9mVXZpUVlibFgwc3FPdHJzd1E2Q0lyU01DZHlxSFdKbDhWcTVYcTM1NG1BNm9DRFoySWJGNzJVYlN2TWxnck5MbUlRZkxSUk1HT1REUmZoYUFiQjh0cGp0dVlwY0xkQXNvZW55dTJjNlNzSVZRd2QxQXhaYzgiLCJyZW5ld2Fsd2luZG93IjoxNzU3Njc3NzY3LCJzZXJpYWxudW1iZXIiOjMyMTMzMDMwNTgxOTgzNjIsImV4cGlyYXRpb24iOjE3NTg4MDA5NjcsInNlcXVlbmNlbnVtYmVyIjoxfQ==",
              "signature": "AQEAgQABASA9r13yL1tZ5Iyw89BeCxtHEtjXh5MldMo6kcclU+5qU3EL1DY="
            },
            "userList": [
              {
                "userId": "browser",
                "userIdTokenJSON": {
                  "tokendata": "eyJ1c2VyZGF0YSI6IkJRQ0FBQUVCRUFVRlpRUlNZVGdTaktXSGlQaW1ESFdCQUJEZUNDUnNzdWlKaXZuV1dGdzRzU2pWOGJ1djVUWlN6TDI0ci9nQzdzOGVIRGpWMks4eHJJN2RqNlNocnNIckIrQUhHcERZRTk5SnhVRkkxVUdWbEpyZmNWUllWWXRrRGFwRXhrUWV6UmVXeWRORXRtUHovL2xYSXVsbkI1RFZ5N1U5WmN5bFVxQnZRYkdRVFBmZmh4QXI0cHV5TGtkdW52TWFWQkU2b3l5QkpwUDN6T2FwNGgxUVNBTW1NZmsvcnNPcVc5dDY3OVFjY3ZGZkFoRmt3c2x4OGNPRU5VWjdYZGE5STdGOWY4VVVSdUlrVFNSUnp1RFJJZUhQc2E2M0ZmSkF0OXdjb1lVdkZiRVlabGVjUmZ5UHQ3ZHgzd3FUdmZqMjFHMXROakNMa2Q1UVdZdDU3RUNDaHZUanBrYTF5TDhXalA4YTJXQjJBQ2JMV0ZocDlYcz0iLCJtdHNlcmlhbG51bWJlciI6MzIxMzMwMzA1ODE5ODM2MiwicmVuZXdhbHdpbmRvdyI6MTc1NzYyMDE2Nywic2VyaWFsbnVtYmVyIjoxMzQ1NDgxOTM0NDY3NTcwLCJwcm9maWxlaWQiOiJMVUVEMzVFT1hWSEtWR09GT1NPMkRMTVRBUSIsImV4cGlyYXRpb24iOjE3NTg4MDA5Njd9",
                  "signature": "AQEAgQABASBg7jkOZNIXXNUz3H4JKI8UWnmzyroN0zCywBDO7eNvFCkg7Ng="
                },
                "serviceTokenJSONList": [
                  {
                    "tokendata": "eyJtdHNlcmlhbG51bWJlciI6MzIxMzMwMzA1ODE5ODM2MiwiZW5jcnlwdGVkIjp0cnVlLCJuYW1lIjoic2YiLCJzZXJ2aWNlZGF0YSI6IkJRQ1dBQUVCRUYzTjdGUjdNZkZVbHdEWHBPSUp3MVNBb0lmMDlIR283MytQSWx2WU54VDJnOUFCS0RpRndhVTh4ZzB3RnNlTm5kL2tGUmR6MHA0UXFlWk90Q2VXRmxxOFd0V1pVS0gzSVJiNXk3M0xHbGRYbkVpZnRkTngxMXZpMS9UNkt3TDdCWnVWdVZCYzE4N0RkdS9vZ211R3EzUTlSSFZCNlFiRXNseUxtdk9OcERVRmcydTM1OW5oSUVuM1ozVkRDYm0yY3l6K0Ftb1QyNDdDNjZPWmdST0lRaExRb1BwUFJNNWJoRlVIWERpN0NXYkFIRlU9IiwidWl0c2VyaWFsbnVtYmVyIjoxMzQ1NDgxOTM0NDY3NTcwfQ==",
                    "signature": "AQEAmAABASDDK3hq69/EV6g+YtQXo8cIg61mrJlbFFveFSJkLfjRHAKkbEk="
                  }
                ]
              }
            ]
          }
        },
        {
          "name": "nh",
          "data": {
            "t": 1757591358,
            "s": 0,
            "i": []
          }
        },
        {
          "name": "unsentplaydata",
          "data": {
            "version": 2,
            "data": []
          }
        }
      ]
    }
  }
};