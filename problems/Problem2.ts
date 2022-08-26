/**
 * Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
 */

const ProductNotAtIndex = (arr: number[]): number[] => {
    const forwardPointer: number[] = new Array<number>(arr.length).fill(0);
    const reversePointer: number[] = new Array<number>(arr.length).fill(0);

    // reverse pointer
    for (let i = arr.length - 1; i >= 0; i--) {
        reversePointer[i] = (arr?.[i] ?? 1) * (reversePointer?.[i + 1] ?? 1);
    }

    // forward pointer
    for (let i = 0; i < arr.length; i++) {
        forwardPointer[i] = (arr?.[i] ?? 1) * (forwardPointer?.[i - 1] ?? 1);
    }

    const result: number[] = new Array<number>(arr.length).fill(0);

    // for each index, multiply the value of the pointer either side of it to get the product of all numbers but not including the index value
    arr.forEach((value: number, index: number) => {
        result[index] = (forwardPointer?.[index - 1] ?? 1) * (reversePointer?.[index + 1] ?? 1);
    });

    return result;
};

const CompareArrays = (arr1: number[], arr2: number[]): boolean => {
    return arr1.every((value: number, index: number) => value === arr2[index]);
};

const test1Array = [1, 2, 3, 4, 5];
const test2Array = [3, 2, 1];
const test1Result = ProductNotAtIndex(test1Array);
const test2Result = ProductNotAtIndex(test2Array);

console.log(`test1 pass: ${CompareArrays(test1Result, [120, 60, 40, 30, 24])}`);
console.log(`test12 pass: ${CompareArrays(test2Result, [2, 3, 6])}`);