function minMaxSum(arr) {
  arr.sort((a, b) => a - b);

  const minSum = arr.slice(0, 4).reduce((acc, num) => acc + num, 0);

  const maxSum = arr.slice(1).reduce((acc, num) => acc + num, 0);

  console.log(minSum, maxSum);
}

const array = [1, 3, 5, 7, 9];
minMaxSum(array);
