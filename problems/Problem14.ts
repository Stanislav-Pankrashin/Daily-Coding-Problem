/**
 * The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.

Hint: The basic equation of a circle is x2 + y2 = r2.
 */

/**
 * Calculates PI to a given number of decimal places using a Monte Carlo method
 * 
 * This is achieved by putting a bounding box around a given circle of radius 1
 * for r = 1
 * The area of a circle in this scenario is πr^2 = π1^2 = π
 * The area of a square in this scenario is w^2, w=2r = w = 2, 2^2 = 4
 * The ratio between the area of the circle and the square therefore is π/4
 * 
 * Monte carlo deals with generating a very large number of random points inside the square, and counting the number of points that are inside the circle or just the square
 * π/4 = number of points inside the circle / total number of points
 * π = 4 * number of points inside the circle / total number of points
 * 
 * To determine if a point of (x,y) is inside the circle, we use x^2 + y^2 = r^2
 * as r = 1, therefore x^2 + y^2 = 1. A point is inside of the circle if  x^2 + y^2 <= 1.
 */
 const FindPi = (decimalPlaces: number): number => {
    const maxIterations = 100_000_000;

    let pointsInCircle = 0;
    for (let i = 1; i <= maxIterations; i++) {
        const point = {
            x: (Math.random() * 2) - 1,
            y: (Math.random() * 2) - 1
        }

        pointsInCircle = Math.pow(point.x, 2) + Math.pow(point.y, 2) <= 1 ? pointsInCircle + 1 : pointsInCircle;
    }

    const pi = 4 * (pointsInCircle / maxIterations);

    return parseFloat(pi.toPrecision(decimalPlaces + 1));
}

const decimalPlaces = 3;
const pi = FindPi(3);

const piRounded = parseFloat(Math.PI.toPrecision(decimalPlaces + 1))
console.log(`Is pi ${piRounded} ?: ${pi === piRounded}. Actual value ${pi}`)