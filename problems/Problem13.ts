/**
 * Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
 */

// honestly this is a pretty bad solution
const longestSubstring = (string: string, k: number): string => {
    
    // track the longest string
    let longest = "";
    // iterate through each character and count forward until we exceed the number of unique characters
    for (let i = 0; i < string.length; i++) {
        for (let j = i; j < string.length; j++) {
            const currentSlice = string.slice(i, j + 1);
            const currentSliceCharacters = new Set(Array.from(currentSlice));

            // once we meet the max number of unique characters, check to see if this new substring is longer than the current longest substring
            if (currentSliceCharacters.size === k) {
                longest = longest.length < currentSlice.length ? currentSlice : longest;
            }

            // if we now have too many unique characters, break out of this iteration of starting letter to prevent full scans of the string every time
            if (currentSliceCharacters.size > k) {
                break;
            }
        }
    }
    
    return longest;
};

const test1 = longestSubstring("abcba", 2);

console.log(`Test1 result: ${test1 === "bcb"}`)
