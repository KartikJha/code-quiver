package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LetterCombinationPhoneNum {
    public List<String> letterCombinations(String digits) {
        Map<Character, List<String>> m = new HashMap<>(); 
        m.put('2', Arrays.asList("a", "b", "c"));
        m.put('3', Arrays.asList("d", "e", "f"));
        m.put('4', Arrays.asList("g", "h", "i"));
        m.put('5', Arrays.asList("j", "k", "l"));
        m.put('6', Arrays.asList("m", "n", "o"));
        m.put('7', Arrays.asList("p", "q", "r", "s"));
        m.put('8', Arrays.asList("t", "u", "v"));
        m.put('9', Arrays.asList("w", "x", "y", "z"));
        StringBuilder sb = new StringBuilder();
        return getResult(digits, m, sb, digits.length());
    }
    
    public static List<String> getResult(String l, Map<Character, List<String>> m, StringBuilder sb, Integer t) {
        List<String> res = new ArrayList<>();
        if (l.isEmpty()) {
            if (sb.length() == t && t != 0) 
                res.add(sb.toString());
            return res;
        }
        for (int i = 0; i < l.length(); i++) {
            List<String> nums = m.get(l.charAt(i));
            for (int j = 0; j < nums.size(); j++) {
                StringBuilder nSb = new StringBuilder(sb);
                nSb.append(nums.get(j));
                res.addAll(getResult(l.substring(i + 1, l.length()), m, nSb, t));
            }
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println(new LetterCombinationPhoneNum().letterCombinations("239").toString());
    }
}


