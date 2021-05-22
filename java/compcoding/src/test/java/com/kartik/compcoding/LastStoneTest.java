package com.kartik.compcoding;

import com.kartik.compcoding.lib.tree.TreeNode;

import org.junit.Assert;
import org.junit.Test;

public class LastStoneTest {
  @Test
  public void basicTest1() {
    Assert.assertEquals(1, LastStone.lastStoneWeight(new int[]{2,7,4,1,8,1}));
  }
}
