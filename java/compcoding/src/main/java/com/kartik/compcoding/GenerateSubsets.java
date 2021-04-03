package com.kartik.compcoding;

import java.util.*;

public class GenerateSubsets<T> {
    List<List<T>> generate(List<T> l, List<T> currSubset) {
        List<List<T>> collector = new ArrayList<>();
        collector.add(currSubset);
        if (l.isEmpty()) {
            return collector;
        }
        for (int i = 0; i < l.size(); i++) {
            List<T> nextSubset = new ArrayList<>();
            nextSubset.addAll(currSubset);
            nextSubset.add(l.get(i));
            collector.addAll(generate(l.subList(i + 1, l.size()), nextSubset));
        }
        return collector;
    }
    
    public static void main(String[] args) {
        List<Integer> a = Arrays.asList(1, 2, 3);
        GenerateSubsets<Integer> integerSubsetGenerator = new GenerateSubsets<>();
        List<List<Integer>> subsets = integerSubsetGenerator.generate(a, new ArrayList<>());
        for (List<Integer> subset: subsets) {
            System.out.print("{ ");
            for (Integer i : subset) {
                System.out.print(i + ", ");
            }
            System.out.println(" }");
        }
    }
}
