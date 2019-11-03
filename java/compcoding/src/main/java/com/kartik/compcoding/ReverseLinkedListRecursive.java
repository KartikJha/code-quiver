package com.kartik.compcoding;

public class ReverseLinkedListRecursive {
    public ListNode reverseList(ListNode head) {
        return reverseListRecur(null, null, head);
    }

    static ListNode reverseListRecur(ListNode reverseHead, ListNode prev, ListNode curr) {
        if (curr == null) {
            return reverseHead;
        }
        prev = curr;
        curr = curr.next;
        prev.next = reverseHead;
        reverseHead = prev;

        return reverseListRecur(reverseHead, prev, curr);
    }
}
