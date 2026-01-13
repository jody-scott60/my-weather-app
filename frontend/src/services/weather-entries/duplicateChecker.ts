import type { WeatherEntry } from "../../types/weather"

export const foundDuplicate = (cityInput : String, 
    countryCodeInput : String, weatherEntriesArr : WeatherEntry[] ): boolean => {
    for (let i = 0; i < weatherEntriesArr.length; i++) {
      if (
        cityInput === weatherEntriesArr[i].city &&
        countryCodeInput === weatherEntriesArr[i].countryCode
      ) {
        return true;
      }
    }
    return false;
  };
