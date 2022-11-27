import process from 'process';
import {checkArguments} from "./checks.js";
import {calcEvents} from "./calc_events.js";

const [a, b, operation] = checkArguments(process.argv);

calcEvents.addListener('add', (a, b) => {
	calcEvents.emit('result', `${a} + ${b} = ${a + b}`);
});

calcEvents.addListener('sub', (a, b) => {
	calcEvents.emit('result', `${a} - ${b} = ${a - b}`);
});

calcEvents.addListener('div', (a, b) => {
	calcEvents.emit('result', `${a} / ${b} = ${a / b}`);
});

calcEvents.addListener('mul', (a, b) => {
	calcEvents.emit('result', `${a} * ${b} = ${a * b}`);
});

calcEvents.emit(operation, a, b);
