package com.kartik.compcoding.codeforces.round634div3;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ContructString {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int offset = t;
        while (t-- > 0) {
            String[] input = br.readLine().split(" ");
            int n = Integer.parseInt(input[0]), a = Integer.parseInt(input[1]), b = Integer.parseInt(input[2]);
            int dis = b;
            int len = a;
            int[] al = new int[26];
            for (int i = 97; i <= 122; i++) {al[i - 97] = i;}
            StringBuilder result = new StringBuilder();
            int i = -1;
            while (n-- > 0) {
                if (len > 0 && dis > 0) {
                        i++;
                } else if (len < 0 && dis < 0) {
                    dis = b;
                    len = a;
                    i++;
                }
                result.append((char) al[i % 26]);
                len--;
                dis--;
            }
            System.out.println(result.toString());
        }
    }
}
