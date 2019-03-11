function split(value) {
  let sign = value[0] === '-' ? '1' : '0';
  let splitted = value.replace('-', '').split('.');
  splitted.push('0'); // case fractional == 0
  return {integer: splitted[0], fraction: splitted[1], sign: sign};
}

function intToBin(value) {
  return value > LIMIT ? bigIntToBin(value) : smallIntToBin(value);
}

function smallIntToBin(value) {
  let result = value ? (value % 2) + intToBin(Math.floor(value / 2)) * 10 : 0;
  return result.toString();
}

function bigIntToBin(value) {
  let div = bigInt(value).divmod(2);
  let result = bigInt(value).isZero() ? 0 : bigInt(div.remainder).add(
    bigInt(bigIntToBin(div.quotient)).multiply(10),
  );
  return result.toString();
}

function fractionToBin(value, size, intEqZero, bin = '') {
  // console.log('fractionToBin: ');
  value /= (Math.pow(10, value.toString().length));
  size = intEqZero ? fixSize(value, size) : size;
  range(0, size).forEach(() => {
    bin += ((value - parseInt(value)) * 2) > 1 ? '1' : '0';
    value *= 2;
  });
  // console.log(bin);
  return bin;
}

// Used by fractionToBin
function fixSize(value, size) {
  while (true) {
    if ((value - parseInt(value)) * 2 > 1) break;
    size++;
    value *= 2;
  }
  return size + 1;
}

function iEEEToBaseTen(power, mantissa) {
  if (!mantissa.split('').includes('1') && power == -126) return '0';
  let bit = 0;
  let value = 0;
  mantissa.split('').forEach(i => value += i * Math.pow(2, --bit));
  return (value + 1) * Math.pow(2, power);
}

function compareMagnitude(binA, binB) {
  let sorted = {smaller : null, bigger: null};
  if (binA.eBitNumber > binB.eBitNumber) {
    sorted.smaller = binB;
    sorted.bigger = binA;
  } else {
    sorted.smaller = binA;
    sorted.bigger = binB;
  }
  return sorted;
}

function shiftPoint(bin, count) {
  let shifted = `${range(0, count, '0').join('')}1${bin.mantissa}`;
  return shifted.slice(0, bin.bits.mantissa +1);
}

function addSameSize(a, b) {
  let result = '';
  let carry = 0;

  range(0, a.length).reverse().forEach(i => {
    r = carry;
    r += a[i] === '1' ? 1 : 0;
    r += b[i] === '1' ? 1 : 0;
    result = (r % 2 === 1 ? '1' : '0') + result;
    carry = r < 2 ? 0 : 1;
  });

  if (carry !== 0) result = '1' + result;
  return result
}

function toDecimal(bin, mantissa) {
  if (!mantissa.split('').includes('1') && bin.eBitNumber == -126) return '0';
  let bit = mantissa.length === bin.bits.mantissa + 2 ? 1 : 0;
  let value = 0;
  mantissa.split('').forEach(i => value += i * Math.pow(2, bit--));
  return value * Math.pow(2, bin.eBitNumber);
}

function divideSignificand(a,b)
{
  let result = '';
  let initialLength = a.length;

  range(0, initialLength).forEach(i => {
    a+='0'; 
  });

  range(0, b.length).reverse().forEach(i => {
    console.log("A : " + a);
    console.log("B : " + b);
    console.log("Result : " + result);
    console.log("isBigger : " + isBigger(a,b));
    if(isBigger(a, b)){
      a = substract(a, b);
      range(0, i).forEach(i => {
        a+='0'; 
      });
      result += '1';
    } 
    else{
      result += '0';
    }
    b = '0' + b;
  });

  console.log("Final Result : " + result);

  return result;
}

function substract(a, b)
{
  let result = '';
  let carry = false;

  range(0, b.length).reverse().forEach(i => {
    let newA = carry ? parseInt(a[i]) - 1 : a[i];
    carry = newA < b[i] ? true : false;
    newA = carry ? parseInt(newA) + 2: newA;
    console.log("Carry : " + carry + " A[i] : " + newA + " - b[i] : " + b[i]);
    result = (newA - b[i]).toString() + result;
  });
  console.log(result);

  return result
}

function isBigger(a, b)
{
  let i = 0;
  let isBigger = false;
  let isLower = false;
  while(!isBigger && !isLower && i < a.length)
  {
    isBigger = a[i] > b[i] ? true : false;
    isLower = a[i] < b[i] ? true : false; 
    i++;
  }
  isBigger = i === a.length ? true : isBigger;

  return isBigger ? true: false;
}
