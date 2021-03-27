package com.kartik.compcoding.codejam2021;

import java.io.*;
public class MoonsAndUmbrellas {
    public static void main(String[] args) throws IOException, NumberFormatException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        for (int i = 1; i <= t; i++) {
            String[] l = br.readLine().split(" ");
            int x = Integer.parseInt(l[0]);
            int y = Integer.parseInt(l[1]);
            String s = l[2];
            System.out.println("Case #" + i + ": " + cost(x, y, s));
        }
        br.close();
    }

    public static int cost(int x, int y, String s) {
        int cost = 0, i = 0;
        while (i < s.length() && s.charAt(i) == '?') {
            i++;
        }
        i++;
        for (; i < s.length(); i++) {
            int k = i;
            if (s.charAt(k) == '?') {
                while (k < s.length() && s.charAt(k) == '?') {
                    k++;
                }
                if (k == s.length()) {
                    return cost;
                }
                k--;
                if (s.charAt(i - 1) == s.charAt(k + 1)) {
                    i++;
                    continue;
                }
            }
            if (s.charAt(i - 1) != s.charAt(k) && !(s.charAt(k) == 'C' && s.charAt(i - 1) == '?') && !(s.charAt(i- 1) == 'C' && s.charAt(k) == '?')) {
                if (s.charAt(i - 1) == 'C' || s.charAt(i - 1) == '?') {
                    cost += x;
                } else {
                    cost += y;
                }
            }
            
        }
        return cost;
    }

}