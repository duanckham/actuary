Actuary
-------

```
const actuary = require('actuary');

function equation(a1, a2, a3, done) {
  done(a1 + a2 + a3);
}

function referee(best, result) {
  return best < result;
}

let params = [
  [1, 2, 9],
  [1, 2, 4],
  actuary.range(5, 8, 1), // 5, 6, 7
];

let bestParams = await actuary.calculate(params, equation, referee[, concurrency = 10]);

console.log(bestParams); // [ 9, 4, 7 ]
```
