import type { WeatherEntry } from "../types/weather/index";
import { WeatherEntryComponent } from "./WeatherEntryComponent";
// import { Loading } from "./Loading";

export function WeatherList({
  weatherEntriesArr,
  deleteWeatherEntry,
}: {
  weatherEntriesArr: WeatherEntry[];
  deleteWeatherEntry: (deleteCity: string, deleteCountryCode: string) => void;
}) {
  return (
    <div className="all-entries">
      {weatherEntriesArr.map((entry) => (
        <WeatherEntryComponent
          key={`${entry.city}-${entry.countryCode}`}
          entry={entry}
          deleteWeatherEntry={deleteWeatherEntry}
        ></WeatherEntryComponent>
      ))}
    </div>
  );
}
