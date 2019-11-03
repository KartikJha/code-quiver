package com.kartik.compcoding;

import java.util.Arrays;
import java.util.Stack;

class ValidParantheses {

    private static boolean isOpen(Character c) {
        return Arrays.asList(new Character[]{'{', '(', '['}).contains(c);
    }

    private static boolean isMatching(Character open, Character close) {
        switch (open) {
            case '{':
                return close == '}';
            case '(':
                return close == ')';
            case '[':
                return close == ']';
            default:
                return false;
        }
    }

    static boolean isValid(String s) {
        Stack<Character> characterStack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            Character currChar = s.charAt(i);
            if (isOpen(currChar)) {
                characterStack.push(currChar);
            } else if (!characterStack.isEmpty() && isMatching(characterStack.peek(), currChar)) {
                characterStack.pop();
            } else {
                return false;
            }
        }
        return characterStack.isEmpty();
    }
}
