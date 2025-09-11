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
