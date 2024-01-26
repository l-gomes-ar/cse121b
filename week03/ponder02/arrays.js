// Activity 1
const steps = ['one', 'two', 'three'];

const stepsHtml = steps.map((step) => `<li>${step}</li>`);

document.querySelector('#myList').innerHTML = stepsHtml.join('');

// Activity 2
let grades = ['A', 'B', 'A'];

function convertGradeToPoints (grade) {
    let points = 0;
    if (grade === 'A') {
        points = 4;
    } else if (grade === 'B') {
        points = 3;
    }

    return points;
}

let gpaPoints = grades.map(convertGradeToPoints);

console.log(gpaPoints);

// Activity 3
grades = ['A', 'B', 'B', 'A', 'A'];

gpaPoints = grades.map(convertGradeToPoints);

const gpa = gpaPoints.reduce((totalPoints, point) => totalPoints + point, 0) / gpaPoints.length;

console.log(gpa);

const fruits = ['watermelon', 'peach', 'apple', 'grape'];

const fruitsLongerSixChar = fruits.filter((fruit) => fruit.length > 6);
console.log(fruitsLongerSixChar);

// Activity 4
const numbers = [12, 34, 21, 54];
const luckNumber = 21;

let luckyIndex = numbers.indexOf(luckNumber);
console.log(luckyIndex);