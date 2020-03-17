package com.kartik.compcoding;

import com.kartik.compcoding.treeUtils.TreeNode;
import org.junit.Test;
import org.junit.Assert;

public class TwoSumBSTTest {
  @Test
  public void basicTest1() {
    Assert.assertTrue(
        TwoSumBST.twoSumBSTs(
            new TreeNode(2, new TreeNode(1, null, null), new TreeNode(4, null, null)),
            new TreeNode(1, new TreeNode(0, null, null), new TreeNode(3, null, null)),
            5));

    //        Assert.assertArrayEquals(new int[]{0, 1}, TwoSum.getNums(new int[]{2, 7, 11, 15}, 9));
  }

    @Test
    public void basicTest2() {
        Assert.assertFalse(
                TwoSumBST.twoSumBSTs(
                        new TreeNode(0, new TreeNode(-10, null, null), new TreeNode(10, null, null)),
                        new TreeNode(5, new TreeNode(1, new TreeNode(0, null, null), new TreeNode(2, null, null)), new TreeNode(7, null, null)),
                        18));

        //        Assert.assertArrayEquals(new int[]{0, 1}, TwoSum.getNums(new int[]{2, 7, 11, 15}, 9));
    }

    @Test
    public void basicTest3() {
        Assert.assertTrue(
                TwoSumBST.twoSumBSTs(
                        new TreeNode(0, new TreeNode(-10, null, null), new TreeNode(10, null, null)),
                        new TreeNode(5, new TreeNode(1, new TreeNode(0, null, null), new TreeNode(2, null, null)), new TreeNode(7, null, null)),
                        17));

        //        Assert.assertArrayEquals(new int[]{0, 1}, TwoSum.getNums(new int[]{2, 7, 11, 15}, 9));
    }


    //    @Test
  //    public void basicTest2() {
  //        Assert.assertArrayEquals(new int[]{-1, -1}, TwoSum.getNums(new int[]{}, 9));
  //    }
  //
  //    @Test
  //    public void basicTest3() {
  //        Assert.assertArrayEquals(new int[]{0, 2}, TwoSum.getNums(new int[]{-7, 2, 4, 5}, -3));
  //    }
}
