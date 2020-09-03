package com.kartik.compcoding;

import java.util.Arrays;

public class TaskSchedulingWithCooldown {
    public static int leastInterval(char[] tasks, int n) {
      int[] fArr = new int[26];
      for (char t : tasks) {
        fArr[t - 'A']++;
      }
      Arrays.sort(fArr);
      int chunks = fArr[25] - 1;
      int idleSpots = chunks * n;
      for (int i = 24; i > -1; i--) {
        if (fArr[i] == 0) break;
        idleSpots -= Math.min(fArr[i], chunks);
      }
      return tasks.length + Math.max(idleSpots, 0);
    }

  public static void main(String[] args) {
    //
    System.out.println(TaskSchedulingWithCooldown.leastInterval(new char[]{'A', 'A', 'A', 'B', 'B', 'B'}, 2));
  }
}
