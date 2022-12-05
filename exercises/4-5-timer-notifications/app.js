import process from 'process';
import {textDecoration} from "./decorate.js";
import {textToTimerValue} from "./convert.js";
import notifier from 'node-notifier';

const [,,...args] = process.argv;
const helpMessage = [
    'Необходимо указать время срабатывания таймера, в одном из ниже указанных форматов:',
    '— Кол-во секунд;',
    '— 9h|9m|9s, число в обозначением к чему оно относится, можно передавать несколько параметров;',
    '— 9час|9мин|9сек, число в обозначением к чему оно относится, можно передавать несколько параметров.',
];

if (args.length === 0) {
    textDecoration(helpMessage);
    process.exit(1);
}

const start = (args) => {
    const time = textToTimerValue(args);
    textDecoration(`Таймер установлен на ${time / 1000} сек`, 'blue');
    setTimeout( () => {
        const message = `Таймер сработал, через ${time / 1000} сек`;
        notifier.notify({
            title: 'NodeJs Timer',
            message
        });
        textDecoration(message, 'green');
    }, time);
};

try {
    start(args);
} catch (err) {
    console.log(`Ошибка: ${err.message}`);
    textDecoration(helpMessage);
}
