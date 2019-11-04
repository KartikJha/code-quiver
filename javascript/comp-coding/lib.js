/**
 * returns null if 0, -1 if multiple, and index if one of drop point
 * @param {number[]} arr array of numbers
 */
export const arrayHasOneDropPoint = arr => {
  let drop = null;
  if (!arr) {
    return drop;
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1] && drop === null) {
      drop = i;
    } else if (arr[i] < arr[i - 1]) {
      drop = -1;
      break;
    }
  }
  return drop;
};

/**
 * compares elements in an array and returns results array
 * @param {number []} arr
 * @param {object []} listOfPairsAndCondition [[index1, index2, condition], ...]
 */
export const compareElementsInArray = (arr, listOfPairsAndCondition) => {
  if (
    !arr ||
    !arr.length ||
    !listOfPairsAndCondition ||
    !listOfPairsAndCondition.length
  ) {
    return [];
  }
  const result = listOfPairsAndCondition.map(e => {
    if (eval(`${arr[e[0]]} ${e[2]} ${arr[e[1]]}`)) {
      return true;
    }
    return false;
  });
  return result;
};
