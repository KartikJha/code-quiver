package com.kartik.compcoding;


import com.sun.source.tree.Tree;

public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x, TreeNode left, TreeNode right) { val = x; this.left = left; this.right = right; }
}
