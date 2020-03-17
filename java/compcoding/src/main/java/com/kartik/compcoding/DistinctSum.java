package com.kartik.compcoding;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class DistinctSum {
    static int possibleSums(int[] coins, int[] quantity) {
        Map<Integer, Boolean> sumAlreadySeen = new HashMap<>();
        sumAlreadySeen.put(0, true);
        Integer countOfDistinctSum = 0;
        Integer prev = 0;
        findSum(coins, quantity, sumAlreadySeen, countOfDistinctSum, prev);
        return sumAlreadySeen.size() - 1;
    }
    private static int findSum(int[] coins, int [] quantity, Map<Integer, Boolean> sumAlreadySeen, Integer countOfDistinctSum, Integer prev) {
        System.out.println(Arrays.toString(coins));
        System.out.println(Arrays.toString(quantity));
        System.out.println(prev);
        System.out.println(countOfDistinctSum);
        for (int i = 0; i < coins.length; i++) {
            int j = 0;
            while (j <= quantity[i]) {
                int sum = prev + coins[i] * j;
                System.out.println(sum);
                System.out.println(coins[i]);
                if (!sumAlreadySeen.containsKey(sum)) {
                    countOfDistinctSum++;
                }
                sumAlreadySeen.putIfAbsent(sum, true);
                System.out.println(sumAlreadySeen);
                System.out.println(countOfDistinctSum);
                if (coins.length > 1)
                    countOfDistinctSum = findSum(Arrays.copyOfRange(coins, i + 1, coins.length), Arrays.copyOfRange(quantity, i + 1, quantity.length), sumAlreadySeen, 0, sum);
                j++;
            }
        }
        return countOfDistinctSum;
    }

}
