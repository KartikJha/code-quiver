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

/**
 * returns the number of chars that are different
 * in two strings
 * @param {string} s1
 * @param {string} s2
 */
export const differentCharInEqualLenStrings = (s1, s2) => {
  let count = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      count++;
    }
  }
  return count;
};

/**
 * return
 * @param {string} s1 | smaller string
 * @param {string} s2
 */
export const overlapStringsAndGetDiff = (s1, s2) => {
  let min = 0;
  for (let i = 0; i < s2.length - s1.length; i++) {
    let count = 0;
    for (let j = i; j < s1.length; j++) {
      if (s1[j] !== s2[j]) {
        count++;
      }
    }
    if (count <= min) {
      min = count;
    }
  }
  return min;
};
