/**
Given an array of integers, find the first missing positive integer in linear time and constant space. 

In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
 */

const lowestMissingInteger = (array: number[]): number => {

    // sort the array, this mutates the existing array so it is constant space
    const sortedArray = array.sort();

    let nextInteger = 1;

    // iterate over the array
    sortedArray.forEach(e => {
        if (e === nextInteger) {
            nextInteger = nextInteger + 1;
        } else {
            // early exit if we don't get a number we need
            return nextInteger;
        }
    });

    return nextInteger;
};

export const main = () => {
    const test1 = lowestMissingInteger([3, 4, -1, 1]);
    const test2 = lowestMissingInteger([1, 2, 0]);
    const test3 = lowestMissingInteger([3, 4, -1, 1, 2, 6]);
    
    console.log(`test1 pass: ${test1 === 2}`);
    console.log(`test2 pass: ${test2 === 3}`);
    console.log(`test3 pass: ${test3 === 5}`);
}

main();
