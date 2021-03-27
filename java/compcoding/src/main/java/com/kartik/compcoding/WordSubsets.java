package com.kartik.compcoding;

import java.util.*;

public class WordSubsets {
    public static void main(String[] args) {
        // System.out.println(wordSubsets1(new String[]{"amazon","apple","facebook","google","leetcode"}, new String[]{"e","o"}).toString());
        System.out.println(getReduced(new String[]{"e", "oo"}));
    }

    public static List<String> wordSubsets1(String[] A, String[] B) {
        List<String> answer = new ArrayList<>();
        String reducedB = getReduced(B);
        System.out.println(reducedB);
        for (int i = 0; i < A.length; i++) {
            Map<Character, Integer> cFC = new HashMap<>();
            String s = A[i];
            for (int j = 0; j < s.length(); j++) {
                Character c = s.charAt(j);
                int count = cFC.getOrDefault(c, 0);
                cFC.put(c, count + 1);
            }
            if (isSubset(reducedB, cFC)) {
                 answer.add(s);
            }
            // return isSubset()
            // int count = 0;
            // for (int k = 0; k < B.length; k++) {
            //     String s1 = B[k];
            //     // System.out.println(s1);
            //     // System.out.println(cFC.toString());
            //     if (isSubset(s1, new HashMap<Character, Integer>(cFC))) {
            //         count++;
            //     }
            // }
            // System.out.println(s);
            // System.out.println(count);
            // if (count == B.length) {
            //     answer.add(s);
            // }
        }
        return answer;
    }
    
    public static String getReduced(String[] B) {
        Map<Character, Integer> global = new HashMap<>();
        for (int i = 0; i < B.length; i++) {
            String s = B[i];
            Map<Character, Integer> local =  new HashMap<>();
            for (int j = 0; j < s.length(); j++) {
                Character c = s.charAt(j);
                int lC = local.getOrDefault(c, 0);
                int gC = global.getOrDefault(c, 0);
                int cC = lC + 1;
                local.put(c, cC);
                if (cC > gC) {
                    global.put(c, cC);
                }
            }
            local.clear();
        }
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<Character,Integer> entry: global.entrySet()) {
            Character c = entry.getKey();
            Integer count  = entry.getValue();
            for (int i = 0; i < count; i++) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
    
    public static boolean isSubset(String s, Map<Character, Integer> cFC) {
        int tCount = 0;
        Set<Character> charSet = new HashSet<>();
        Map<Character, Boolean> seen = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            Character c = s.charAt(i);
            charSet.add(c);
            int count = cFC.getOrDefault(c, 0);
            if (count == 0) {
                return false;
            }
            cFC.put(c, --count);
            if (!seen.getOrDefault(c, false)) {
                seen.put(c, true);
                tCount++;
            }
        }
        // System.out.println(s);
        // System.out.println(cFC.toString());
        // System.out.println(charSet.toString());
        // System.out.println(tCount);
        return tCount == charSet.size();
    }

}