import process from 'process';
import {getArguments} from "./arguments.js";
import {checkArguments} from "./checks.js";


if (process.argv.length < 5) {
	console.log('Необходимо передать три аргумента: число 1, число 2 и действие (+,-,*,/)');
	process.exit(1);
}

let [a, b, operation] = checkArguments(getArguments());

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

