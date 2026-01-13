import type { WeatherData } from "../../../types/weather";
import { getCoordinates } from "./getCoordinates";

export const getWeather = async (
  cityInput: string,
  countryCodeInput: string
): Promise<WeatherData | null> => {
  const result = await getCoordinates(cityInput, countryCodeInput);
  const latitude = result?.latitude;
  const longitude = result?.longitude;
  if (!latitude || !longitude) {
    return null;
  }
  try {
    const result = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await result.json();
    return data;
  } catch (error) {
    return null;
  }
};
