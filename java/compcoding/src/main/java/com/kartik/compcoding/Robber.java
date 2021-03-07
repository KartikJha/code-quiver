// package com.kartik.compcoding;

import java.util.Map;
import java.util.HashMap;

public class Robber {
    public static int rob(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        int ans = 0;
        Map<String, Integer> preComputed = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            ans = Math.max(ans, dfs(nums, i, nums[i], preComputed));
        }
        return ans;
    }
    
    public static String createKey(int i, int j) {
        if (i < j) {
            return i + "-" + j;
        }
        return j + "-" + i;
    }
    
    public static int dfs(int[] nums, int i, int sum, Map<String, Integer> preComputed) {
        int currSum = sum;
        Integer seenSum = preComputed.getOrDefault(createKey(i, sum), -1);
        if (seenSum != -1) {
            return seenSum;
        }
        for (int j = i + 2; j < nums.length; j++) {
            preComputed.putIfAbsent(createKey(j, sum + nums[j]), sum + nums[j]);
            currSum = Math.max(currSum, dfs(nums, j, sum + nums[j], preComputed));
        }
        return currSum;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[] {1, 2, 3, 1}));
    }
}