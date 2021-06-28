package com.kartik.compcoding.lib.linkedList;


public class ListNode<T> {
    public T val;
    public ListNode next;
    ListNode(T x, ListNode n) { val = x; next = n; }
    public ListNode<T> removeElements(ListNode<T> head, T val) {
        if (head == null) {
           head = this;
        }
        ListNode prev = null, curr = head;
        while (curr != null) {
            if (prev == null && curr.val == val) {
                head = curr.next;
                curr = curr.next;
            } else {
                if (curr.val == val) {
                    prev.next = curr.next;
                    curr = curr.next;
                } else {
                    prev = curr;
                    curr = curr.next;
                }
            }
        }
        return head;
    }
}
