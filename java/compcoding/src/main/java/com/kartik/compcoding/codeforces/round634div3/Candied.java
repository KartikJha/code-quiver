package com.kartik.compcoding.codeforces.round634div3;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Candied {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int offset = t;
        while (t-- > 0) {
            long ca = Long.parseLong(br.readLine());
            long n = ca % 2 == 0 ? (ca / 2 - 2) : ca / 2 - 1;
            if (n < 1) {
                System.out.println(0);
            } else {
                System.out.println(combinationWithReplacement(n, 2));
            }
//            System.out.println((long) Math.pow(2, (n/2  - 2)));

//            System.out.println(factorial(ca));
//            long g = (4*n - 2) / 2;
////            String result = surroundBinaryStringByParens(s);
//            System.out.println((long) Math.pow(g, 2));
        }
    }

    private static long combinationWithReplacement(long n, long r) {
        long sum = n + r - 1;
        for (int i = 2; i <= r; i++) {
            sum *= (n + r - i);
        }
        long sum2 = r;
        for (long i = r - 1; i > 0; i--) {
            sum2 *= i;
        }
        return sum/sum2;
//        return factorial(n + r - 1)/(factorial(r) * factorial(n - 1));
    }

    private static long factorial(long n) {
        if (n == 0) {
            return 1;
        }
        if (n < 3) {
            return n;
        }
        return n * factorial(n - 1);
    }


}
