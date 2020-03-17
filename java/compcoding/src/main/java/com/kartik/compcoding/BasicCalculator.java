//package com.kartik.compcoding;
//
//import java.util.Stack;
//import java.util.regex.Pattern;
//
//public class BasicCalculator {
//
//    protected Long evaluateExpression(String expression) {
//        Stack<Character> operatorStack = new Stack<>();
//        Stack<Character> operandStack = new Stack<>();
//        for (int i = 0; i < expression.length(); i++) {
//            Character c = expression.charAt(i);
//            // operand
//            if (c >= 48 && c <= 57) {
//                operandStack.push(c);
//            } else if (c == ')') {
//                Character top = operatorStack.pop();
//                while(top != '(') {
//                    Character b = operandStack.pop();
//                    Character a = operandStack.pop();
//                    operandStack.push(getResult(a, b, top));
//                }
//            } else if (c == '(') {
//                operatorStack.push(c);
//            } else {
//                Character top = operatorStack.peek();
//                while (!operatorStack.isEmpty() && higherPrecedence(top, c)) {
//                    operatorStack.pop();
//                    Character b = operandStack.pop();
//                    Character a = operandStack.pop();
//                    operandStack.push(getResult(a, b, top));
//                    top = operatorStack.peek();
//                }
//                operandStack.push(c);
//            }
//        }
//        while (!operatorStack.isEmpty()) {
//            Character top = operatorStack.pop();
//            if (top == ')') {
//                while (top != '(') {
//                    Character b = operandStack.pop();
//                    Character a = operandStack.pop();
//                    operandStack.push(getResult(a, b, top));
//                    top = operatorStack.pop();
//                }
//            } else {
//                Character b = operandStack.pop();
//                Character a = operandStack.pop();
//                operandStack.push(getResult(a, b, top));
//            }
//        }
//        return 0L;
//    }
//
//}
//
//// 3 + (4 + 5) - 6 = 6,
