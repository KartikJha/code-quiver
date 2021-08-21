package com.kartik.compcoding;

public class ValidateBinaryTree {
    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        boolean[] nodes = new boolean[n];
        nodes[0] =  true;
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (leftChild[i] != -1) {
                if (leftChild[i] == 0) {
                    if (nodes[i]) 
                        return false;
                } else if(nodes[leftChild[i]]) {
                    return false;
                }
              
                nodes[leftChild[i]] = true;
                count++;
            }
            if (rightChild[i] != -1) {
                if (rightChild[i] == 0) {
                    if (nodes[i])
                        return false;
                } else if (nodes[rightChild[i]]) {
                    return false;
                }
              
                nodes[rightChild[i]] = true;
                count++;
            }
        }
        return count == n - 1;
    }
}
