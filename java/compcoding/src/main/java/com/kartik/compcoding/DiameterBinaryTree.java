package com.kartik.compcoding;

import com.kartik.compcoding.lib.treeUtils.TreeNode;

public class DiameterBinaryTree {
    public static int diameter = -1;
    public static void main(String[] args) {
        System.out.println(diameterOfBinaryTree(new TreeNode(1, null, new TreeNode(2, null, null))));
    }
    public static int diameterOfBinaryTree(TreeNode root) {
        diameter = -1;
        System.out.println(longestPath(root));
        return diameter;
    }
    
    public static int longestPath(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = longestPath(root.left);
        int right = longestPath(root.right);
        if (left + right > diameter) {
            diameter = left + right;
        }
        return Math.max(left, right) + 1;
    }
}
