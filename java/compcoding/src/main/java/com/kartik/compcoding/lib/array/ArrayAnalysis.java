package com.kartik.compcoding.lib.array;

import java.util.*;

/**
 * returns count of duplicate rows and cols in an array
 */
public class ArrayAnalysis {
    public static List<Integer> getDuplicateRCFromMatrix(String[][] matrix) {
        List<Map<String, Map<String, Boolean>>> lookupList = new ArrayList<>();
        lookupList.add(new HashMap<>());
        lookupList.add(new HashMap<>());
        int rows = matrix.length, cols = matrix[0].length;
        int dRows = 0, dCols = 0; 
        Map<String, Boolean> isDuplicateAccounted = new HashMap<>();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                String rowKey = String.valueOf(i);
                String colKey = String.valueOf(j);
                lookupList.get(0).putIfAbsent(rowKey, new HashMap<>());
                lookupList.get(1).putIfAbsent(colKey, new HashMap<>());
                String cell = matrix[i][j];
                Boolean seenRow = lookupList.get(0).get(rowKey).getOrDefault(cell, false);
                Boolean seenCol = lookupList.get(1).get(colKey).getOrDefault(cell, false);
                lookupList.get(0).get(rowKey).putIfAbsent(cell, true);
                lookupList.get(1).get(colKey).putIfAbsent(cell, true);
                if (seenCol && !isDuplicateAccounted.getOrDefault(1 + "" + colKey, false)) {
                    isDuplicateAccounted.put(1 + "" + colKey, true);
                    dCols++;
                }
                if (seenRow && !isDuplicateAccounted.getOrDefault(0 + "" + rowKey, false)) {
                    isDuplicateAccounted.put(0 + "" + rowKey, true);
                    dRows++;
                }
            }
        }
        return Arrays.<Integer>asList(dRows, dCols);
    }
    /**
     * max sum of min(ai, bi)
     * @param nums
     * @return
     */
    public int arrayPairSum(int[] nums) {
        Arrays.sort(nums);
        int res = 0;
        for (int i = 0; i < nums.length; i += 2) {
            res += nums[i];
        }
        return res;
    }
    /**
     * Given an array nums of 0s and 1s and an integer k, return True if all 1's are at least k places away from each other, otherwise return False.
     * @param nums
     * @param k
     * @return
     */
    public boolean kLengthApart(int[] nums, int k) {
        int prev = -1;
        for (int i = 0; i < nums.length; i++) {
            int e = nums[i];
            if (e == 1) {
                if (prev == -1) {
                    prev = i;
                } else {
                    if (i - prev - 1 < k) {
                        return false;
                    }
                    prev = i;
                }
            }
        }
        return true;
    }
}
