const EXPONENT = 8;
const MANTISSA = 23;

function range(start, end) {
  return [...Array(end).keys()].map(i => i + start);
}

function parseSign(value) {
  return value[0] === '-' ? '1' : '0';
}

function intToBin(value) {
  return value ? (value % 2) + intToBin(Math.floor(value / 2)) * 10 : 0;
}

function fractionToBin(value) {
  let bin = '';
  value /= (Math.pow(10, value.toString().length));
  range(0, MANTISSA).forEach(() => {
    let v = value - parseInt(value);
    bin += (v * 2) > 1 ? '1' : '0';
    value *= 2;
  });
  return bin;
}
