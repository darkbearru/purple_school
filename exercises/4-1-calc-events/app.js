import process from 'process';
import {checkArguments} from "./checks.js";
import {calcEvents} from "./calc_events.js";

const [a, b, operation] = checkArguments(process.argv);

calcEvents.on('add', (a, b) => {
	calcEvents.emit('result', `${a} + ${b} = ${a + b}`);
});

calcEvents.on('sub', (a, b) => {
	calcEvents.emit('result', `${a} - ${b} = ${a - b}`);
});

calcEvents.on('div', (a, b) => {
	calcEvents.emit('result', `${a} / ${b} = ${a / b}`);
});

calcEvents.on('mul', (a, b) => {
	calcEvents.emit('result', `${a} * ${b} = ${a * b}`);
});

calcEvents.emit(operation, a, b);
