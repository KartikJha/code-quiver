/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function(nums, k, numOperations) {
    return getMaxFrequency(nums, k, numOperations, 0, 1);
};

function getMaxFrequency(nums, k, n, i, maxFTN) {

    if (i == nums.length) {
        return maxFTN;
    }

    if (n == 0) {
        return 1;
    }

    let maxFTNUpdated = maxFTN, nUpdated = n, currN = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
        if (canBeB(nums[j], currN, k)) {
            maxFTNUpdated++;
            nUpdated--;
        }
    }
    
    if (nUpdated == 0) {
        return Math.max(maxFTNUpdated, getMaxFrequency(nums, k, n, i + 1, 0))
    }

    return Math.max(getMaxFrequency(nums, k, nUpdated, i + 1, maxFTNUpdated), getMaxFrequency(nums, k, n, i + 1, maxFTN))
    
}

function canBeB(a, b, k) {
    if (a < b) {
        return a + k >=b;
    } else {
        return a - k <= b;
    }
}


export default maxFrequency;