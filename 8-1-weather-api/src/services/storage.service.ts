/*
* const filePath = join(homedir(), 'weather.data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
};

* */

import { join } from 'path';
import { homedir } from 'os';
import { promises } from 'fs';

type TValue = string | null;

export class StorageService {
	private readonly filePath: string;
	private data: Record<string, string>;
	constructor(fileName: string = 'weather.data.json') {
		this.filePath = join(homedir(), fileName);
		this.read();
	}

	public get(key: string, defaultValue: TValue  = null) : TValue {
		return this.data[key] || defaultValue;
	}

	public set(key: string, value: string): void {
		this.data[key] = value;
		this.write();
	}

	private async read(): Promise<void> {
		const isExists = await this.isExists();
		if (isExists) {
			const file = await promises.readFile(this.filePath);
			this.data = JSON.parse(file.toString());
		}
	}

	private async write(): Promise<void> {
		await promises.writeFile(this.filePath, JSON.stringify(this.data));
	}

	private async isExists(): Promise<boolean> {
		try {
			await promises.stat(this.filePath);
			return true;
		}catch(e)  {
			return false;
		}
	}

}