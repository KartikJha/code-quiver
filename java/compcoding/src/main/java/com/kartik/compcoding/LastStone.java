package com.kartik.compcoding;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;

public class LastStone {
  public static int lastStoneWeight(int[] stones) {
    Queue<Integer> que =
        new PriorityQueue<>(
            new Comparator<Integer>() {
              @Override
              public int compare(Integer o1, Integer o2) {
                return -(o1 - o2);
              }
            });
    for (int i = 0; i < stones.length; i++) {
      que.add(stones[i]);
    }
    while (que.size() > 1) {
      Integer first = que.remove(), second = que.remove();
      que.add(first - second);
    }
    return que.peek();
  }
}
