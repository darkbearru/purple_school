import process from "process";

const checkArgument = argument => {
	argument = Number(argument);
	if (isNaN(argument)) return false;
	return argument;
}

const checkOperation =  operation => {
	const operations = ['add', 'div', 'mul', 'sub'];
	const operationsShortcuts = {'+' : 'add', '/' : 'div', '*' : 'mul', '-' : 'sub'};
	if (operations.indexOf(operation) === -1 && !operationsShortcuts[operation]) return false;
	return operation || operationsShortcuts[operation];
}


export const checkArguments = (args) => {
	let [a, b, operation] = args;

	if ((a = checkArgument(a)) === false) {
		console.log('Первый аргумент должен быть числом');
		process.exit(1);
	}

	if ((b = checkArgument(b)) === false) {
		console.log('Второй аргумент должен быть числом');
		process.exit(1);
	}

	if (!(operation = checkOperation(operation))) {
		console.log('Неверно указано действие, допустимые значения: (add, sub, div, mul) или (+,-,*,/)');
		process.exit(1);
	}

	if (b === 0 && operation === 'div') {
		console.log('Делить на 0 нельзя');
		process.exit(1);
	}

	return [a, b, operation];
}