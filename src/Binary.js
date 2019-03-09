class Binary {
  constructor(stringValue, bits = 32) {
    this.bits = RANGES[bits];
    this.value = stringValue;
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

    this.IEEE754 = this._IEEE754_2008Repr();

    this.storedValue = this._trueValueStored();
    this.conversionError = this._computeConversionError();
  }

  add(other) {
    let sorted = compareMagnitude(this, other);
    let shiftAmount = Math.abs(this.eBitNumber - other.eBitNumber);
    let shifted = shiftPoint(sorted.smaller, shiftAmount);

    let a = sorted.bigger.mantissa;
    let b = shifted.slice(0, sorted.bigger.bits.mantissa+1);

    console.log(shifted);
    console.log(a);

    console.log('\n\n');

    let mantissa = addSameSize(a, b);

    console.log(a);
    console.log(b);
    console.log(mantissa);
    let ieee = `0${intToBin(sorted.bigger.biasedExponent)}1${mantissa.slice(1)}`;
    console.log("\n\n");
    console.log(ieee);
    let deci = iEEEToBaseTen(sorted.bigger.eBitNumber, mantissa);
    console.log(deci);
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

