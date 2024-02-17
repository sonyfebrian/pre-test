function plusMinus(n, arr) {
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  arr.forEach((num) => {
    if (num > 0) {
      positiveCount++;
    } else if (num < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  });

  const positiveRatio = positiveCount / n;
  const negativeRatio = negativeCount / n;
  const zeroRatio = zeroCount / n;

  console.log(positiveRatio.toFixed(6));
  console.log(negativeRatio.toFixed(6));
  console.log(zeroRatio.toFixed(6));
}

const n = 6;
const arr = [-4, 3, -9, 0, 4, 1];

plusMinus(n, arr);
