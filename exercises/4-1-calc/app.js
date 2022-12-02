import process from 'process';
import {checkArguments} from "./checks.js";
let a, b, operation;

try {
	[a, b, operation] = checkArguments(process.argv);
}catch(err) {
	console.log(err.message);
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

