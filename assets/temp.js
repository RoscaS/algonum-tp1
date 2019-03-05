
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

function getPower(value){
	var temp = value.toString().split(".")[0].length;
	if (temp > 1) {
		power = temp;
	} else if (value.toString().split(".")[0] != 0) {
		power = 1;
	} else {
		power = 0;
	}
	return power;
}

function toBinaireInteger(value) {
	var tabBin = [];
	var valueFloat = value;
	var count = 15;
	for(var i = 0; i < count ; i++) {
		tabBin.push(valueFloat % 2);
		valueFloat = parseInt(valueFloat / 2);
	}
	tabBin.reverse();
	print(tabBin);
	return tabBin;
}

function toBinaireDecimal(value) {
	var tabBin = [];
	var valueFloat = value
	//taille Mantisse
	var count = 15;
	for(var i = 0; i < count; i++) {
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

function getExponant(tabBin, posComas){
	var i = 0;
	while (i < tabBin.length && tabBin[i] != 1){
		i++;	
	}

	return (127 + (posComas - (i + 1))); //taille int +1 (virgule après)
}

function toBinaire(value)
{
	//var power = getPower(value);
	console.log(value % 1);
	console.log(parseInt(value));
	var tabBinInt = [];
	var tabBinFloat = [];
	var exponent;
	
	//tabBin
	tabBinInt = toBinaireInteger(parseInt(value));
	tabBinFloat = tabBinInt.concat(toBinaireDecimal(value % 1));
	exponent = getExponant(tabBinFloat, 15); 
	print(tabBinFloat);

	//Exponent
	console.log(exponent);
	tabBinExp = toBinaireInteger(exponent);
}

function print(tabBin) {
	var value = "";
	tabBin.forEach(element => {
		value += element;
	});
	console.log(value);
}


var input = 263.3;
console.log(input);
var tabBin = toBinaire(input);
//print(tabBin);
