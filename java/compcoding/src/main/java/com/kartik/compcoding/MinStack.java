package com.kartik.compcoding;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Stack;

public class MinStack {
  private PriorityQueue<Integer> minQueue;
  private Stack<Integer> stack;
  /** initialize your data structure here. */
  public MinStack() {
    this.minQueue =
        new PriorityQueue<Integer>(
            10,
            new Comparator<Integer>() {
              public int compare(Integer a, Integer b) {
                // if (b.equals(a)) {
                //   return 0;
                // }
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }
                return 0;
              }
            });
    this.stack = new Stack<Integer>();
  }

  /*
    ["MinStack","push","push","push","top","pop","getMin","pop","getMin","pop","push","top","getMin","push","top","getMin","pop","getMin"]
  [[],[2147483646],[2147483646],[2147483647],[],[],[],[],[],[],[2147483647],[],[],[-2147483648],[],[],[],[]]
     */

  public static void main(String[] args) {
    MinStack minStack = new MinStack();
    minStack.push(2147483646);
    minStack.push(2147483646);
    minStack.push(2147483647);
    System.out.println(minStack.top());
    minStack.pop();
    System.out.println(minStack.getMin());
    minStack.pop();
    minStack.push(2147483647);
    System.out.println(minStack.top());
    System.out.println(minStack.getMin());
    minStack.push(-2147483648);
    System.out.println(minStack.top());
    System.out.println(minStack.getMin());
    minStack.pop();
    System.out.println(minStack.getMin());
  }

  public void push(int x) {
    this.stack.push(x);
    this.minQueue.add(x);
  }

  public void pop() {
    Integer a = this.stack.pop();
    this.minQueue.remove(a);
  }

  public int top() {
    return this.stack.peek();
  }

  public int getMin() {
    return this.minQueue.peek();
  }
}
