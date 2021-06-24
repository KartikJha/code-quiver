package com.kartik.compcoding.lib.string;

import java.util.HashMap;
import java.util.Map;

public class StringAnalysis {
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

    private static String getSmallestHelper(int rV, int tL, StringBuilder cS) {
        if (rV == 0 && tL == cS.capacity()) {
            return cS.reverse().toString();
        }
        if (rV > 26) {
            return getSmallestHelper(rV - 26, tL, cS.append('z'));
        }
        int offset = rV % 26;
        return getSmallestHelper(rV - offset + 1, tL, cS.append((char) 97 + offset));
    }

    public static String getSmallest(int n, int k) {
        return getSmallestHelper(n, k, new StringBuilder());
    }

    public static void main(String[] args) {
        System.out.println(StringAnalysis.getSmallest(27,  3));
    }
}
