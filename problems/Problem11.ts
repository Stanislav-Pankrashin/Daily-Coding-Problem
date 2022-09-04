/**
 * Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
 */

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

                let toSet: string[] = [word];
                // if the hash already exists, update the existing entry
                if (this._partialWordsMap.has(partialWord)) {
                    const current = this._partialWordsMap.get(partialWord)!;
                    toSet = [...current, word];
                }

                this._partialWordsMap.set(partialWord, toSet);
            });
        });
    }

    autocomplete(str: string): string[] {
        return this._partialWordsMap.get(str) ?? [];
    }
}

const autocompleter = new Autocompleter(["dog", "deer", "deal"]);

const results = autocompleter.autocomplete("de");

console.log(results);
