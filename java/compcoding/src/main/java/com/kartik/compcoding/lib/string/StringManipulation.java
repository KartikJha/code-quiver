package com.kartik.compcoding.lib.string;


import java.util.Arrays;

public class StringManipulation {
    static StringBuilder getParens(Character c, Integer occurence) {
        StringBuilder s = new StringBuilder();
        char[] chars = new char[occurence];
        Arrays.fill(chars, c);
        return s.append(chars);
    }
    static String surroundBinaryStringByParens(String s) {
        StringBuilder stringBuilder = new StringBuilder();
        int currNum = 0;
        int closingParens = 0;
        for(int i = 0; i < s.length(); i++) {
            int numericVal = Character.digit(s.charAt(i), 10);
            Character character = s.charAt(i);
            if (numericVal >= currNum) {
                stringBuilder.append(getParens('(', numericVal - currNum)).append(character);
                closingParens += (numericVal - currNum);
            } else {
                stringBuilder.append(getParens(')', closingParens - numericVal)).append(character);
                closingParens = numericVal;
            }
            currNum = numericVal;
        }
        if (closingParens > 0) {
            stringBuilder.append(getParens(')', closingParens));
        }
        return stringBuilder.toString();
    }
}
