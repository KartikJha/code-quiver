package com.kartik.compcoding;

import com.kartik.compcoding.treeUtils.Tree;
import org.junit.Assert;
import org.junit.Test;

public class SymmetricTreeTest {
  @Test
  public void basicTest1() {
    Assert.assertTrue(
        SymmetricTree.isTreeSymmetric(
            new Tree<Integer>(
                1,
                new Tree<Integer>(
                    2, new Tree<Integer>(3, null, null), new Tree<Integer>(4, null, null)),
                new Tree<Integer>(
                    2, new Tree<Integer>(4, null, null), new Tree<Integer>(3, null, null)))));
  }
}
