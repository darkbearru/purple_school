import { Router, Response, Request, NextFunction } from 'express';
import { IControllerRoute } from './controller.route.interface';
import { WeatherResponseType, WeatherService } from './services/weather.service';

export class Controller {
	private readonly _router: Router;

	constructor(private weather: WeatherService) {
		this._router = Router();
		this.bindRoutes([
			{
				path: '/setup/',
				method: 'post',
				func: this.setup,
			},
			{
				path: '/(:city)?',
				method: 'get',
				func: this.forecast,
			},
		])
	}
	get router(): Router {
		return this._router;
	}

	async forecast({ params }: Request, res: Response, next: NextFunction): Promise<void> {
		const forecast = await this.weather.forecast(params.city);
		switch (forecast.status) {
			case WeatherResponseType.OK :
				console.log('[OK]');
				this.send(res, 200, forecast.data);
				break;
			case WeatherResponseType.NO_TOKEN :
				console.log('[Error]  Не указан токен');
				this.send(res, 404, 'Не указан токен, для его задания перейдите по URL /setup/ и передайте token=[API_KEY] & city=[CITY NAME]');
				break;
			case WeatherResponseType.API_ERROR :
				console.log('[Error]  Ошибка Weather API');
				this.send(res, 500, 'Проблема с подключение к API');
				break;
			case WeatherResponseType.NOT_FOUND :
				console.log('[Error]  Указанный город не найден');
				this.send(res, 404, 'Указанный город не найден');
				break;
		}
		next();
	}

	async setup ({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		if (typeof body === undefined) {
			this.send(res, 204, 'Не указан токен или город, для его задания передайте методом POST в json формате token=[API_KEY] и city=[CITY NAME]');
			return;
		}
		await this.weather.set(body);
		console.log('Saved');
		console.log(body);
		this.send(res, 202, 'Сохранено');
		next();
	}

	private send<T>(res: Response, code: number, message: T): Response {
		res.type('application/json');
		return res.status(code).send({ message: message });
	}

	private bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			const handler = route.func.bind(this);
			console.log(route.method, route.path, route.func);
			this._router[route.method](route.path, handler);
		}
	}

}