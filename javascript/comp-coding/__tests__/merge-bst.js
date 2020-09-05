/* global expect, test */
import func from '../merge-bst';
import TreeNode from '../lib/TreeNode';

test('basicTest 1', () => {
    const out = func(new TreeNode(2, new TreeNode(4, null), new TreeNode(1, null)), new TreeNode(1, new TreeNode(3, null), new TreeNode(0, null)));
    console.log(out);
    expect(out).toStrictEqual([0, 1, 1, 2, 3, 4]);
});

