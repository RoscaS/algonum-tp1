
class Binary {
  constructor(stringValue) {
    this.value = stringValue;
    this.splitted = split(this.value);

    this.integer = this.splitted.integer;
    this.fraction = this.splitted.fraction;

    this.binarySign = this.splitted.sign;
    this.binaryInteger = this._computeBinaryInteger();
    this.binaryFractional = this._computeBinaryFraction();
    this.binaryScientific = `${this.binaryInteger}.${this.binaryFractional}`;
    this.exponentBits = this._computeExponentBits();
    this.exponent = this._computeExponent();
    this.mantissa = this._computeMantissa();
    this.IEEE754 = `${this.binarySign}${this.exponent}${this.mantissa}`;
  }

  _integerEqZero() {
    return this.integer === '0';
  }

  _computeBinaryInteger() {
    return this._integerEqZero() ? '' : intToBin(this.integer);
  }

  _computeBinaryFraction() {
    return fractionToBin(this.fraction, MANTISSA, this._integerEqZero());
  }

  _computeExponentBits() {
    return this._integerEqZero()
           ? MANTISSA - this.binaryFractional.length
           : this.binaryInteger.length - 1;
  }

  _computeExponent() {
    return leadingZeros(intToBin(bias(this.exponentBits)));
  }

  _computeMantissa() {
    let s = this.binaryScientific.replace('.', '');
    return this._integerEqZero()
           ? s.slice(-this.exponentBits, -this.exponentBits + MANTISSA)
           : s.slice(1, MANTISSA + 1,);
  }

  print() {
    console.log('\n');
    console.log(`Value to convert: ${this.value}`);
    console.log(`Obtained value : ${convertFloat(this.IEEE754)}`);
    console.log(`\nBinary repr:`);
    console.log(`\tInteger: \t\t${this.binaryInteger}`);
    console.log(`\tFractional: \t${this.binaryFractional}`);
    console.log(`\tScientific: \t${this.binaryScientific}`);
    console.log(`\tExponent bits:\t${this.exponentBits}`);
    console.log('\nIEEE 754-2008:');
    console.log(`\tSign\t\t(1b): \t${this.binarySign}`);
    console.log(`\tExponent\t(${this.exponent.length}b): \t${this.exponent}`);
    console.log(`\tMantissa\t(${this.mantissa.length}b): \t${this.mantissa}`);
    console.log(`\n\t\t${this.IEEE754}`);
  }

  static tests() {
    return new TestBinary();
  }
}
