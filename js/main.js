function checkRangeConditions(min, max) {
  if (min < 0 || max < 0) {
    return 'Введены отрицательные числа';
  } else if (max < min) {
    return 'Максимальное значение меньше минимального';
  } else if (max === min) {
    return 'Введены одинаковые числа';
  }
}

function getRandomNumberInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (checkRangeConditions(min, max)) {
    return checkRangeConditions(min, max);
  }
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}


function getRandomNumber(min, max, afterDot) {
  if (checkRangeConditions(min, max)) {
    return checkRangeConditions(min, max);
  }
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(afterDot);
}

getRandomNumber(4.3,15.42,5);
getRandomNumberInt(0,15);
