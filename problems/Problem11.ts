/**
 * Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
 */

import { createHash } from "node:crypto";

class Autocompleter {
    private readonly _partialWordsMap = new Map<string, string[]>();

    constructor(dictionary: string[]) {
        // cache each word for each substring from the first character
        dictionary.forEach((word: string) => {
            const wordCharacters = Array.from(word);
            let partialWord = "";
            // for each character, hash and store the characters pointing to the whole word
            wordCharacters.forEach((character: string) => {
                partialWord = partialWord + character;
                const hash = createHash("sha256").update(partialWord).digest().toString();

                let toSet: string[] = [word];
                // if the hash already exists, update the existing entry
                if (this._partialWordsMap.has(hash)) {
                    const current = this._partialWordsMap.get(hash)!;
                    toSet = [...current, word];
                }

                this._partialWordsMap.set(hash, toSet);
            });
        });
    }

    autocomplete(str: string): string[] {
        const hash = createHash("sha256").update(str).digest().toString();
        return this._partialWordsMap.get(hash) ?? [];
    }
}

const autocompleter = new Autocompleter(["dog", "deer", "deal"]);

const results = autocompleter.autocomplete("de");

console.log(results);
