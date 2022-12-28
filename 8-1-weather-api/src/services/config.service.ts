import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

export class ConfigService {
	private config: DotenvParseOutput;

	constructor() {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			console.log('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
		} else {
			console.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
		this.config = result.parsed as DotenvParseOutput;
	}

	get<T>(key: string, defaultValue: T | false = false): T {
		const value = this.config[key];
		if (!value && defaultValue !== false) return defaultValue;
		return value as T;
	}

}