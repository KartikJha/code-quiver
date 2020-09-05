import TreeNode from './lib/TreeNode';
import { mergeSortedList } from './lib';

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
    const l1 = root1.inorderTraversal(root1, []), l2 = root1.inorderTraversal(root2, []);
    return mergeSortedList(l1, l2);
};

export default getAllElements;