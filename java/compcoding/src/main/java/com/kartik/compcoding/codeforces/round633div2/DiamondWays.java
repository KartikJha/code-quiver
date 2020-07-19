package com.kartik.compcoding.codeforces.round633div2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class DiamondWays {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int offset = t;
        while (t-- > 0) {
            Long n = Long.parseLong(br.readLine());
            System.out.println(n);
//            long g = (4*n - 2) / 2;
////            String result = surroundBinaryStringByParens(s);
//            System.out.println((long) Math.pow(g, 2));
        }
    }

//    private static StringBuilder getParens(Character c, Integer occurence) {
//        StringBuilder s = new StringBuilder();
//        char[] chars = new char[occurence];
//        Arrays.fill(chars, c);
//        return s.append(chars);
//    }
//    private static String surroundBinaryStringByParens(String s) {
//        StringBuilder stringBuilder = new StringBuilder();
//        int currNum = 0;
//        int closingParens = 0;
//        for(int i = 0; i < s.length(); i++) {
//            int numericVal = Character.digit(s.charAt(i), 10);
//            Character character = s.charAt(i);
//            if (numericVal >= currNum) {
//                stringBuilder.append(getParens('(', numericVal - currNum)).append(character);
//                closingParens += (numericVal - currNum);
//            } else {
//                stringBuilder.append(getParens(')', closingParens - numericVal)).append(character);
//                closingParens = numericVal;
//            }
//            currNum = numericVal;
//        }
//        if (closingParens > 0) {
//            stringBuilder.append(getParens(')', closingParens));
//        }
//        return stringBuilder.toString();
//    }
}
