export const splitArray = (array, cntCores = 4) => {
    const size = Math.ceil(array.length / cntCores );
    const result = [];
    for(let i=0; i<cntCores; i++) {
        if (array.length === 0) continue;
        result.push(array.splice(0, size));
    }
    return result;
}