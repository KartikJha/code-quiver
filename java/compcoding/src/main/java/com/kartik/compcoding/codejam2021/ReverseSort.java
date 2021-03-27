package com.kartik.compcoding.codejam2021;

import java.io.*;
public class ReverseSort {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        for (int i = 1; i <= t; i++) {
            br.readLine();
            String[] l = br.readLine().split(" ");
            System.out.println("Case #" + i + ": " + cost(l));
        }
        br.close();
    }

    public static int cost(String[] l) {
        int cost = 0, min = Integer.MAX_VALUE, minI = -1;
        for (int i = 0; i < l.length - 1; i++) {
            minI = -1;
            min = Integer.MAX_VALUE;
            for (int j = i; j < l.length; j++) {
                int v = Integer.parseInt(l[j]);
                if (v < min) {
                    min = v;
                    minI = j;
                }
            }
            cost += (minI - i) + 1;
            for (int k = minI, m = i; m <= k; k--, m++)  {
                String t = l[k];
                l[k] = l[m];
                l[m] = t;
            }
        }
        return cost;
    }

}
