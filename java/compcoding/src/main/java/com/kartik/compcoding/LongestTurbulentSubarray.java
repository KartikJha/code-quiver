package com.kartik.compcoding;

public class LongestTurbulentSubarray {
    public int maxTurbulenceSize(int[] a) {
        int state = 0, maxlen = 0, currlen = 1;
        
        if (a.length == 1) {
            return 1;
        }
        
        for (int i = 1; i < a.length; i++) {
            if (state == 0) {
                if (a[i - 1] < a[i]) {
                    state = 1;
                    currlen++;
                } else if (a[i - 1] > a[i]) {
                    state = 2;
                    currlen++;
                }
            } else {
                if (state == 1) {
                    if (a[i - 1] > a[i]) {
                        currlen++;
                        state = 2;
                    } else {
                        if (currlen > maxlen) {
                            maxlen = currlen;
                        }
                        if (a[i - 1] == a[i]) {
                            state = 0;
                            currlen = 1;
                        } else {
                        currlen = 2;
                            
                        }
                    }
                } else {
                    if (a[i - 1] < a[i]) {
                        currlen++;
                        state = 1;
                    } else {
                        if (currlen > maxlen) {
                            maxlen = currlen;
                        }
                        if (a[i - 1] == a[i]) {
                            state = 0;
                            currlen = 1;
                        } else {
                        currlen = 2;
                            
                        }
                    }
                }
            }
        }
        return Math.max(maxlen, currlen);
    }
}