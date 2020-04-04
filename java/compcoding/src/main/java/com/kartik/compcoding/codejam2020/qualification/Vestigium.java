package com.kartik.compcoding.codejam2020.qualification;

import com.kartik.compcoding.lib.array.ArrayAnalysis;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Vestigium {
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int t = Integer.parseInt(br.readLine());
    int offset = t;
    while (t-- > 0) {
      int n = Integer.parseInt(br.readLine());
      String[][] matrix = new String[n][n];
      int trace = 0;
      for (int i = 0; i < n; i++) {
        String[] row = br.readLine().split(" ");
        matrix[i] = row;
        trace += Integer.parseInt(matrix[i][i]);
      }
      List<Integer> duplicateRCFromMatrix = ArrayAnalysis.getDuplicateRCFromMatrix(matrix);
      System.out.println(
          "Case "
              + "#"
              + (offset - t)
              + ": "
              + trace
              + " "
              + duplicateRCFromMatrix.get(0)
              + " "
              + duplicateRCFromMatrix.get(1));
    }
  }
}
