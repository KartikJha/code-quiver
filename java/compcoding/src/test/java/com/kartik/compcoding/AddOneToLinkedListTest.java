package com.kartik.compcoding;

import org.junit.Test;

import com.kartik.compcoding.lib.linkedList.ListNode;

import org.junit.Assert;

public class AddOneToLinkedListTest {
    @Test
    public void basicTest1() {
        ListNode listNode = AddOneToLinkedList.addOne(new ListNode(9, new ListNode(9, new ListNode(9, null))), 0);
        Assert.assertEquals(1, listNode.val);
        Assert.assertEquals(0, listNode.next.val);
        Assert.assertEquals(0, listNode.next.next.val);
        Assert.assertEquals(0, listNode.next.next.next.val);
    }

    @Test
    public void basicTest2() {
        ListNode listNode = AddOneToLinkedList.addOne(new ListNode(1, new ListNode(2, new ListNode(3, null))), 0);
        Assert.assertEquals(1, listNode.val);
        Assert.assertEquals(2, listNode.next.val);
        Assert.assertEquals(4, listNode.next.next.val);
//        Assert.assertEquals(4, listNode.next.next.next.val);
    }
    @Test
    public void basicTest3() {
        ListNode listNode = AddOneToLinkedList.addOne(new ListNode(1,null), 0);
        Assert.assertEquals(2, listNode.val);
//        Assert.assertEquals(2, listNode.next.val);
//        Assert.assertEquals(4, listNode.next.next.val);
//        Assert.assertEquals(4, listNode.next.next.next.val);
    }
}
