// package com.kartik.compcoding.kickstart.y2021.G;

import java.util.*;
import java.io.*;

class DogsAndCats {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int i = 1;
        while (i <= t) {
            String[] input = br.readLine().split(" ");
            String s = br.readLine();
            System.out.println("Case " + "#" + i + ": " + canDogsEat(s, Long.parseLong(input[1]), Long.parseLong(input[2]), Long.parseLong(input[3])));
            i++;
        } 
    }

    public static String canDogsEat(String s, long D, long C, long M) {
        for (int i = 0; i < s.length(); i++) {
            Character c = s.charAt(i);
            if (c == 'D') {
                if (D == 0) {
                    return "NO";
                }
                D--;
                C += M;
            }

            if (c == 'C') {
                if (C == 0) {
                    int j = i + 1;
                    while (j < s.length()) {
                        Character c1 = s.charAt(j);
                        if (c1 == 'D') {
                            return "NO";
                        }
                        j++;
                    }
                    return "YES";
                }
                C--;
            }
        }
        return "YES";
    }
}