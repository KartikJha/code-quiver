package com.kartik.compcoding.lib.array;

import java.util.*;

/**
 * returns count of duplicate rows and cols in an array
 */
public class ArrayAnalysis {
    public static List<Integer> getDuplicateRCFromMatrix(String[][] matrix) {
        List<Map<String, Map<String, Boolean>>> lookupList = new ArrayList<>();
        lookupList.add(new HashMap<>());
        lookupList.add(new HashMap<>());
        int rows = matrix.length, cols = matrix[0].length;
        int dRows = 0, dCols = 0;
        Map<String, Boolean> isDuplicateAccounted = new HashMap<>();
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                String rowKey = String.valueOf(i);
                String colKey = String.valueOf(j);
                lookupList.get(0).putIfAbsent(rowKey, new HashMap<>());
                lookupList.get(1).putIfAbsent(colKey, new HashMap<>());
                String cell = matrix[i][j];
                Boolean seenRow = lookupList.get(0).get(rowKey).getOrDefault(cell, false);
                Boolean seenCol = lookupList.get(1).get(colKey).getOrDefault(cell, false);
                lookupList.get(0).get(rowKey).putIfAbsent(cell, true);
                lookupList.get(1).get(colKey).putIfAbsent(cell, true);
                if (seenCol && !isDuplicateAccounted.getOrDefault(1 + "" + colKey, false)) {
                    isDuplicateAccounted.put(1 + "" + colKey, true);
                    dCols++;
                }
                if (seenRow && !isDuplicateAccounted.getOrDefault(0 + "" + rowKey, false)) {
                    isDuplicateAccounted.put(0 + "" + rowKey, true);
                    dRows++;
                }
            }
        }
        return Arrays.<Integer>asList(dRows, dCols);
    }
}
