package com.kartik.compcoding;

import com.kartik.compcoding.treeUtils.TreeNode;

import java.util.HashMap;
import java.util.Map;

class TwoSumBST {
    static boolean twoSumBSTs(TreeNode root1, TreeNode root2, int target) {
        if (root1 == null || root2 == null) {
            return false;
        }
        Map<Integer, Integer> complimentForNum = new HashMap<>();
        traverseTreeAndUpdateCompliment(root1, complimentForNum, target, false);
        return traverseTreeAndUpdateCompliment(root2, complimentForNum, target, true);
    }

    private static boolean traverseTreeAndUpdateCompliment(TreeNode t, Map<Integer, Integer> m, int target, boolean searchMode) {
        Integer c;
        if (searchMode) {
            c = m.get(t.val);
        } else {
            c = m.get(target - t.val);
        }
        if (c == null && !searchMode) {
            m.put(target - t.val, t.val);
        } else if (c != null && searchMode) {
            return true;
        }
        boolean result = false;
        if (t.left != null) {
            result = traverseTreeAndUpdateCompliment(t.left, m, target, searchMode);
        }
        if (t.right != null) {
            result = traverseTreeAndUpdateCompliment(t.right, m, target, searchMode);
        }
        return result;
    }
}
