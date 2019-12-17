package com.kartik.compcoding;

public class InvertBST {
//    public static TreeNode invertBST(TreeNode t, TreeNode iT) {
//        if (iT == null) {
//            iT.val = t.val;
//        }
//
//        TreeNode left = invertBST()
//
//        iT.left
//        iT.right.val = t.left.val;
//
//
//    }

    /**
     * inversion by modifying original
     * @param t
     * @return
     */
    public static TreeNode invertBST(TreeNode t) {
        if (t == null) {
            return t;
        }
        TreeNode temp = null;
        if (t.left != null) {
            temp = t.left;
        }
        t.left = t.right;
        t.right = temp;

        invertBST(t.left);
        invertBST(t.right);
        return t;
    }

}
