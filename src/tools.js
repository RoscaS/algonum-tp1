function split(value) {
  let sign = value[0] === '-' ? '1' : '0';
  let splitted = value.replace('-', '').split('.');
  splitted.push('0'); // case fractional == 0
  return {integer: splitted[0], fraction: splitted[1], sign: sign};
}

function intToBin(value) {

  return value > 500000 ? bigIntToBin(value) : smallIntToBin(value)
}

function smallIntToBin(value) {
  let result = value ? (value % 2) + intToBin(Math.floor(value / 2)) * 10 : 0;
  return result.toString();
}

function bigIntToBin(value) {
  let div = bigInt(value).divmod(2);
  let result = bigInt(value).isZero() ? 0 : bigInt(div.remainder).add(
    bigInt(bigIntToBin(div.quotient)).multiply(10)
  );
  return result.toString();
}

function leadingZeros(value, exponentSize) {
  return `${range(0, exponentSize - value.length, '0').join('')}${value}`;
}

function fractionToBin(value, size, intEqZero, bin = '') {
  value /= (Math.pow(10, value.toString().length));
  size = intEqZero ? fixSize(value, size) : size;

  range(0, size).forEach(() => {
    bin += ((value - parseInt(value)) * 2) > 1 ? '1' : '0';
    value *= 2;
  });
  return bin;
}

function fixSize(value, size, flag = true) {
  while (flag) {
    (value - parseInt(value)) * 2 > 1 ? flag = false : size++;
    value *= 2;
  }
  return ++size;
}

function bias(exponentBits, upperLimit) {
  return (upperLimit + exponentBits).toString();
}

function binaryToBaseTen(bin) {
  let mantissa = binarToFloat(strToBitArray(bin, 8, 32));
  let exponent = binarToFloat(strToBitArray(bin, 0, 8), 8);
  return (mantissa + 1) * Math.pow(2, exponent - 127);
}

function binarToFloat(bin, power = 0, value = 0) {
  bin.forEach(i => value += i * Math.pow(2, --power));
  return value;
}
