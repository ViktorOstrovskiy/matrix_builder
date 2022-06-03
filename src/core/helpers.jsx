export const calculateAvarages = (matrix) => {
  const avarages = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let sum = 0;
    for (let index in matrix) {
      sum += matrix[index][i].amount;
    }
    avarages.push({
      id: i + "-" + sum,
      amount: +(sum / matrix.length).toFixed(1),
    });
  }
  return avarages;
};
