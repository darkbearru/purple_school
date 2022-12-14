const checkArgument = argument => {
	argument = Number(argument);
	if (isNaN(argument)) return false;
	return argument;
}

const checkOperation =  operation => {
	const operations = ['add', 'div', 'mul', 'sub'];
	const operationsShortcuts = {'+' : 'add', '/' : 'div', '*' : 'mul', '-' : 'sub'};
	if (operations.indexOf(operation) === -1 && !operationsShortcuts[operation]) {
		throw new Error(`Недопустимая операция «${operation}», принимаются значения: (add, sub, div, mul) или (+,-,\\*,/)`);
	}
	return operationsShortcuts[operation] || operation;
}


export const checkArguments = (args) => {
	if (args.length < 5) {
		throw new Error('Необходимо передать три аргумента: число 1, число 2 и действие (add, sub, div, mul) или (+,-,*,/)');
	}

	let [,, a, b, operation] = args;

	if ((a = checkArgument(a)) === false) {
		throw new Error('Первый аргумент должен быть числом');
	}

	if ((b = checkArgument(b)) === false) {
		throw new Error('Второй аргумент должен быть числом');
	}

	if (!(operation = checkOperation(operation))) {
		throw new Error('Неверно указано действие, допустимые значения: (add, sub, div, mul) или (+,-,*,/)');
	}

	if (b === 0 && operation === 'div') {
		throw new Error('Делить на 0 нельзя');
	}

	return [a, b, operation];
}