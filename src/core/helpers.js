
function range(start, end, char = null) {
  let array = [...Array(end - start).keys()];
  return array.map(i => char != null ? char : (i + start));
}

function prefixWithZeros(count, value) {
  return `${range(0, count, '0').join('')}${value}`;
}

function header(title) {
  let border = () => range(0, 20, "=").join("");
  return `\n\n${border()}${title}${border()}`
}

function reverse(str) {
  return [...str].reverse().join('')
}

function binaryToDecimal(value) {
  let sum = pow = 0;
  for (let i of reverse(value)) {
    sum += i * Math.pow(2, pow++);
  }
  return sum;
}
