
function split(value) {
  let sign = parseSign(value);
  let splitted = value.replace('-', '').split('.');
  splitted.push('0'); // in case of integer value
  return {integer: splitted[0], fraction: splitted[1], sign: sign};
}

function parseSign(value) {
  return value[0] === '-' ? '1' : '0';
}

function intToBin(value) {
  let result = value ? (value % 2) + intToBin(Math.floor(value / 2)) * 10 : 0;
  return result.toString();
}

function leadingZeros(value) {
  return `${range(0, EXPONENT - value.length, '0').join('')}${value}`;
}

function fractionToBin(value, size) {
  let bin = '';
  value /= (Math.pow(10, value.toString().length));

  range(0, size).forEach(() => {
    let v = value - parseInt(value);
    bin += (v * 2) > 1 ? '1' : '0';
    value *= 2;
  });
  return bin;
}

function fractionToBinUnderOne(value, size){
  let bin = '';
  let valueTemp = value;
  let flag = true;
  value /= (Math.pow(10, value.toString().length));

  while(flag){
    let v = value - parseInt(value);
    (v * 2) > 1 ? flag = false : size++;
    value *= 2;
  };


  return fractionToBin(valueTemp, size + 1);
}


function bias(exponentBits) {
  return (RANGE['32'].upper + exponentBits).toString();
}

function convertExponant(tabBin) {
  let value = 0;
  let power = 7;
  for (let index = 1; index < 9; index++) {
    value += tabBin[index] * Math.pow(2, power);
    power--;
  }
  value -= 127;
  //console.log("Exponant : " + value);
  return value;
}

function convertFloat(tabBin) {
  let value = 0;
  let power = -1;
  for (let index = 9; index < 32; index++) {
    value += tabBin[index] * Math.pow(2, power);
    power--;
  }
  
  // Bit implicite
  value += 1;
  //console.log("Mantisse : " + value);
  value *= Math.pow(2, this.convertExponant(tabBin));
  
  return value;
}