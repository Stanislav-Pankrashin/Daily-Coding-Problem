/**
 * Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
 */

// the above class converted to Typescript
class TreeNode {
    constructor(
        public val: string,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null,
    ) {}
}

const serialize = (tree: TreeNode): string => {
    let output = "";

    const serializeRecursive = (root: TreeNode | null) => {
        if (root === null) {
            output += " #";
            return;
        }

        output += ` ${root.val}`;
        serializeRecursive(root.left);
        serializeRecursive(root.right);
    };

    serializeRecursive(tree);

    return output.trim();
};

const deserialize = (tree: string): TreeNode => {
    const iterator = tree.split(" ").reverse();

    const deserializeRecursive = (sequenceIterator: string[] ): TreeNode | null => {
        if(sequenceIterator.length === 0) {
            return null;
        }

        const nextVal = sequenceIterator.pop();

        if (!nextVal) {
            return null;
        }

        if (nextVal === "#") {
            return null;
        }

        return new TreeNode(
            nextVal,
            deserializeRecursive(sequenceIterator),
            deserializeRecursive(sequenceIterator),
        )
    };

    return deserializeRecursive(iterator) as TreeNode;
};

const node = new TreeNode('root', new TreeNode('left', new TreeNode('left.left')), new TreeNode('right'));
const serialized = serialize(node);
const deserialized = deserialize(serialized);
const assert = deserialized?.left?.left?.val == 'left.left';
console.log(serialized);
console.log(deserialized);
console.log(assert)
