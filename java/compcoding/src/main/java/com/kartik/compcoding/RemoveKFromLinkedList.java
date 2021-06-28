package com.kartik.compcoding;

import com.kartik.compcoding.lib.linkedList.ListNode;

public class RemoveKFromLinkedList {
    static ListNode<Integer> removeKFromList(ListNode<Integer> l, int k) {
        ListNode curr = l, prev = null;
        while (curr != null) {
            ListNode next = curr.next;
            if (curr.val.equals(k)) {
                while (next !=null && next.val.equals(k)) {
                    next = next.next;
                }
                if (prev != null) {
                    prev.next = next;
                } else {
                    l = next;
                }
                curr = next;
            } else {
                prev = curr;
                curr = next;
            }
        }
        return l;
    }
}

