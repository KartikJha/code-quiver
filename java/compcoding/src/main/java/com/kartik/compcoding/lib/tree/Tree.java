package com.kartik.compcoding.lib.tree;

import java.util.*;

public class Tree<T> {
   Tree(T x) {
     value = x;
   }
   T value;
   Integer hd;
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

    public Integer getHd() {
        return hd;
    }

    public void setHd(Integer hd) {
        this.hd = hd;
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

    public List<T> bottomView() {
        Integer hd = 0;
        Map<Integer, T> treeMap = new TreeMap<>();
        Queue<Tree> nodeList = new LinkedList<>();
        nodeList.add(this);
        List<T> result = new ArrayList<>();
        while (!nodeList.isEmpty()) {
          Tree<T> node = nodeList.remove();
          treeMap.put(hd, node.value);
          if (node.left != null) {
            treeMap.put(hd - 1, node.left.value);
          }
          if (node.right != null) {
            treeMap.put(hd + 1, node.right.value);
          }
        }

        for ( Map.Entry<Integer, T> entry: treeMap.entrySet()) {
          result.add(entry.getValue());
        }
        return result;
    }
}