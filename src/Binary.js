
class Binary {
  constructor(stringValue) {
    let splitted = split(stringValue);
    this.value = stringValue;
    this.binarySign = splitted.sign;
    this.isUnderOne = splitted.integer == 0;
    this.binaryInteger = this.isUnderOne ? '' : intToBin(splitted.integer);
    this.binaryFractional = this.isUnderOne ? fractionToBinUnderOne(splitted.fraction, MANTISSA) : fractionToBin(splitted.fraction, MANTISSA);
    this.binaryScientific = `${this.binaryInteger}.${this.binaryFractional}`;
    this.exponentBits = !this.isUnderOne ? this.binaryInteger.length - 1 : MANTISSA - this.binaryFractional.length;
    this.exponent = leadingZeros(intToBin(bias(this.exponentBits)));
    this.mantissa = this.isUnderOne ? `${this.binaryInteger}${this.binaryFractional}`.slice(-this.exponentBits, -this.exponentBits + MANTISSA) : `${this.binaryInteger}${this.binaryFractional}`.slice(1, MANTISSA + 1,);
    this.IEEE754 = `${this.binarySign}${this.exponent}${this.mantissa}`;
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
