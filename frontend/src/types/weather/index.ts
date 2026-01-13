export interface CurrentWeatherData {
  time: String,
  temperature: Number,
  weathercode: Number
}

export interface CurrentWeatherUnitsData {
  temperature: String
}

export interface WeatherData {
  current_weather: CurrentWeatherData;
  current_weather_units: CurrentWeatherUnitsData;
}

export interface WeatherEntry {
  flagEmoji: string;
  countryCode: string;
  city: string;
  weatherEmoji: string;
  weatherCode: number;
  temperature: number;
  temperatureUnit: string;
  dateTime: Date;
}

