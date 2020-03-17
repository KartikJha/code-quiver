package com.kartik.compcoding;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

public class ConcentricMatrix {
    static ArrayList<ArrayList<Integer>> print(Integer n) {
        ArrayList<ArrayList<Integer>> matrix = new ArrayList<ArrayList<Integer>>();
        for (int i = 0 ; i < 2*n - 1; i++) {
            matrix.add(new ArrayList<Integer>());
            if (i > n) {

            } else { // upper matrix

                // first half of current row
                for (int j = 0; j <= (2*n - 1) / 2; j++ ) { // can also be <= n - 1/2
                    if (i >= j) {
                        matrix.get(i).add(n - j);
                    } else {
                        matrix.get(i).add(n - i);
                    }
                }

                // second half of current row
                for (int j = 1; j <= (2*n - 1) / 2; j++ ) { // can also be <= n - 1/2
                    if (i < (2*n - 1 - j)) {
                        matrix.get(i).add(n - i);
                    } else {
                        matrix.get(i).add(n - j);
                    }
                }
            }
        }
        return matrix;
    }

  public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      String n = br.readLine();
      ArrayList<ArrayList<Integer>> result = print(Integer.parseInt(n));
      for (ArrayList<Integer> a : result) {
          for (Integer i : a) {
              System.out.print(i);
          }
          System.out.println();
      }
  }
}
