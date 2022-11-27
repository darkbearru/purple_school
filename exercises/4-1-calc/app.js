import process from 'process';
import {getArguments} from "./arguments.js";
import {checkArgument,checkOperation} from "./checks.js";

const args = getArguments();
let [a, b, operation] = args;

if (args.length < 3) {
	console.log('Необходимо передать три аргумента: число 1, число 2 и действие (+,-,*,/)');
	process.exit(1);
}

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

const calc = async (a, b, operation) => {
	try {
		/**
		 * @var {Function} action.operation
		 * @type {Object}
		 */
		const action = await import(`./operations/${operation}.js`);
		const result = action.operation(a, b);
		return `Результат действия ${a} ${operation} ${b} = ${result}`;
	} catch (err) {
		return `Ошибка выполнения «${err.message}»`;
	}
};

calc(a, b, operation)
	.then(result => console.log(result))
	.catch(error => console.log(error));

