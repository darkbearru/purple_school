export const arrayData = (n = 300000) => {
    const array = [];
    for (let i=0; i<n; i++) {
        array.push(Math.floor(Math.random() * n + 1));
    }
    return array;
};