package com.kartik.compcoding.codeforces.round712div2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class DejaVu {
    public static List<String> rP(String s) {
        StringBuilder sb = new StringBuilder(s);
        for (int i = 0, j = s.length() - 1; i <= j; i++, j--) {
            if (s.charAt(i) == s.charAt(j)) {
                if (s.charAt(i) != 'a') {
                    sb.insert(j + 1, 'a');
                    return Arrays.asList( "YES", sb.toString());
                }
            }
            else if (s.charAt(i) == 'a') {
                sb.insert(i, 'a');
                return Arrays.asList( "YES", sb.toString());
            }
            else if (s.charAt(j) == 'a') {
                sb.insert(j + 1, 'a');
                return Arrays.asList( "YES", sb.toString());
            }
        }
        return Arrays.asList("NO");
    }
    
    public static void main(String[] args) throws NumberFormatException, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        for (int i = 1; i <= t; i++) {
            String l = br.readLine();
            List<String> out = rP(l);
            System.out.println(out.get(0));
            if (out.size() == 2) {
                System.out.println(out.get(1));
            }
        }
    }
}
