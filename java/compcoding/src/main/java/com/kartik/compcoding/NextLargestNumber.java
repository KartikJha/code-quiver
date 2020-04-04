package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

class NextLargestNumber {
    static List<Integer> getResult(List<Integer> input) {
        Stack<Integer> s = new Stack<>();
        List<Integer> result = new ArrayList<>();
        input.forEach(e -> {
            if (!s.isEmpty() && s.peek() < e) {
                while (!s.isEmpty() && s.pop() < e) {
                    result.add(e);
                }
            }
            s.push(e);
        });
        result.add(-1);
        return result;
    }
}
