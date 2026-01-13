import type { WeatherEntry } from "../types/weather";

export function WeatherEntryComponent({
  entry,
  deleteWeatherEntry,
}: {
  entry: WeatherEntry;
  deleteWeatherEntry: (deleteCity: string, deleteCountryCode: string) => void;
}) {
  const handleDelete = () => {
    deleteWeatherEntry(entry.city, entry.countryCode);
  };

  return (
    <div className="weather-entry">
      <div className="flag-city-div">
        <h1 className="country-emoji">{entry.flagEmoji}</h1>
        <p className="city">{entry.city}</p>
      </div>
      <p>Weather : {entry.weatherEmoji} </p>
      <p>Temperature : {entry.temperature + entry.temperatureUnit}</p>
      <p>
        Date and Time of Reading : {entry.dateTime.getDate()}/
        {entry.dateTime.getMonth() + 1}/{entry.dateTime.getFullYear()},{" "}
        {entry.dateTime.getHours()}:{entry.dateTime.getMinutes()}:
        {entry.dateTime.getSeconds()}
        {entry.dateTime.getMilliseconds()}
      </p>
      <button className="delete-button" onClick={() => handleDelete()}>
        Delete
      </button>
    </div>
  );
}
