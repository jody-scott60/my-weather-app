import type { WeatherEntry } from "../types/weather/index";

import { NavBar } from "./Navbar";
import { InputForm } from "./InputForm";
import { WeatherList } from "./WeatherList";

export function LoggedIn({
  handleUserLogout,
  cityInput,
  setCityInput,
  countryCodeInput,
  setCountryCodeInput,
  handleClick,
  weatherEntriesArr,
  deleteWeatherEntry,
}: {
  handleUserLogout: () => void;
  cityInput: string;
  setCityInput: React.Dispatch<React.SetStateAction<string>>;
  countryCodeInput: string;
  setCountryCodeInput: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
  weatherEntriesArr: WeatherEntry[];
  deleteWeatherEntry: (deleteCity: string, deleteCountryCode: string) => void;
}) {
  return (
    <div>
      <NavBar handleUserLogout={handleUserLogout}></NavBar>
      <div>
        <InputForm
          cityInput={cityInput}
          setCityInput={setCityInput}
          countryCodeInput={countryCodeInput}
          setCountryCodeInput={setCountryCodeInput}
          handleClick={handleClick}
        ></InputForm>
      </div>
      <div>
        {weatherEntriesArr.length > 0 && (
          <WeatherList
            weatherEntriesArr={weatherEntriesArr}
            deleteWeatherEntry={deleteWeatherEntry}
          ></WeatherList>
        )}
      </div>
    </div>
  );
}
