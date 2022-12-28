
export enum WeatherResponseType {
	'OK',
	'NO_TOKEN',
	'API_ERROR',
	'NOT_FOUND'
}

export type TWeatherResponse = {
	status: WeatherResponseType,
	data: TWeatherResponseData | null;
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
		speed: number,
		deg: number,
		gust?: number
	},
	clouds: {
		all: number
	},
	dt: number,
	sys: {
		type: number,
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
