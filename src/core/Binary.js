class Binary {
  constructor(stringValue, bits = 32) {

    this.bits = RANGES[bits];
    this.value = stringValue;

    SPECIAL_VALUES.includes(this.value)
    ? this.initZero()
    : this.init();

    this.IEEE754 = this._IEEE754_2008Repr();
    this.storedValue = this._trueValueStored();
    this.conversionError = this._computeConversionError();
  }

  add(other) {
    let sorted = compareMagnitude(this, other);
    let shiftAmount = Math.abs(this.eBitNumber - other.eBitNumber);

    let a = shiftPoint(sorted.bigger, 0);
    let b = shiftPoint(sorted.smaller, shiftAmount);

    let mantissa = addSameSize(a, b);

    let deci = toDecimal(sorted.bigger, mantissa);
    return new Binary(deci.toString(), this.bits.bits);
  }

  multiply(other) {
    let sign = (this.binarySign + other.binarySign == 1) ? '1' : '0';
    let exponent = this.eBitNumber + other.eBitNumber;

    let a = stripTrailingZeros(`1${this.mantissa}`);
    let b = stripTrailingZeros(`1${other.mantissa}`);

    let results = [];

    for (let i = b.length; i >= 0; i--) {
      if (b[i] === '1') {
        results.push(a);
      } else {
        results.push(range(0, a.length, '0').join(''));
      }
    }

    let paddedResults = [];

    let leading = b.length;
    let trailing = 0;

    results.forEach(i => {
      let f = (len) => range(0, len, '0').join('');
      paddedResults.push(`${f(leading)}${i}${f(trailing)}`);
      leading--;
      trailing++;
    });

    let tidy = [];

    let model = range(0, paddedResults[0].length, '0').join('');
    paddedResults.forEach(i => {if (i !== model) tidy.push(i);});
    let sum = model;

    tidy.forEach(i => {sum = addSameSize(sum, i);});

    let shiftExponent = sum.length - 1 - Math.abs(a.length - 1 + b.length - 1);
    let normalisedExponent = exponent + shiftExponent;
    let biasedExponent = normalisedExponent + this.bits.max - 1;

    let mantissa = '';

    if (sum.length > this.bits.mantissa + 1) {
      mantissa = sum.slice(0, this.bits.mantissa + 1);
    } else {
      mantissa = `${sum}${range(0, this.bits.mantissa + 1 - sum.length, '0').
        join('')}`;
    }

    let deci = iEEEToBaseTen2(biasedExponent - 127, mantissa);
    return new Binary(deci.toString(), this.bits.bits);

  }

  divide(other)
  {
    console.log("Expo A : " + this.eBitNumber);
    console.log("Expo B : " + other.eBitNumber);
    let newExponent = parseInt(this.eBitNumber) - parseInt(other.eBitNumber);

    let newSignificandThis = '1' + this.mantissa.toString();
    let newSignificandOther = '1' + other.mantissa.toString();

    let resultSignificand = divideSignificand(newSignificandThis, newSignificandOther);

    resultSignificand = resultSignificand[0] === 0 ? 
                          resultSignificand.slice(1, newSignificandOther.length + 1) :
                          resultSignificand.slice(0, newSignificandOther.length);

    this.eBitNumber = newExponent;
    let deci = toDecimal(this,resultSignificand);

    console.log("newExponent : " + newExponent);

    return new Binary(deci.toString());
  }

  _integerEqZero() {
    return this.integer === '0';
  }

  _computeBinaryInteger() {
    return this._integerEqZero() ? '' : intToBin(this.integer);
  }

  _computeBinaryFraction() {
    return fractionToBin(
      this.fraction,
      this.bits.mantissa,
      this._integerEqZero(),
    );
  }

  _computeExponentBitsNumber() {
    return this._integerEqZero()
           ? this.bits.mantissa - this.binaryFractional.length
           : this.binaryInteger.length - 1;
  }

  _computeBiasedExponent() {
    return this.eBitNumber + this.bits.max;
  }

  _computeExponent() {
    let e = intToBin(this.biasedExponent);
    return prefixWithZeros(this.bits.exponent - e.length, e);
  }

  _computeMantissa() {
    let x = `${this.binaryInteger}${this.binaryFractional}`;
    let e = this.eBitNumber;
    return this._integerEqZero()
           ? x.slice(-e, -e + this.bits.mantissa)
           : x.slice(1, this.bits.mantissa + 1);
  }

  _IEEE754_2008Repr() {
    return `${this.binarySign}${this.exponent}${this.mantissa}`;
  }

  _trueValueStored() {
    let sign = this.binarySign === '1' ? '-' : '';
    return `${sign}${iEEEToBaseTen(this.eBitNumber, this.mantissa)}`;
  }

  _computeConversionError() {
    return this.storedValue - this.value;
  }

  init() {
    this.splitted = split(this.value);
    this.integer = this.splitted.integer;
    this.fraction = this.splitted.fraction;
    this.binarySign = this.splitted.sign;
    this.binaryInteger = this._computeBinaryInteger();
    this.binaryFractional = this._computeBinaryFraction();
    this.eBitNumber = this._computeExponentBitsNumber();
    this.biasedExponent = this._computeBiasedExponent();
    this.exponent = this._computeExponent();
    this.mantissa = this._computeMantissa();
  }

  initZero() {
    if (this.value[0] === '+') this.value.replace('+', '');
    this.integer = this.fraction = this.binarySign = '0';
    this.binaryInteger = this.binaryFractional = '0';
    this.eBitNumber = '-126';
    this.biasedExponent = '0';
    this.exponent = prefixWithZeros(this.bits.exponent - 1, '0');
    this.mantissa = prefixWithZeros(this.bits.mantissa - 1, '0');
    if (this.value[0] === '-') this.binarySign = '1';
  }

  print(verbose = true) {
    console.log('\n');
    console.log(`Value to convert: ${this.value}`);
    if (verbose) {
      console.log(`Stored in memory: ${this.storedValue}`);
      console.log(`Conversion error: ${this.conversionError}`);
      console.log(`\nBinary repr:`);
      console.log(`\tInteger: \t\t${this.binaryInteger}`);
      console.log(`\tFractional: \t${this.binaryFractional}`);
      console.log(`\tExponent bits:\t${this.eBitNumber}`);
      console.log('\nIEEE 754-2008:');
      console.log(`\tSign\t\t(1b): \t${this.binarySign}`);
      console.log(`\tExponent\t(${this.exponent.length}b): \t${this.exponent}`);
      console.log(`\tMantissa\t(${this.mantissa.length}b): \t${this.mantissa}`);
    }
    console.log(`\n\t\t${this.IEEE754}\n\n`);
  }

  static tests() {
    return new TestBinary();
  }
}

