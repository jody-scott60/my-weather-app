import type { CoordinatesResult } from "../../../types/coordinates";
import { getRelevantResult } from "../../coordinates/getRelevantResult";
import { isCityMisspelt } from "../../coordinates/isCityMisspelt";

export const getCoordinates = async (
  cityInput: string,
  countryCodeInput: string
): Promise<CoordinatesResult | null> => {
  if (cityInput.trim() === "" || countryCodeInput.trim() === "") {
    console.error("No city or country code entered");
    return null;
  }
  try {
    const result = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&countryCode=${countryCodeInput}`
    );
    /* The API returns an array of latitude and longitude
    result(s) based on the input city. 
    */
    const data = await result.json();
    /* The relevant result is chosen because the API may
    return multiple entries for a single city. For instance,
    "Bucharest" returns ["Bucharest", "Bucharest Airport"...]
    */
    const resultsArray = data.results;
    const relevantResult = getRelevantResult(
      cityInput,
      countryCodeInput,
      resultsArray
    );
    if (!relevantResult) return null;
    const cityMisspelt = isCityMisspelt(cityInput, relevantResult.name);
    if (cityMisspelt) return null;
    return relevantResult;
  } catch (error) {
    console.error(`Something went wrong : ${error}`);
    return null;
  }
};
