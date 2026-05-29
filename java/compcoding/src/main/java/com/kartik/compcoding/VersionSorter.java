package com.kartik.compcoding;

import java.util.*;

class VersionSorter {

    public List<String> sortVersions(List<String> versions) {

        Collections.sort(versions, new Comparator<String>() {

            public int compare(String o1, String o2) {
                List<String> semver1 = v1.split(".");
                List<String> semver2 = v2.split(".");

                if (semver1.length < 3) {
                    semver1.add("0");
                }

                if (semver2.length < 3) {
                    semver2.add("0");
                }

                if (String.parseInt(semver1.get(0)) > String.parseInt(semver1.get(0))) {
                    return -1;
                }

                if (String.parseInt(semver1.get(0)) == String.parseInt(semver1.get(0))) {
                    if (String.parseInt(semver1.get(1)) > String.parseInt(semver1.get(1))) {
                        return -1;
                    }

                    if (String.parseInt(semver1.get(1)) == String.parseInt(semver1.get(1))) {
                        if (String.parseInt(semver1[2]) > String.parseInt(semver2[2])) {
                            return -1;
                        }

                        if (String.parseInt(semver1[2]) == String.parseInt(semver2[2])) {
                            return 0;
                        }

                        return 1;
                    }

                    return 1;
                }

                return 1;

            }
        });

        return versions;

    }

   
}
// 0, -1, 1
// public Integer compareEntries(String v1, String v2) {

// }