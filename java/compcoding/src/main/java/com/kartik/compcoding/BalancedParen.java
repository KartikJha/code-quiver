package com.kartik.compcoding;

import java.util.Stack;

public class BalancedParen {
  public static boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (int i = 0; i < s.length(); i++) {
      Character c = s.charAt(i);
      if (s.charAt(i) == '(') {
        stack.push(c);
      } else if (!stack.isEmpty() && stack.peek() == '('){
        stack.pop();
      } else if (c == ')') {
        return false;
      }
    }
    return stack.isEmpty();
  }

  public static void main(String[] args) {
    System.out.println(BalancedParen.isValid("()"));
    System.out.println(BalancedParen.isValid("(abdsf)asdf)"));
  }
}
