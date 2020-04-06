package com.kartik.compcoding.codejam2020.qualification;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Indicium {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int offset = t;
        while (t-- > 0) {
            String[] s = br.readLine().split(" ");
            int[][] init = getInit(Integer.parseInt(s[0]));
            boolean result = recur(Integer.parseInt(s[0]), Integer.parseInt(s[1]), init, 0);
            String finalResult = "IMPOSSIBLE";
            if (result) {
                finalResult = "POSSIBLE";
            }
            System.out.println("Case #" + (offset - t) + ": " + finalResult);
        }
    }

    private static boolean recur(int n, int k, int[][] matrix, int s) {
        if (s == k) {
            return true;
        }

        if (n == 0) {
            return false;
        }

        s += matrix[n - 1][n - 1];
        n--;
        return recur(n, k, matrix, s);
    }

    private static int[][] getInit(int n) {
        int[][] matrix = new int[n][n];
        int[] ref = new int[n];
        for (int i = 0; i < n; i++) {
            ref[i] = i + 1;
        }
        matrix[0] = ref;
        for (int i = 1; i < n; i++) {
            int[] row = new int[n];
            for (int j = 0; j < n; j++) {
                row[j] = ref[(j + i) % n];
            }
            matrix[i] = row;
        }
        return matrix;
    }

}
