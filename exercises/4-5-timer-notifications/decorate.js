export const textDecoration = (text, color = 'gray') => {
    const colors = {
        'gray': '\x1b[90m%s\x1b[39m',
        'green': '\x1b[32m%s\x1b[39m',
        'blue': '\x1b[36m%s\x1b[39m',
    }
    const charLine = '━';
    let maxLen = 32;

    text = (typeof text === 'string') ? [text] : text;
    maxLen = Math.max(
        text.reduce((acc, item) => acc > item.length ? acc : item.length, 0),
        maxLen
    );
    color = colors[color];

    console.log('');
    console.log(color, `┏${charLine.repeat(maxLen + 2)}┓`);
    text.forEach(item => {
        console.log(`${color} %s ${color}`, '┃', item + " ".repeat(maxLen - item.length), '┃');
    });
    console.log(color, `┗${charLine.repeat(maxLen + 2)}┛`);
    console.log('');
}