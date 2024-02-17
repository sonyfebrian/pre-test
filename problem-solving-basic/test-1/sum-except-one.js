function sumExceptOne(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const newArr = arr.slice(0, i).concat(arr.slice(i + 1));

    const sum = newArr.reduce((acc, num) => acc + num, 0);

    result.push(sum);
  }

  return result;
}

const inputArray = [1, 2, 3, 4, 5];
const outputArray = sumExceptOne(inputArray);
console.log(outputArray);
