import process from 'process';

export const getArguments = () => {
	const [,, ...argv] = process.argv;
	return argv;
}