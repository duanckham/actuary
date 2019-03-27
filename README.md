Actuary
-------

```
const actuary = require('actuary');

function equation(a1, a2, done) {
  done(a1 + a2);
}

function referee(best, result) {
  return best < result;
}

let params = [
  [1, 2, 3],
  [1, 2, 4],
  [1, 3, 4],
];

let bestParams = await actuary(params, equation, referee[, concurrency = 10]);

console.log(bestParams); // [1, 3, 4]
```
