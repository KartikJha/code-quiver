package com.kartik.compcoding;

import java.util.Stack;

//todo implement O(n) and O(1) solution
public class BackspaceString {
    public boolean backspaceCompare(String S, String T) {
        // int bSpace = 0;
        // StringBuilder a = new StringBuilder(), b = new StringBuilder();
        // for (int i = S.length() - 1; i > -1 ; i--) {
        //     char c = S.charAt(i);
        //     if (c == '#') {
        //         bSpace += 1;
        //     } else if (bSpace != 0) {
        //         if (i - bSpace < 0) break;
        //         i -= bSpace;
        //         bSpace = 0;
        //         char n = S.charAt(i);
        //         if (n != '#') a.append(n);
        //     } else {
        //         a.append(c);
        //     }
        // }
        // bSpace = 0;
        // for (int i = T.length() - 1; i > -1; i--) {
        //     char c = T.charAt(i);
        //     if (c == '#') {
        //         bSpace += 1;
        //     } else if (bSpace != 0) {
        //         if (i - bSpace < 0) break;
        //         i -= bSpace;
        //         bSpace = 0;
        //         char n = T.charAt(i);
        //         if (n != '#') b.append(n);
        //     } else {
        //         b.append(c);
        //     }
        // }
        // System.out.println(a.toString() + " " + b.toString());
        // return a.toString().equals(b.toString());

        Stack<Character> a = new Stack<>(), b = new Stack<>();
        for (int i = 0; i < S.length(); i++) {
            char c = S.charAt(i);
            if (c == '#' && !a.isEmpty()) {
                a.pop();
            } else if (c != '#'){
                a.push(c);
            }
        }
        for (int i = 0; i < T.length(); i++) {
            char c = T.charAt(i);
            if (c == '#' && !b.isEmpty()) {
                b.pop();
            } else if (c != '#') {
                b.push(c);
            }
        }
        if (a.size() != b.size()) return false;

        while(!a.isEmpty()) if (a.pop() != b.pop()) return false;

        return true;
    }
}