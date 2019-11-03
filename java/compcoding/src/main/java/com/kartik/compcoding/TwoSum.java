package com.kartik.compcoding;

import java.util.HashMap;
import java.util.Map;

class TwoSum {
    static int[] getNums(int[] a, int n) {
        Map<Integer, Integer> indexFirstForSecondNum = new HashMap<>();
        for (int i = 0; i < a.length; i++) {
            int val = a[i];
            Integer firstIndex = indexFirstForSecondNum.get(val);
            if (firstIndex != null)  {
                return new int[]{firstIndex, i};
            }
            indexFirstForSecondNum.put(n - val, i);
        }
        return new int[]{-1, -1};
    }
}
