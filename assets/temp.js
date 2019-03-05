
function getSigne(value) {
	return 0 < value ? 0 : 1;
}

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
	
}

function toBinaireDecimal(value) {
	var tabBin = [];
	valueFloat = value
	var count = 20;
	while (valueFloat != 0 || count > 0) {
		valueFloat = valueFloat * 2;
		tabBin.push(valueFloat.toString().split(".")[0]);
		if (valueFloat >= 1) {
			valueFloat--;
		}
		count--;
	}
	print(tabBin);
	return tabBin;
}

function toBinaire(value)
{
	console.log(value % 1);
	var valueFloat
	
	toBinaireInteger(value.toString().split(".")[0]);
	toBinaireDecimal(value % 1);	
}

function print(tabBin) {
	var value = "";
	for (let index = 0; index < tabBin.length; index++) {
		value += tabBin[index].toString();
	}
	console.log(value);
}


var input = 0.705;
console.log(input);
var tabBin = toBinaire(input);
print(tabBin);
