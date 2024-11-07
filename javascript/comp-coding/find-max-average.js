/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let sum4 = nums.slice(0, k).reduce((a, n) => a + n, 0), max = 0;
    
    max = sum4;


    for (let i = k; i < nums.length; i++) {
        let n1 = nums[i];

        sum4 = sum4 - nums[i - k] + nums[i];

        if (sum4 > max) {
            max = sum4;
        }
    }

    return Number((max / k).toFixed(5));

};

export default findMaxAverage;
