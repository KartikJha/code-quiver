package com.kartik.compcoding;

import com.kartik.compcoding.lib.treeUtils.TreeNode;
import org.junit.Test;
import org.junit.Assert;

public class InvertBSTTest {
  @Test
  public void basicTest1() {
    TreeNode t =
        InvertBST.invertBST(
            new TreeNode(
                1,
                new TreeNode(5, new TreeNode(3, null, null), new TreeNode(7, null, null)),
                    new TreeNode(13, new TreeNode(10, null, null), new TreeNode(17, null, null))));

    Assert.assertEquals(t.left.val, 13);
    Assert.assertEquals(t.left.left.val, 17);
  }

  //    @Test
  //    public void basicTest2() {
  //        ListNode listNode = AddOneToLinkedList.addOne(new ListNode(1, new ListNode(2, new
  // ListNode(3, null))), 0);
  //        Assert.assertEquals(1, listNode.val);
  //        Assert.assertEquals(2, listNode.next.val);
  //        Assert.assertEquals(4, listNode.next.next.val);
  ////        Assert.assertEquals(4, listNode.next.next.next.val);
  //    }
  //    @Test
  //    public void basicTest3() {
  //        ListNode listNode = AddOneToLinkedList.addOne(new ListNode(1,null), 0);
  //        Assert.assertEquals(2, listNode.val);
  ////        Assert.assertEquals(2, listNode.next.val);
  ////        Assert.assertEquals(4, listNode.next.next.val);
  ////        Assert.assertEquals(4, listNode.next.next.next.val);
  //    }
}
