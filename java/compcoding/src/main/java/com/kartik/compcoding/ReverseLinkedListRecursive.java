package com.kartik.compcoding;

import com.kartik.compcoding.lib.linkedList.ListNode;

public class ReverseLinkedListRecursive {
    public ListNode reverseList(ListNode head) {
        // return reverseListRecur(null, null, head);
        if (head == null) {
            return head;
        }
        return reverseListRecur1(head, head.next, null);
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

    public static ListNode reverse(ListNode node, int k)
    {
        //Your code here
        if (node == null) {
            return node;
        }
        ListNode curr = node, prev = null, next = node.next, last = node, newHead = null;
        int c = 1;
        do {
            ListNode[] vals = reverseListRecur2(curr, next, prev, 1, k, curr);
            if (newHead == null) {
                newHead = vals[0];
            } else {
                last.next = vals[0];
            }
            curr = vals[1];
            if (curr == null) {
                return newHead;
            }
            last = vals[2];
            prev = null;
            next = curr.next;
        } while (curr != null);
        return newHead;
    }
    
    static ListNode[] reverseListRecur2(ListNode curr, ListNode next, ListNode prev, int c, int k, ListNode last) {
        if (next == null || c == k) {
            curr.next = prev;
            return new ListNode[]{curr, next, last};
        }
        curr.next = prev;
        prev = curr;
        curr = next;
        next = curr.next;
        c++;
        return reverseListRecur2(curr, next, prev, c, k, last);
    }

    static ListNode reverseListRecur1(ListNode curr, ListNode next, ListNode prev) {
        if (next == null) {
            curr.next = prev;
            return curr;
        }
        curr.next = prev;
        prev = curr;
        curr = next;
        next = curr.next;
        // prev = curr;
        // curr = curr.next;
        // prev.next = reverseHead;
        // reverseHead = prev;

        return reverseListRecur(curr, next, prev);
    }
}
