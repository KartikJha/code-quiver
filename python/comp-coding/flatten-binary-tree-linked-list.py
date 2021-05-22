class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def flatten(self, root: TreeNode) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        l = TreeNode(-1, None, None)
        self.preOrderFlatten(root, l)
        while (l.right != None):
            print(l.val + " ")
            l = l.right
        root = l
    
    def preOrderFlatten(self, t, l):
        if (t != None):
            l = TreeNode(t.val, None, None)
        nl = l
        if (t.left != None):
            nl = self.preOrderFlatten(t.left, nl.right)
        if (t.right != None):
            nl = self.preOrderFlatten(t.right, nl.right)
        return nl
s = Solution()
s.flatten(TreeNode(1, TreeNode(2, TreeNode(3, None, None), TreeNode(4, None, None)), TreeNode(5, TreeNode(9, None, None), None)))

