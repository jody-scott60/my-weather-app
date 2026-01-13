import type { WeatherEntry } from "../../types/weather"

export const reachedLimit = (weatherEntriesArr : WeatherEntry[]) : boolean => {
    if(weatherEntriesArr.length === 6) {
      return true;
    } else {
      return false;
    }
  }

