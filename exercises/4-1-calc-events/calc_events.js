import EventsEmitter from "events";

export const calcEvents = new EventsEmitter();

calcEvents.addListener('error', message => console.log(`Ошибка: ${message}`));
calcEvents.addListener('result', message => console.log(`Результат: ${message}`));