import express, { Express } from 'express';
import { Server } from 'node:http';
import { ConfigService } from './services/config.service';
import { StorageService } from './services/storage.service';
import { WeatherService } from './services/weather.service';
import { Controller } from './controller';

export class Application {
	private app: Express;
	private port = 8900;
	private server: Server;
	private config: ConfigService;
	private storage: StorageService;
	private controller: Controller;
	constructor() {
		this.config = new ConfigService();
		this.app = express();
		this.port = this.config.get<number>('PORT', this.port);
		this.storage = new StorageService();
		const weather = new WeatherService(this.storage, this.config);
		this.controller = new Controller(weather);
	}

	public init() {
		this.app.use(express.json());
		this.useRoutes();
		this.server = this.app.listen(this.port, () => {
			console.log(`Сервер запущен на http://localhost:${this.port}/`);
		});
	}

	private useRoutes() {
		this.app.use('/', this.controller.router);
	}
}