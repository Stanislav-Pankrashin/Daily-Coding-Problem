/*
This problem was asked by Jane Street.

cons(a, b) constructs a pair, and car(pair) and cdr(pair) 
returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

Given this implementation of cons:

def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair
Implement car and cdr.
*/

const cons = (a: number, b: number) => {
    const pair = (f: (a: number, b: number) => number) => {
        return f(a, b);
    }

    return pair;
}

type PairType = (f: (a: number, b: number) => number) => number;

const car = (func: (f: (a: number, b: number) => number) => number): number => {
    return func((a, b) => a);
}

const cdr = (func: (f: (a: number, b: number) => number) => number): number => {
    return func((a, b) => b);
}

const test1 = car(cons(3, 4));
const test2 = cdr(cons(3, 4));

console.log(`test1 pass: ${test1 === 3}`);
console.log(`test2 pass: ${test2 === 4}`);
