package com.kartik.compcoding;

import com.kartik.compcoding.lib.treeUtils.TreeNode;

import java.util.ArrayList;
import java.util.List;

public class Diameter {
    public static int diameterOfBinaryTree(TreeNode root) {
        List<Long> diaList = new ArrayList<Long>();
        dia(root, diaList);
        if (diaList.isEmpty()) {
            return 0;
        }
        Long min =  diaList.stream().min((i, j) -> i.compareTo(j)).get();
        return min.intValue();
    }

    private static List<Long> dia(TreeNode t, List<Long> diaList) {
        if (t == null) {
            return diaList;
        }
        Long leftHeight = 0l, rightHeight = 0l;
        if (t.left != null) {
            leftHeight = getHeight(t.left);
        }
        if (t.right != null) {
            rightHeight = getHeight(t.right);
        }
        diaList.add(leftHeight + rightHeight);
        dia(t.left, diaList);
        dia(t.right, diaList);
        return diaList;
    }

    private static long getHeight(TreeNode t) {
        if (t == null) {
            return 0;
        }
        Long leftHeight = 0l, rightHeight = 0l;
        if (t.left != null) {
            leftHeight = 1 + getHeight(t.left);
        }
        if (t.right != null) {
            rightHeight = 1 + getHeight(t.right);
        }
        return Math.max(leftHeight, rightHeight);
    }
}