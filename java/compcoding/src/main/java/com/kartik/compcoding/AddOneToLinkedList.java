package com.kartik.compcoding;

/**
 * jumbotail interview question
 * couldn't answer on the spot
 */
public class AddOneToLinkedList {
    static ListNode addOne(ListNode<Integer> listNode, Integer len) {
        int sum, unit, carry;
        if (listNode.next == null) {
            sum = listNode.val + 1;
            unit = sum % 10;
            carry = sum / 10;
            listNode.val = unit;
            if (len == 0) {
                return listNode;
            }
        } else {
            ListNode<Integer> listNode1 = addOne(listNode.next, ++len);
            len--;
            sum = listNode.val + listNode1.val;
            unit = sum % 10;
            carry = sum / 10;
            listNode.val = unit;
            listNode.next = listNode1.next;
            if (carry == 0 && len == 0) {
                return listNode;
            }
        }
        return new ListNode(carry, listNode);
    }
}
