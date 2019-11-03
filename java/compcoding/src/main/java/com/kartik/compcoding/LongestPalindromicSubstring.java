package com.kartik.compcoding;

public class LongestPalindromicSubstring {

    public static String longestPalindrome(String s) {
        if (s.isEmpty()) {
            return "";
        }
        int maxLen = 1;
        int len;
        int start = 0;
        int end = 0;
        for (int i = 0; i < s.length(); i++) {
            for (int j = s.length() - 1; j > i; j--) {
                len = 0;
                if (s.charAt(i) == s.charAt(j)) {
                    len += 2;
                    int k = i + 1;
                    int l = j - 1;
                    while (k <= l && s.charAt(k) == s.charAt(l)) {
                        if (k == l) {
                            len++;
                        } else {
                            len += 2;
                        }
                        k++;
                        l--;
                    }
                    if (k > l && len > maxLen) {
                        maxLen = len;
                        start = i;
                        end = j;
                    }
                }
            }
        }
        return s.substring(start, end + 1);
    }

}
