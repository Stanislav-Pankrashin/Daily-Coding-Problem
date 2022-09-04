/**
 * Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space?
 */

const nonAdjacentMax = (arr: number[]): number => {
    return -1;
};

const test1 = nonAdjacentMax([2, 4, 6, 2, 5]) === 13;
console.log(test1);

const test1 = nonAdjacentMax([5, 1, 1, 5]) === 10;
console.log(test1);