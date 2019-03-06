
//Tristan
function convertExponant(tabBin) {
	let value = 0;
	let power = 7;
	for (let index = 1; index < 9; index++) {
		value += tabBin[index] * Math.pow(2, power);
		power--;
	}
	value -= 127;
	console.log("Exponant : " + value);
	return value;
}

function convertFloat(tabBin) {
	let value = 0;
	let power = -1;
	for (let index = 9; index < 32; index++) {
		value += tabBin[index] * Math.pow(2, power);
		power--;
	}
	console.log("Mantisse : " + value);

	value *= Math.pow(2, convertExponant(tabBin));
	return value;
}

//Nathan
function getSigne(value) {
	return 0 < value ? 0 : 1;
}

function toBinaireInteger(value, nbBit) {
	let tabBin = [];
	let valueFloat = value;
	let count = nbBit;
	for (let i = 0; i < count; i++) {
		tabBin.push(valueFloat % 2);
		valueFloat = parseInt(valueFloat / 2);
	}
	tabBin.reverse();
	print(tabBin);
	return tabBin;
}

function cleanTab(binTab) {

}

function toBinaireDecimal(value, nbBit) {
	let tabBin = [];
	let valueFloat = value
	//taille Mantisse
	let count = nbBit;
	console.log(nbBit);

	for (let i = 0; i < count; i++) {
		valueFloat = valueFloat * 2;
		if (valueFloat < 1) {
			tabBin.push(0);
		} else {
			tabBin.push(1)
			valueFloat--;
		}
	}
	print(tabBin)
	return tabBin;
}

function getExponant(tabBin, posComma) {
	let i = 0;
	while (i < tabBin.length && tabBin[i] != 1) {
		i++;
	}

	return (127 + (posComma - (i + 1))); //taille int +1 (virgule après) + bit caché
}

function cleanTab(tabBinInt) {
	tabBin = [];
	let i = 0;
	let flag = 0;
	while (i < tabBinInt.length){
		if(flag == 1){
			tabBin.push(tabBinInt[i]);
		}
		if (tabBinInt[i] == 1) {
			flag = 1;
		}
		i++;
	}

	return tabBin;
}

function AddBinaire(tabBin1, tabBin2){


}

function toBinaire(value, nbBit) {
	
	
	let tabBinInt = [];
	let tabBinFloat = [];
	let exponent;

	//tabBin
	console.log(parseInt(value));
	tabBinInt = toBinaireInteger(parseInt(value),nbBit-9); // juste mantisse
	tabBinInt = cleanTab(tabBinInt);
	//ajout de la précision avec bit
	console.log(value % 1);
	tabBinFloat = tabBinInt.concat(toBinaireDecimal(value % 1,nbBit-9-tabBinInt.length)); 
	tabBinFloat = cleanTab(tabBinFloat);

	print(tabBinFloat);

	//Exponent
	//getExponant(tabBinFloat, tabBinInt.length);
	exponent = 127 + tabBinInt.length;
	console.log(exponent);
	console.log(tabBinInt.length);
	tabBinExp = toBinaireInteger(exponent, 8); // 8 bit exposant

	let tabBin = [];
	tabBin.push(getSigne(value));
	tabBin = tabBin.concat(tabBinExp.concat(tabBinFloat));
	print(tabBin);
}

function print(tabBin) {
	let value = "";
	tabBin.forEach(element => {
		value += element;
	});
	console.log(value);
}


var input = 32.4;

console.log(input);
var tabBin = toBinaire(input, 32);
//print(tabBin);

//2*r * PI = Perimetre

// Diametre = r*2
//Si Diam = 1 -> Perimetre = PI
//r = Diam/2
//
/* TEST
263.3
0 10000111 00000111010011001100110
0 10000111 00000111010011001100110

0.3
0 01111101 00110011001100110011010
0 01111111 01001100110011001100110

4
0 10000001 00000000000000000000000
0 10000001 00000000000000000000000

32
0 10000100 00000000000000000000000
0 10000100 00000000000000000000000

32.4
0 10000100 10011001100110010000000
0 10000100 10011001100110010000000
*/