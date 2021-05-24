package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.List;
import com.kartik.compcoding.lib.string.StringManipulation;

public class RearrangeSpaces {
    public String reorderSpaces(String text) {
        List<StringBuilder> sL = new ArrayList<>();
        int sC = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            Character c = text.charAt(i);
            if (c == ' ') {
                if (sb.length() > 0) {
                    sL.add(new StringBuilder(sb));
                    sb.setLength(0);
                }
                sC++;
            }
            else {
                sb.append(c);
            }
        }
        
        if (sb.length() > 0) {
            sL.add(new StringBuilder(sb));
            sb.setLength(0);
        }
        
        if (sL.isEmpty()) {
            return text;
        }
        
        if (sL.size() == 1) {
            return sL.get(0).append(StringManipulation.fillChar(' ', sC)).toString();
        }
        
        int batch = sC / (sL.size() - 1);
        int mod = sC % (sL.size() - 1);
        int i = 0;
        for (StringBuilder s : sL) {
            sb.append(s);
            if (i != sL.size() - 1) {
                sb.append(StringManipulation.fillChar(' ', batch));
            }
            i++;
        }
        sb.append(StringManipulation.fillChar(' ', mod));
        return sb.toString();
    }
    
    public static String fillSpaces(int n) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(' ');
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(new RearrangeSpaces().reorderSpaces("         walks         ") + ":");
    }
}