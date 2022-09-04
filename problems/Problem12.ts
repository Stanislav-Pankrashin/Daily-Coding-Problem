/**
 * There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. 
 * Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.
 * For example, if N is 4, then there are 5 unique ways:
1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2
What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.
 */

const StairClimber = (steps: number, allowedSteps: number[] = [1,2]): any => {

    const flattenedResult: number[][] = []; 

    const stepRecursive = (currentArray: number[]): void => {
        // get the current number of steps climbed
        const currentNumberOfSteps = currentArray.reduce(
            (val: number, agg: number) => agg + val,
            0
        );
        
        if (currentNumberOfSteps >= steps) {
            flattenedResult.push(currentArray);
            return;
        }

        allowedSteps.forEach((step: number) => {
            if (currentNumberOfSteps + step <= steps) {
                stepRecursive([...currentArray, step]);
            }
        })
    };

    stepRecursive([]);

    return flattenedResult;
};

console.log(StairClimber(4));
console.log(StairClimber(8, [1,3,5]));
