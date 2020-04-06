package com.kartik.compcoding;

import java.util.*;

class GroupAnagrams {
    static List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> result = new ArrayList<>();
        int[] seen = new int[strs.length];
        Arrays.fill(seen, 0);
        for (int i = 0; i < strs.length; i++) {
            if (seen[i] == 0) {
                result.add(new ArrayList<>());
                result.get(result.size() - 1).add(strs[i]);
                seen[i] = 1;

                for (int j = i + 1 ; j < strs.length; j++) {
                    if (seen[j] == 0 && areAnagrams(strs[i], strs[j])) {
                        seen[j] = 1;
                        result.get(result.size() - 1).add(strs[j]);
                    }
                }
            }

        }
        return result;
    }

    private static boolean areAnagrams(String a, String b) {
        if (a.length() != b.length()) {
            return false;
        }
        Map<Character, Integer> map = new HashMap<>();
        int count = 0;
        for (int i = 0; i < a.length(); i++) {
            char c = a.charAt(i);
            map.putIfAbsent(c, 0);
            map.put(c, map.get(c) + 1);
            count++;
        }
        for (int i = 0; i < b.length(); i++) {
            char c = b.charAt(i);
            int cCount = map.getOrDefault(c, 0);
            if (cCount == 0) {
                return false;
            } else {
                count--;
            }
            map.put(c, --cCount);
        }
        return count == 0;
    }
}