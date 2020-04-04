package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HappyNumber {
    public static boolean isHappy(int n) {
        Map<Integer, Boolean> seenNums = new HashMap<>();
        return isHappyRecursive(n, seenNums);
    }

    private static boolean isHappyRecursive(int n, Map<Integer, Boolean> seenNums) {
        if (n == 1) {
            return true;
        }
        if (seenNums.getOrDefault(n, false)) {
            return false;
        }
        seenNums.put(n, true);
        List<Integer> digitList = getListOfDigits(n);
        System.out.println(digitList);
        int newNum = digitList.stream().reduce(0, (acc, i) -> i * i + acc);
        return isHappyRecursive(newNum, seenNums);
    }

    private static List<Integer> getListOfDigits(int n) {
        List<Integer> result = new ArrayList<>();
        while (n != 0) {
            result.add(n % 10);
            n /= 10;
        }
        return result;
    }
}
