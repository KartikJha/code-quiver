package com.kartik.compcoding.codeforces.round633div2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class SortedAdjacentDifferences {
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int t = Integer.parseInt(br.readLine());
    int offset = t;
    while (t-- > 0) {
      String[] s = br.readLine().split(" ");
      List<Integer> nums = new ArrayList<>();
      for (String s1 : s) {
        nums.add(Integer.parseInt(s1));
      }

      Queue<KeyVal> diffForPair = getDiffForPair(nums);

    }
  }

  private static Queue<KeyVal> getDiffForPair(List<Integer> nums) {
    SortedMap<String, Integer> diffForPair = new TreeMap<>();
    Queue<KeyVal> keyVals =
        new PriorityQueue<>(
            new Comparator<KeyVal>() {
              public int compare(KeyVal a, KeyVal b) {
                // if (b.equals(a)) {
                //   return 0;
                // }\
                return a.getVal() - b.getVal();
              }
            });
    for (int i = 0; i < nums.size(); i++) {
      int minDiff = Integer.MAX_VALUE;
      int minDiffj = 0;
      for (int j = i + 1; j < nums.size() - 1; j++) {
        int currDiff = Math.abs(nums.get(i) - nums.get(j));
        if (currDiff < minDiff) {
          minDiff = currDiff;
          minDiffj = j;
        }
      }
      String key = i + "," + minDiffj;
//      keyVals.removeIf(item -> item.getKEY_().equals(key));
      keyVals.add(new KeyVal(key, minDiff, nums.get(i)));
    }
    return keyVals;
  }

  private static class KeyVal {
    private String KEY_ = "";
    private Integer val;
    private Integer item;

    public KeyVal(String KEY_, Integer val, Integer item) {
      this.KEY_ = KEY_;
      this.val = val;
    }

    public String getKEY_() {
      return KEY_;
    }

    public void setKEY_(String KEY_) {
      this.KEY_ = KEY_;
    }

    public Integer getVal() {
      return val;
    }

    public void setVal(Integer val) {
      this.val = val;
    }

    public Integer getItem() {
      return item;
    }

    public void setItem(Integer item) {
      this.item = item;
    }
  }
}
