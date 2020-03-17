package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CrpytArithm {
    static boolean isCryptSolution(String[] crypt, char[][] solution) {
        Map<Character, Integer> valueForChar = new HashMap<>();
        for (char[] cArr : solution) {
            valueForChar.put(cArr[0], Integer.parseInt(Character.toString(cArr[1])));
        }
        List<Integer> integerList = new ArrayList<>();
        for (String s : crypt) {
            int placeValue = 1;
            Integer val = 0;
            for (Character c : s.toCharArray()) {
                val += valueForChar.get(c);
                placeValue *= 10;
            }
            integerList.add(val);
        }
        return integerList.get(0) + integerList.get(1) == integerList.get(2);
    }

}
