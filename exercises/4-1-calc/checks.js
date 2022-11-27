export const checkArgument = argument => {
	argument = Number(argument);
	if (isNaN(argument)) return false;
	return argument;
}

export const checkOperation =  operation => {
	const operations = ['add', 'div', 'mul', 'sub'];
	const operationsShortcuts = {'+' : 'add', '/' : 'div', '*' : 'mul', '-' : 'sub'};
	if (operations.indexOf(operation) === -1 && !operationsShortcuts[operation]) return false;
	return operation || operationsShortcuts[operation];
}