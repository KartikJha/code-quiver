package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class IntersectionArray {
    public static List<Integer> arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        List<Integer> result = new ArrayList<>();
        // find the smallest array
        int[] arr = arr1.length < arr2.length ? arr1.length < arr3.length ? arr1 : arr3 : arr2.length < arr3.length ? arr2 : arr3;
        for (int e : arr) {
            //
            if (Arrays.binarySearch(arr1, e) >= 0 && Arrays.binarySearch(arr2, e) >= 0 && Arrays.binarySearch(arr3, e) >= 0) {
                result.add(e);
            }
        }
        return result;
    }
}

