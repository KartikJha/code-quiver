/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    
    nums.sort((a, b) => a - b);

    let i = 0, j = nums.length - 1, count = 0;

    while (i < j) {
        
        if (nums[i] + nums[j] == k) {
            count++;
            i++;
            j--;
        } else if (nums[i] + nums[j] > k) {
            j--;
        } else {
            i++;
        }


    }

    
    return count;

};

export default maxOperations;
