package com.kartik.compcoding;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * codeforces round 582 (div 3)
 * problem 1
 */

public class BadDays {
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int t = Integer.parseInt(br.readLine());

    while (t-- > 0) {
      Integer days = Integer.parseInt(br.readLine());
      String priceS = br.readLine();

      List<Long> priceList = new ArrayList<>();
      for (String s : priceS.split(" ")) {
        priceList.add(Long.parseLong(s));
      }

      int numBadDays = getBadDays(priceList);
      System.out.println(numBadDays);
    }
  }

  static Integer getBadDays(List<Long> priceList) {
    int badDays = 0;
    long min = Long.MAX_VALUE;

    for (int i = priceList.size() - 1; i > -1; i--) {
      long price = priceList.get(i);
      if (price > min) {
        badDays++;
      }

      min = Math.min(price, min);
    }

    return badDays;
  }
}
