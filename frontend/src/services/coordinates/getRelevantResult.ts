import type {
  CoordinatesArrEntry,
  CoordinatesResult,
} from "../../types/coordinates";

export const getRelevantResult = (
  cityInput: string,
  countryCodeInput: string,
  resultsArr: CoordinatesArrEntry[]
): CoordinatesResult | null => {
  for (let i = 0; i < resultsArr.length; i++) {
    if (
      resultsArr[i].country_code === countryCodeInput &&
      resultsArr[i].name === cityInput
    ) {
      const result = resultsArr[i];
      const relevantResult = {
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
      };
      return relevantResult;
    }
  }
  return null;
};
