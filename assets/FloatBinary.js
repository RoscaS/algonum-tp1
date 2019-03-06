class FloatBinary {
	/*                            \
	|         Constructors        |
	\                            */

	constructor(valueFloat, nbBit) {
		this.valueFloat = valueFloat;
		this.nbBitMantisse = nbBit - 9; // il faut parler du format
		this.nbBitExposant = nbBit - this.nbBitMantisse - 1;
		this.valueBinary = this.toBinary();
		
	}

	/*                            \
	|        Public Methode       |
	\                            */

	toBinary() {
		//Integer et Float  -> matisse en binaire
		let tabBinInteger = this.toBinaryInteger(this.valueFloat, this.nbBitMantisse);
		let tabBinFloat = this.toBinaryDecimal(this.valueFloat, this.nbBitMantisse);
		let tabBin = tabBinInteger.concat(tabBinFloat);
		let tabMantisse = this.formatMantisse(tabBin);

		//exposant en binaire
		let exponent = this.getExponant(tabBin)
		let tabBinExponent = this.toBinaryInteger(exponent, this.nbBitExposant);

		//signe
		let sign = this.getSign();
		
		//assemble en binaire du Float
		let tabNormalizeFloat = [sign, ...tabBinExponent,...tabMantisse];
		return tabNormalizeFloat;
	}

	print() {
		let value = "";
		for (let i = 0; i < this.valueBinary.length; i++) {
			value += this.valueBinary[i];
		}
		console.log("Value float  : " + this.valueFloat);
		console.log("Value binary : " + value);
	}

	/*                            \
	|        Private Methode      |
	\                            */

	toBinaryInteger(valueInt, nbBit) {
		let tabBin = [];
		let value = parseInt(valueInt);
		
		for (let i = 0; i < nbBit; i++) {
			tabBin.push(value % 2);
			value = parseInt(value / 2);
		}
		tabBin = tabBin.reverse();
		return tabBin;
	}

	toBinaryDecimal(valueFloat, nbBit) {
		let tabBin = [];
		let value = valueFloat%1

		for (let i = 0; i < nbBit; i++) {
			value = value * 2;
			if (value < 1) {
				tabBin.push(0);
			} else {
				tabBin.push(1)
				value--;
			}
		}
		return tabBin;
	}

	formatMantisse(tabBin) {
		let mantisse = [];
		let i = 0;
		let countBit = 0;
		let flag = 0;
		while (i < tabBin.length && countBit < this.nbBitMantisse) {
			if (flag == 1) {
				countBit++;
				mantisse.push(tabBin[i]);				
			}
			if (tabBin[i] == 1) {
				flag = 1;
			}
			i++;
		}

		return mantisse;
	}

	getExponant(tabBin) {
		let i = 0;
		while (i < tabBin.length && tabBin[i] != 1) {
			i++;
		}
		return (127 + (this.nbBitMantisse - (i + 1)));
	}

	getSign() {
		return 0 < this.valueFloat ? 0 : 1;
	}
}

let value = new FloatBinary(0.4, 32); 
value.print();