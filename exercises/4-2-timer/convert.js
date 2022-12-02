const convertStrToSeconds = str => {
    const num = Number(str);
    if (!isNaN(num)) return num;

    const regex = /^(\d+)([\wа-я.]+)/;
    const timeValues = {
        'h': 3600,
        'час': 3600,
        'm': 60,
        'мин': 60,
        's': 1,
        'сек': 1
    };
    let [, number, description] = str.match(regex);

    number = Number(number);
    description = timeValues[description] || false;

    if (isNaN(number) || !description) {
        throw new Error(`Время передано в недопустимом формате: «${str}»`);
    }
    return number * description;
}

export const textToTimerValue = params => {
    const seconds = params.reduce((acc, item) => {
        return acc + convertStrToSeconds(item);
    }, 0);
    return seconds * 1000;
}

