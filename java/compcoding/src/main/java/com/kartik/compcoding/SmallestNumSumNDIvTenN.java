package com.kartik.compcoding;

public class SmallestNumSumNDIvTenN {
    public static int smallestNum(int N) {
        if (N == 0) {
            return 0;
        }
        String out = new String();
        int val;
        while (N > 0) {
	        if (N > 10) {
                val = 9;
	            N -= 9;
	        } else {
                val = N % 10;
                N -= (N % 10);
            }
            out = val + out;
	    }
        for (int i = 0; i < N; i++) {
            out = "0" + out;
        }
        return Integer.parseInt(out);
    }

    public static void main(String[] args) {
        System.out.println(smallestNum(19));
    }
}