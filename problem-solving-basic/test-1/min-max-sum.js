function minMaxSum(arr) {
  const numbers = arr.split(" ").map(Number);

  numbers.sort((a, b) => a - b);

  const minSum = numbers.slice(0, 4).reduce((acc, num) => acc + num, 0);

  const maxSum = numbers.slice(1).reduce((acc, num) => acc + num, 0);

  console.log(minSum, maxSum);
}

const input = "1 2 3 4 5";
minMaxSum(input);
