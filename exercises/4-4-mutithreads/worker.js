import {parentPort, workerData} from 'worker_threads';

const compute = ({array}) => {
    let counter = 0;
    for (let i = 0, cnt = array.length; i < cnt; i++) {
        counter += array[i] % 3 === 0 ? 1 : 0;
    }
    return counter;
};

parentPort.postMessage(compute(workerData));