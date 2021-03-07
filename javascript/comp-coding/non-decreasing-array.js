import { arrayHasOneDropPoint, compareElementsInArray } from './lib';
export default (arr) => {
    // because the first element can be made equal to the second
    if (arr && arr.length <= 2) {
        return true;
    }
    const drop = arrayHasOneDropPoint(arr);
    if (drop === null) {
        return true;
    }
    if (drop === -1) {
        return false;
    }
    if (drop === 1 || drop === arr.length - 1) {
        return true;
    }
    if (arr.length === 3) {
        return compareElementsInArray(arr, [[0, 2, '<=']])[0];
    }
    if (compareElementsInArray(arr, [[drop - 2, drop, '<=']])[0]) {
        return true;
    }
    return compareElementsInArray(arr, [[drop - 1, drop + 1, '<=']])[0];
};
