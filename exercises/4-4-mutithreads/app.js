import * as perf_hooks from "perf_hooks";
import {arrayData} from './array_data.js';
import {splitArray} from "./split_array.js";
import {Worker} from "worker_threads";

let splitArrayFunc = splitArray;

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    items.getEntries().forEach(entry => console.log(`${entry.name} — ${entry.duration}ms`));
    observer.disconnect();
});

performanceObserver.observe({entryTypes: ['function']});

const sqr = array => {
    return array.map((x) => (Math.random() > 0.5 ? x * 2 : x / 3));
}

const array = sqr (arrayData(9900000));


let simpleMethodFor = array => {
    let counter = 0;
    for (let i = 0, cnt = array.length; i < cnt; i++) {
        counter += array[i] % 3 === 0 ? 1 : 0;
    }
    return counter;
}
let simpleMethodForEach = array => {
    let counter = 0;
    array.forEach(item => {
        counter += item % 3 === 0 ? 1 : 0;
    })
    return counter;
}

const worker = array => new Promise(resolve => {
    const worker = new Worker('./worker.js', {
        workerData: {array}
    });
    worker.on('message', (msg) => {
        resolve(msg);
    });
});

const workerCalc = async array => {
    return await worker (array).then(result => result);
}

let main = array => {
    let counter = 0;
    for (let i = 0, cnt = array.length; i < cnt; i++) {
        workerCalc(array[i]).then(result => {
            counter += result;
        });
    }
};


simpleMethodFor = perf_hooks.performance.timerify(simpleMethodFor);
simpleMethodForEach = perf_hooks.performance.timerify(simpleMethodForEach);
splitArrayFunc = perf_hooks.performance.timerify(splitArrayFunc);
main = perf_hooks.performance.timerify(main);

simpleMethodFor(array);
simpleMethodForEach(array);

const arrayBuffer = splitArrayFunc(array, 8);

main(arrayBuffer);

