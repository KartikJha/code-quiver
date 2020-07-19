package com.kartik.compcoding;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class CountingOneLess {
  public int countElements(int[] arr1) {
    Integer[] arr = new Integer[arr1.length];
    Arrays.setAll(arr, i -> arr1[i]);
    Arrays.sort(
        arr,
        new Comparator<Integer>() {
          public int compare(Integer a, Integer b) {
            if (b.equals(a)) {
              return 0;
            }
            return -(a - b);
          }
        });
    Map<Integer, Boolean> map = new HashMap<>();
    int count = 0;
    for (int i = 0; i < arr.length; i++) {
      map.putIfAbsent(arr[i] - 1, true);
      if (map.getOrDefault(arr[i], false)) count++;
    }
    return count;
  }
}
