package com.kartik.compcoding.lib.string;

import java.util.HashMap;
import java.util.Map;

class StringAnalysis {
    static boolean areAnagrams(String a, String b) {
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
