package com.kartik.compcoding;

class KadaneAlgorithm {
    static int maxSubArray(int[] nums) {
        int max = nums[0], maxCurr = 0;
        for (int i = 0; i < nums.length; i++) {
            if (maxCurr == 0 && nums[i] > 0) {
                maxCurr = nums[i];
            } else if (maxCurr + nums[i] >= 0) {
                maxCurr += nums[i];
            } else {
                maxCurr = 0;
            }
            if (maxCurr == 0 && max < nums[i]) {
                max = nums[i];
            } else if (maxCurr != 0 && maxCurr > max) {
                max = maxCurr;
            }
        }
        return max;
    }
}