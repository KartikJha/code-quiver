const config = require('../config');
const { serviceReturn,  } = require();

function acquireLock({ key, payload, redis }) {

}

const acquireLock = ({ key, payload, redis }) => {
    
}

const redisStorageEngine = {
    set: (client, key, value) => {

    },
    get: (client, key, value) => {

    }
}

const inMemoryEngine = {
    set: (client, key, value) => {

    },
    get: (client, key, value) => {

    }
}

function setLock(key) {

}

function getLockStatus(key) {

}

function _getStorageEngine(storage, storageClient) {
    switch (storage) {
        case config.variables.lockStorge.REDIS:
            return redisStorageEngine;
        default:
            return inMemoryEngine;
    }
}

function getLockObj({ storage = config.variables.lockStorge.IN_MEMORY, storageClient }) {
    if (storage != config.variables.lockStorge.IN_MEMORY && !storageClient[storage]) {
        return serviceReturn(false, [`storageCient not given for ${storage}`]);
    }
    const storageEngine = _getStorageEngine(storage, storageClient);

    return {
        storageEngine,
        
    }
}