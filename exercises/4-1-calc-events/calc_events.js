import EventsEmitter from "events";

export const calcEvents = new EventsEmitter();

calcEvents.on('error', message => console.log(`Ошибка: ${message}`));
calcEvents.on('result', message => console.log(`Результат: ${message}`));