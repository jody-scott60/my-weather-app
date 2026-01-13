import type { WeatherData } from "../../types/weather";
import type { WeatherEntry } from "../../types/weather";
import { flagEmojiConverter } from "./flagEmojiConverter";
import { weatherEmojiConverter } from "./weatherEmojiConverter";

export const dataConverter = (
  cityInput: string,
  countryCodeInput: string,
  data: WeatherData
): WeatherEntry => {
  const current_weather = data.current_weather;
  const temperatureUnit = data.current_weather_units.temperature;

  const entry: WeatherEntry = {
    flagEmoji: flagEmojiConverter(countryCodeInput),
    countryCode: countryCodeInput,
    city: cityInput,
    weatherEmoji: weatherEmojiConverter(current_weather.weathercode.valueOf()),
    weatherCode: current_weather.weathercode.valueOf(),
    temperature: current_weather.temperature.valueOf(),
    temperatureUnit: temperatureUnit.toString(),
    dateTime: new Date(current_weather.time.toString()),
  };
  return entry;
};
