class FloatBinary {
	/*                            \
	|         Constructors        |
	\                            */

	constructor(valueFloat, nbBit) {
		this.valueFloat = valueFloat;
		this.nbBitMantisse = 23; // il faut parler du format
		this.nbBitExposant = 8;
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

		console.log(tabBinInteger);
		console.log(tabBinFloat);
		//exposant en binaire
		let exponent = this.getExponant(tabBin)
		let tabBinExponent = this.toBinaryInteger(exponent, this.nbBitExposant);

		//signe
		let sign = this.getSign();
		console.log("sign             : " + sign);
		console.log("exponant         : " + exponent)
		console.log("exponant binary  : " + tabBinExponent);
		console.log("mantisse         : " + tabMantisse);

		//assemble en binaire du Float
		let tabNormalizeFloat = [sign, ...tabBinExponent,...tabMantisse];
		return tabNormalizeFloat;
	}

	print() {
		let value = "";
		for (let i = 0; i < this.valueBinary.length; i++) {
			value += this.valueBinary[i];
		}
		console.log("Value float      : " + this.valueFloat);
		console.log("Value binary     : " + value);
		console.log("Value reconverti : " + this.convertFloat(this.valueBinary));
	}

	/*                            \
	|        Private Methode      |
	\                            */

	toBinaryInteger(valueInt, nbBit) {
		let tabBin = [];
		let value = Math.floor(valueInt);
		console.log("Value integer : " + value);
		for (let i = 0; i < nbBit; i++) {
			tabBin.push(value % 2);
			value = Math.floor(value / 2);
		}
		tabBin = tabBin.reverse();
		return tabBin;
	}

	toBinaryDecimal(valueFloat, nbBit) {
		let tabBin = [];
		let value = valueFloat%1
		let flag = 0;

		for (let i = 0; i < nbBit; i++) {
			if(flag == 0)
			{
				i--;
			}
			value = value * 2;
			if (value < 1) {
				tabBin.push(0);
			} else {
				tabBin.push(1)
				value--;
				flag = 1;
			}

		}
		return tabBin;
	}

	formatMantisse(tabBin) {
		let mantisse = [];
		let i = 0;
		let countBit = 0;
		let flag = 0;
		//i < tabBin.length &&
		while (countBit < this.nbBitMantisse) {
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
		let d = parseInt((Math.pow(2, this.nbBitExposant) - 1) / 2);
		let power = this.nbBitMantisse - i;

		return d + power;
	}

	getSign() {
		return 0 < this.valueFloat ? 0 : 1;
	}

	convertExponant(tabBin) {
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

	convertFloat(tabBin) {
		let value = 0;
		let power = -2;
		for (let index = 9; index < 32; index++) {
			value += tabBin[index] * Math.pow(2, power);
			power--;
		}

		value += 0.5;
		//console.log("Mantisse : " + value);
		value *= Math.pow(2, this.convertExponant(tabBin));

		return value;
	}
}

let value = new FloatBinary(32.1, 32);
value.print();

