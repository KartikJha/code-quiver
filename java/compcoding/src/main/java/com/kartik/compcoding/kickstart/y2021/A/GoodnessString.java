package com.kartik.compcoding.kickstart.y2021.A;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class GoodnessString {
    public static void main(String[] args) throws IOException { 
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int i = 1;
        while (i <= t) {
            String[] l1 = br.readLine().split(" ");
            String l2 = br.readLine();
            System.out.println("Case #" + i + ": " + returnMin(l2, Integer.parseInt(l1[1])));
            i++;
        }
        br.close();
    }

    public static int returnMin(String s, Integer k) {
        int val = calcGoodness(s);
        return Math.abs(val - k);
    }

    public static int calcGoodness(String s) {
        int i = 0, j = s.length() - 1, score = 0;
        while (i <= j) {
            if (s.charAt(i) != s.charAt(j)) {
                score++;
            }
            i++;
            j--;
        }
        return score;
    }
}
