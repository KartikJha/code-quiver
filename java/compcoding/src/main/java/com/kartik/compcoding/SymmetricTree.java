package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.List;

import com.kartik.compcoding.lib.tree.Tree;

public class SymmetricTree {
    static boolean isTreeSymmetric(Tree<Integer> t) {
        List<Integer> inorderTraversal = t.inorderTraversal(new ArrayList<>());
        if (inorderTraversal.size() % 2 == 0) {
            return false;
        }
        System.out.println(inorderTraversal.toString());
        return checkSymmetry(inorderTraversal);
    }

    static boolean checkSymmetry(List<Integer> inorderTraversal) {
        int i = 0, j = inorderTraversal.size() - 1;
        while (i < j) {
            if (!inorderTraversal.get(i).equals(inorderTraversal.get(j))) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }

}
