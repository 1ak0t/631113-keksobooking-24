function getRandomNumberInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function getRandomNumber(min, max, afterDot) {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterDot);
}

export {getRandomNumberInt, getRandomNumber};
