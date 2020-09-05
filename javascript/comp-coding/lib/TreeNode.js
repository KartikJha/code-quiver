export default function TreeNode(val = 0, right = null, left = null) {
    const inorderTraversal = (root, traversal = []) => {
        if (root) {
            if (root.left) {
                inorderTraversal(root.left, traversal);
            }
            traversal.push(root.val);
            if (root.right) {
                inorderTraversal(root.right, traversal);
            }
        }
      
        return traversal;
    }
    Object.assign(this, { val, right, left, inorderTraversal });
    return this
}