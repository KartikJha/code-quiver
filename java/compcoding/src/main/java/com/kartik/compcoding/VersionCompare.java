package com.kartik.compcoding;

import java.util.Arrays;

public class VersionCompare {
    public static int compareVersion(String version1, String version2) {
        String[] v1L = version1.split("\\."), v2L = version2.split("\\.");
        int l = Math.min(v2L.length, v1L.length), i = 0;
        System.out.println(Arrays.asList(v1L));
        System.out.println(Arrays.asList(v2L));
        System.out.println(l);

        while (i < l) {
            Integer i1 = Integer.parseInt(v1L[i]), i2 = Integer.parseInt(v2L[i]);
            if (i1 > i2) {
                return 1;
            }

            if (i2 > i1) {
                return -1;
            }

            i++;
        }

        if (v1L.length > v2L.length) {
            for (int j = i; j < v1L.length; j++) {
                if (Integer.parseInt(v1L[j]) != 0) {
                    return 1;
                }
            }
        }

        if (v1L.length < v2L.length && v2L[i] != "0") {
            for (int j = i; j < v2L.length; j++) {
                if (Integer.parseInt(v2L[j]) != 0) {
                    return -1;
                }
            }
        }

        return 0;
    }

    public static void main(String[] args) {
        System.out.println(VersionCompare.compareVersion("0.1", "1.1"));
        System.out.println(VersionCompare.compareVersion("1.0", "1"));
        System.out.println(VersionCompare.compareVersion("19.8.3.17.5.01.0.0.4.0.0.0.0.0.0.0.0.0.0.0.0.0.00.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.000000.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.000000",
        "19.8.3.17.5.01.0.0.4.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0000.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.000000"));
    }
}
