import { StorageService } from './storage.service';
import { ConfigService } from './config.service';
import axios, { AxiosError } from 'axios';
import { TWeatherResponse, TWeatherResponseData, WeatherResponseType } from './types/weather.response.types';

export const DICTIONARY = {
	token: 'token',
	city: 'city'
}

type TSetupWeatherData = {
	token?: string,
	city?: string,
}


export class WeatherService {

	constructor(
		private storage: StorageService,
		private config: ConfigService
	) {}

	async forecast(city: string | undefined = undefined): Promise<TWeatherResponse> {
		const token = await this.getValue(DICTIONARY.token);
		city = city || await this.getValue(DICTIONARY.city);

		if (!token) {
			return this.makeAnswer(WeatherResponseType.NO_TOKEN);
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