package com.kartik.compcoding.codejam2020.qualification;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class ParentingParterningReturns {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        int offset = t;
        while (t-- > 0) {
            int n = Integer.parseInt(br.readLine());
            int offset1 = n - 1;
            String[][] timeArray = new String[n][2];
            while (n-- > 0) {
                String[] s = br.readLine().split(" ");
                timeArray[offset1 - n] = s;
            }
            String schedule = getSchedule(timeArray, new char[] {'J', 'C'});
            String result = (schedule == null ? "IMPOSSIBLE" : schedule);
            System.out.println("Case #" + (offset - t) + ": " + result);
        }
    }

    static String getSchedule(String[][] timeArray, char[] persons) {
//    StringBuilder result = new StringBuilder();
        Map<String, List<Integer>> indexForTimeCode = new HashMap<>();
        for (int i = 0; i < timeArray.length; i++) {
            String[] time = timeArray[i];
            indexForTimeCode.putIfAbsent(time[0] + "-" + time[1], new ArrayList<>());
            indexForTimeCode.get(time[0] + "-" + time[1]).add(i);
        }
        Arrays.sort(
                timeArray,
                new Comparator<String[]>() {
                    public int compare(String[] time1, String[] time2) {
                        return Integer.parseInt(time1[0]) - Integer.parseInt(time2[0]);
                    }
                });
        int currPerson = 0;
        char[] result = new char[timeArray.length];
        List<Integer> indexList = indexForTimeCode.get(timeArray[0][0] + "-" + timeArray[0][1]);
        int targetIndex = indexList.get(0);
        indexList.remove(0);
        result[targetIndex] = persons[currPerson];
//    result.append(persons[currPerson]);
//    int[] referenceArray = new int[timeArray.length];
//    referenceArray[0] = indexForTimeCode.get(timeArray[0][0] + "-" + timeArray[0][1]).get(0);
//    indexForTimeCode.get(timeArray[0][0] + "-" + timeArray[0][1]).remove(0);
        for (int i = 1; i < timeArray.length; i++) {
            String[] currTime = timeArray[i];
            String[] previousTime = timeArray[i - 1];
            List<Integer> loopIndexList = indexForTimeCode.get(currTime[0] + "-" + currTime[1]);
            int loopTargetIndex = loopIndexList.get(0);
            if (Integer.parseInt(currTime[0]) < Integer.parseInt(previousTime[1])) {
                if (i != 1 && Integer.parseInt(currTime[0]) < Integer.parseInt(timeArray[i - 2][1])) {
                    return null;
                } else {
                    currPerson = currPerson == 0 ? 1 : 0;
                }
            }
            if (!loopIndexList.isEmpty())
                loopIndexList.remove(0);
            result[loopTargetIndex] = persons[currPerson];
        }
//    char[] finalResult = new char[result.length()];
//    for (int i = 0; i < referenceArray.length; i++) {
//        int targetIndex = referenceArray[i];
//        finalResult[targetIndex] = result.charAt(i);
//    }
        return String.copyValueOf(result);
    }
}
