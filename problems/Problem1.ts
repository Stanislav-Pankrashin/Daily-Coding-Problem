/**
 * This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?
 */

const TwoNumbers = (k: number, list: number[]): boolean => {
    type index = number;
    type value = number;
    const numbersMap = new Map<value, index>();

    for(let i = 0; i < list.length; i++) {
        const value = list[i];
        if (numbersMap.get(value) === undefined) {
            numbersMap.set(value, i);
        }

        const valueToFind = k - value;
        const foundValue = numbersMap.get(valueToFind);

        if (foundValue !== undefined) {
            return true;
        }
    }

    return false;
};


const test1 = TwoNumbers(17, [10, 15, 3, 7]);

console.log(`test1 pass: ${test1 === true}`);