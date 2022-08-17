/**
A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1
 */

class BinaryTree {
    root: BinaryTreeNode;

    constructor(value: number) {
        const root = new BinaryTreeNode(value);
        this.root = root;
    }

    countUnivalSubtrees(): number {
        // count subtrees on root
        return this.root.countUnivalSubtrees().number;
    }
}

class BinaryTreeNode {
    childOne: BinaryTreeNode | null;
    childTwo: BinaryTreeNode | null;

    constructor(public value: number) {
        this.childOne = null;
        this.childTwo = null;
    }

    countUnivalSubtrees(): {continue: boolean, number: number} {

        // if both children match the current node, we count this as a subtree
        let childrenAllMatch = 
        (this.childOne?.value ?? this.value) === this.value && 
        (this.childTwo?.value ?? this.value) === this.value ?
        1 :
        0;

        // a leaf is always a subtree
        if (!this.childOne && !this.childTwo) {
            return {continue: true, number: 1};
        }

        const childOneSubtrees: {continue: boolean, number: number} = this.childOne?.countUnivalSubtrees() ?? {continue: true, number: 0};
        const childTwoSubtrees: {continue: boolean, number: number} = this.childTwo?.countUnivalSubtrees() ?? {continue: true, number: 0};

        // if either subtree had no matching children, we do not count this branch any more
        childrenAllMatch = !childOneSubtrees.continue || !childTwoSubtrees.continue ? 0 : childrenAllMatch;
        
        return {continue: childrenAllMatch ? true : false, number: childOneSubtrees.number + childTwoSubtrees.number + childrenAllMatch};
    }
}


/**
   0
  / \
 1   0
    / \
   1   0
  / \
 1   1
 */
{
    const tree1 = new BinaryTree(0);
    
    const root_childOne = new BinaryTreeNode(1);
    const root_childTwo = new BinaryTreeNode(0);
    tree1.root.childOne = root_childOne;
    tree1.root.childTwo = root_childTwo;
    
    const root_childTwo_childOne = new BinaryTreeNode(1);
    const root_childTwo_childTwo = new BinaryTreeNode(0);
    root_childTwo.childOne = root_childTwo_childOne;
    root_childTwo.childTwo = root_childTwo_childTwo;
    
    const root_childTwo_childOne_childOne = new BinaryTreeNode(1);
    const root_childTwo_childOne_childTwo = new BinaryTreeNode(1);
    root_childTwo_childOne.childOne = root_childTwo_childOne_childOne;
    root_childTwo_childOne.childTwo = root_childTwo_childOne_childTwo;
    
    console.log(`Test1 should equal 5: PASS?: ${tree1.countUnivalSubtrees() === 5}`);
}

/**
   0
  / \
 1   0
/ \  / \
1 1  1  0
    / \
   1   1
 */

{
    const tree1 = new BinaryTree(0);
    
    const root_childOne = new BinaryTreeNode(1);
    const root_childTwo = new BinaryTreeNode(0);
    tree1.root.childOne = root_childOne;
    tree1.root.childTwo = root_childTwo;

    const root_childOne_childOne = new BinaryTreeNode(1);
    const root_childOne_childTwo = new BinaryTreeNode(1);
    root_childOne.childOne = root_childOne_childOne;
    root_childOne.childTwo = root_childOne_childTwo;
    
    const root_childTwo_childOne = new BinaryTreeNode(1);
    const root_childTwo_childTwo = new BinaryTreeNode(0);
    root_childTwo.childOne = root_childTwo_childOne;
    root_childTwo.childTwo = root_childTwo_childTwo;
    
    const root_childTwo_childOne_childOne = new BinaryTreeNode(1);
    const root_childTwo_childOne_childTwo = new BinaryTreeNode(1);
    root_childTwo_childOne.childOne = root_childTwo_childOne_childOne;
    root_childTwo_childOne.childTwo = root_childTwo_childOne_childTwo;
    
    console.log(`Test2 should equal 7: PASS?: ${tree1.countUnivalSubtrees() === 7}`);
}

/**
   0
  / \
 1   0
/ \  / \
1 0  0  0
    / \
   1   1
 */

{
    const tree1 = new BinaryTree(0);
    
    const root_childOne = new BinaryTreeNode(1);
    const root_childTwo = new BinaryTreeNode(0);
    tree1.root.childOne = root_childOne;
    tree1.root.childTwo = root_childTwo;

    const root_childOne_childOne = new BinaryTreeNode(1);
    const root_childOne_childTwo = new BinaryTreeNode(0);
    root_childOne.childOne = root_childOne_childOne;
    root_childOne.childTwo = root_childOne_childTwo;
    
    const root_childTwo_childOne = new BinaryTreeNode(0);
    const root_childTwo_childTwo = new BinaryTreeNode(0);
    root_childTwo.childOne = root_childTwo_childOne;
    root_childTwo.childTwo = root_childTwo_childTwo;
    
    const root_childTwo_childOne_childOne = new BinaryTreeNode(1);
    const root_childTwo_childOne_childTwo = new BinaryTreeNode(1);
    root_childTwo_childOne.childOne = root_childTwo_childOne_childOne;
    root_childTwo_childOne.childTwo = root_childTwo_childOne_childTwo;
    
    console.log(`Test3 should equal 5: PASS?: ${tree1.countUnivalSubtrees() === 5}`);
}