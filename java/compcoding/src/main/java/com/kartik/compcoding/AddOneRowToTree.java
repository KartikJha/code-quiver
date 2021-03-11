package com.kartik.compcoding;

import java.util.LinkedList;
import java.util.Queue;

import com.kartik.compcoding.lib.treeUtils.TreeNode;

class Node {
    public TreeNode node;
    public Integer level;
    Node(TreeNode n, Integer l) {
        node = n;
        level = l;
    }
}


public class AddOneRowToTree {
    public TreeNode addOneRow(TreeNode root, int v, int d) {
        if (d == 1) {
            return new TreeNode(v, root, null);
        }
        Queue<Node> q = new LinkedList<>(), q2 = new LinkedList<>();
        q.offer(new Node(root, 1));
        Integer currLevel = d - 1;
        while (!q.isEmpty() && currLevel < d) {
            Node curr = q.poll();
            
            if (!curr.level.equals(currLevel)) {
                currLevel = curr.level;
            }
            if (currLevel == d - 1) {
                q2.offer(new Node(curr.node, currLevel));
            }
            if (curr.node.left != null)
                q.offer(new Node(curr.node.left, curr.level + 1));
            if (curr.node.right != null)
                q.offer(new Node(curr.node.right, curr.level + 1));
        }
        while (!q2.isEmpty()) {
            Node curr = q2.poll();
            curr.node.left = new TreeNode(v, curr.node.left, null);
            curr.node.right = new TreeNode(v, null, curr.node.right);
        }
        return root;
    }
}