import { StorageService } from './storage.service';
import { ConfigService } from './config.service';
import axios, { AxiosError } from 'axios';

export const DICTIONARY = {
	token: 'token',
	city: 'city'
}

export enum WeatherResponseType {
	'OK',
	'NO_TOKEN',
	'API_ERROR',
	'NOT_FOUND'
}

type TSetupWeatherData = {
	token?: string,
	city?: string,
}

export type TWeatherResponseData = {
	coord : {
		lon: number,
		lat: number
	},
	weather: {
		id: number,
		main: string,
		description: string,
		icon: string
	}[],
	main: {
		temp: number,
		feels_like: number,
		temp_min: number,
		temp_max: number,
		pressure: number,
		humidity: number
	},
	visibility: number,
	wind: {
		speed: 0,
		deg: 0
	},
	clouds: {
		all: 67
	},
	dt: number,
	sys: {
		type: 2,
		id: number,
		country: string,
		sunrise: number,
		sunset: number
	},
	timezone: number,
	id: number,
	name: string,
	cod: number
}

export type TWeatherResponse = {
	status: WeatherResponseType,
	data: TWeatherResponseData | null;
}

export class WeatherService {

	constructor(
		private storage: StorageService,
		private config: ConfigService
	) {

	}

	async forecast(city: string | undefined = undefined): Promise<TWeatherResponse> {
		const token = await this.getValue(DICTIONARY.token);
		city = city || await this.getValue(DICTIONARY.city);

		console.log(token, city);

		if (!token) {
			return this.makeAnswer(WeatherResponseType.NO_TOKEN);
			// throw new Error('Не указан токен, для его задания перейдите по URL  -t [API_KEY]');
		}

		let result = WeatherResponseType.OK;
		try {
			const { data } = await axios.get(
				'https://api.openweathermap.org/data/2.5/weather',
				{
					params: {
						q: city,
						appid: token,
						lang: 'ru',
						units: 'metric'
					}
				}
			)
			if (data.cod === 200) {
				return this.makeAnswer(result, data);
			}
		} catch (e: AxiosError | any) {
			result = WeatherResponseType.API_ERROR;
			if(e instanceof AxiosError) {
				if (e?.response?.data?.cod === '404' ) {
					result = WeatherResponseType.NOT_FOUND;
				}
			}
		}
		return this.makeAnswer(result);
	}

	private makeAnswer(status: WeatherResponseType, data: TWeatherResponseData | null = null) {
		return { status: status, data }
	}


	private async getValue (key: string) {
		return await this.storage.get(key) || this.config.get<string>(key.toUpperCase());
	}

	public async set(body: TSetupWeatherData): Promise<void> {
		if (body.token) {
			await this.storage.set(DICTIONARY.token, body.token);
		}
		if (body.city) {
			await this.storage.set(DICTIONARY.city, body.city);
		}
	}

}