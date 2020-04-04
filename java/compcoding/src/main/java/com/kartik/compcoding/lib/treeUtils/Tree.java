package com.kartik.compcoding.lib.treeUtils;

import java.util.List;

public class Tree<T> {
   Tree(T x) {
     value = x;
   }
   T value;
   Tree<T> left;
   Tree<T> right;
//   List<T> traversalList;

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public Tree<T> getLeft() {
        return left;
    }

    public void setLeft(Tree<T> left) {
        this.left = left;
    }

    public Tree<T> getRight() {
        return right;
    }

    public void setRight(Tree<T> right) {
        this.right = right;
    }

    public List<T> inorderTraversal(List<T> traversalList) {
        if (this.left != null)
            this.left.inorderTraversal(traversalList);
        traversalList.add(this.value);
        if (this.right != null)
            this.right.inorderTraversal(traversalList);
        return traversalList;
    }

    public Tree(T value, Tree<T> left, Tree<T> right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}