package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

public class ReverseLinkedListRecursiveTest {
    @Test
    public void basicTest1() {
        ListNode listNode = ReverseLinkedListRecursive.reverseListRecur(null, null, new ListNode(1, new ListNode(2, new ListNode(3, null))));
        Assert.assertEquals(3, listNode.val);
        Assert.assertEquals(2, listNode.next.val);
        Assert.assertEquals(1, listNode.next.next.val);
//        Assert.assertEquals(new ListNode(3, new ListNode(2, new ListNode(1, null))), ReverseLinkedListRecursive.reverseListRecur(null, null, new ListNode(1, new ListNode(2, new ListNode(3, null)))));
    }


    @Test
    public void basicTest2() {
        ListNode listNode = ReverseLinkedListRecursive.reverseListRecur(null, null, new ListNode(1, null));
        Assert.assertEquals(1, listNode.val);
        Assert.assertEquals(null, listNode.next);
//        Assert.assertEquals(1, listNode.next.next.val);
//        Assert.assertEquals(new ListNode(3, new ListNode(2, new ListNode(1, null))), ReverseLinkedListRecursive.reverseListRecur(null, null, new ListNode(1, new ListNode(2, new ListNode(3, null)))));
    }
//    @Test
//    public void basicTest2() {
//        Assert.assertEquals("bb", LongestPalindromicSubstring.longestPalindrome("cbbd"));
//    }
//
//    @Test
//    public void basicTest3() {
//        Assert.assertEquals("", LongestPalindromicSubstring.longestPalindrome(""));
//    }
//
//    @Test
//    public void basicTest4() {
//        Assert.assertEquals("bb", LongestPalindromicSubstring.longestPalindrome("abb"));
//    }
//
//    @Test
//    public void mediumTest1() {
//        Assert.assertEquals("illi", LongestPalindromicSubstring.longestPalindrome("iptmykvjanwiihepqhzupneckpzomgvzmyoybzfynybpfybngttozprjbupciuinpzryritfmyxyppxigitnemanreexcpwscvcwddnfjswgprabdggbgcillisyoskdodzlpbltefiz"));
//    }
}
