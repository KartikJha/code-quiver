package com.kartik.compcoding;

import java.nio.Buffer;

public class Node<T> {
  T value;
  Node next;

  public Node(T value, Node next) {
    this.value = value;
    this.next = next;
  }


  public T getValue() {
    return value;
  }

  public Node getNext() {
    return next;
  }

  public void setValue(T value) {
    this.value = value;
  }

  public void setNext(Node next) {
    this.next = next;
  }

  public static Node reverse(Node head) {
    Node curr = head, prev = null;
    while (curr.next != null) {
      Node temp  = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }
    curr.next = prev;
    return curr;
  }

  public static void print(Node head) {
    Node curr  =head;
    while (curr != null) {
      System.out.println(curr.getValue());
      curr = curr.getNext();
    }
  }


  public static void main(String[] args) {
    Node<Integer> head = new Node<>(1, null);
    head.setNext(new Node<Integer> (2, new Node<>(3, new Node(8, new Node(90, null)))));

    Node.print(head);
    System.out.println();
    Node.print(Node.reverse(head));
  }
}
