/**
 Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

You can assume that the messages are decodable. For example, '001' is not allowed.
 */


/**
 * SOLUTION NOTES:
 * When decoding a string, we can build a binary tree representing the strings to be decoded.
 * We can decode either one number or two
 * If a branch is not valid, i.e if the number is greater than 26, we disregard the entire branch
 * e.g
 * "123":
 * |                          \
 * "1"                       "12"
 * |     \                    |
 * "2"   "23"                "3"
 * |     "1","23"==="AW"     "12","3" ="LC"
 * "3"
 * "1","2","3"==="ABC"
 */
 const LETTER_MAPPING: string[] = [
    "", // dummy letter to correctly set A === 1
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

const decodeLetter = (letter: string): string | undefined => {
    return LETTER_MAPPING?.[parseInt(letter)];
}

const decodeMessage = (message: string): string[] => {
    // if we just have one character, decode it and return
    if (message.length === 1) {
        const firstDecoded = decodeLetter(message[0]);
        return [firstDecoded ?? ""];        
    }

    // if we have two characters, we can decode each letter as one digit, and decode both digits as a 3rd letter, returning the result
    if(message.length === 2) {
        const bothDecoded = decodeLetter(message) ?? "";
        
        return [`${decodeLetter(message[0])}${decodeLetter(message[1])}`, bothDecoded];
    } 

    // pull one character as one number and as two numbers.
    //e.g "12" can decode using "1" and "2" as well as "12", giving either, AB, or L
    const firstCharacter = decodeLetter(message.slice(0, 1));
    const secondCharacter = decodeLetter(message.slice(0, 2));
    // we create two slices that do not include the letters we wish to decode
    const firstSlice = message.slice(1);
    const secondSlice = message.slice(2);

    const branchOne = firstCharacter === "0" ? [] : decodeMessage(firstSlice).map(e => e === "" ? "" : `${firstCharacter}${e}`).filter(e => e !== "");

    // if the 2nd character is not valid, we cannot use it and return nothing for this branch.
    const branchTwo = !secondCharacter ? [] : decodeMessage(secondSlice).map(e => e === "" ? "" : `${secondCharacter}${e}`).filter(e => e !== "");

    // we iterate through all of the returned letters, appending the relevant decoded letter to the start of the result set for each returned letter
    return [...branchOne, ...branchTwo];
}

export const main = () => {
    const message1 = "111";
    const decoded_message1 = decodeMessage(message1);
    
    console.log(`test 1 result: ${decoded_message1}`);
    
    const message2 = "76548";
    const decoded_message2 = decodeMessage(message2);
    
    console.log(`test 2 result: ${decoded_message2}`);
    
    const message3 = "192011491912122"; //STANISLAV
    const decoded_message3 = decodeMessage(message3);
    
    console.log(`test 3 result: ${decoded_message3}`);
    console.log(`test 3 result contains STANISLAV ?: ${decoded_message3.some(e => e === "STANISLAV")}`)
}
