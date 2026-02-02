import "./styles/styles.css";

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import type { WeatherEntry } from "./types/weather";
import type { WeatherData } from "./types/weather";
import type { EntryStatus } from "./types/api/backend/index";
import type { UserFormStatus } from "./types/api/backend/index";

import { LoggedOut } from "./components/LoggedOut";
import { LoggedIn } from "./components/LoggedIn";
import { Loading } from "./components/Loading";

import { dataConverter } from "./services/weather-entries/dataConverter";
import { postEntry } from "./services/api/backend/weatherEntry/postEntry";
import { getAllEntries } from "./services/api/backend/weatherEntry/getAllEntries";
import { deleteEntry } from "./services/api/backend/weatherEntry/deleteEntry";
import { getWeather } from "./services/api/external/getWeather";
import { foundDuplicate } from "./services/weather-entries/duplicateChecker";
import { reachedLimit } from "./services/weather-entries/limitChecker";
import { signupUser } from "./services/api/backend/user/signupUser";
import { loginUser } from "./services/api/backend/user/loginUser";
import { emailFormatIsValid } from "./services/api/backend/user/emailFormatIsValid";
import { passwordFormatIsValid } from "./services/api/backend/user/passwordFormatIsValid";

function App() {
  const [cityInput, setCityInput] = useState<string>("");
  const [countryCodeInput, setCountryCodeInput] = useState<string>("");
  const [weatherEntriesArr, setWeatherEntriesArr] = useState<WeatherEntry[]>(
    []
  );
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userFormStatus, setUserFormStatus] =
    useState<UserFormStatus>("signup");
  const [error, setError] = useState<string>("");
  const [clockCycles, setClockCycles] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skipInitialEffect, setskipInitialEffect] = useState<boolean>(true);

  const timerRef = useRef<number | null>(null);

  const refreshInterval: number = 16 * 60 * 1000;

  const handleUserSignup = async () => {
    setIsLoading(true);
    try {
      if (email.trim() === "" && password.trim() === "") {
        setError("⚠️ Error : Email or Password fields are empty ⚠️");
        return;
      }

      if (!emailFormatIsValid(email)) {
        setEmail("");
        setPassword("");
        setError("⚠️ Error : Enter a valid email ⚠️");
        return;
      }

      if (!passwordFormatIsValid(password)) {
        setEmail("");
        setPassword("");
        setError("⚠️ Error : Password must be at least 8 characters ⚠️");
        return;
      }

      const token = await signupUser(email, password);
      if (!token) {
        setEmail("");
        setPassword("");
        setError(
          "⚠️ Error : signup not successful. Email could already be in use. Otherwise, try again later. ⚠️"
        );
        return;
      }
      setToken(token);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("⚠️ Error : signup not successful ⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLogin = async () => {
    setIsLoading(true);
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("⚠️ Error : Email or Password fields are empty ⚠️");
        return;
      }
      if (!emailFormatIsValid(email)) {
        setEmail("");
        setPassword("");
        setError("⚠️ Error : Enter a valid email ⚠️");
        return;
      }

      if (!passwordFormatIsValid(password)) {
        setEmail("");
        setPassword("");
        setError("⚠️ Error : Password must be at least 8 characters ⚠️");
        return;
      }

      const token = await loginUser(email, password);
      if (!token) {
        setEmail("");
        setPassword("");
        setError(
          "⚠️ Error : login not successful. An account may have not been created with those details. Otherwise, try again later. ⚠️"
        );
        return;
      }
      setToken(token);
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("⚠️ Error : login not successful ⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLogout = async () => {
    setIsLoading(true);
    try {
      setWeatherEntriesArr([]);
      setEmail("");
      setPassword("");
      setCityInput("");
      setCountryCodeInput("");
      setError("");
      setskipInitialEffect(true);
      setToken(null);
    } catch (error) {
      setError("⚠️ Error : Logout not successful ⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  /* Backend deletion is completed before updating frontend state 
  to ensure frontend constraints are not bypassed in handleGetAllEntries().
  */

  const deleteWeatherEntry = (
    deleteCity: string,
    deleteCountryCode: string
  ) => {
    setIsLoading(true);
    try {
      if (!token) {
        setError("⚠️ Error : delete unable to be completed. ⚠️");
        setIsLoading(false);
        return;
      }
      const responseOk = deleteEntry(deleteCity, deleteCountryCode, token);
      if (!responseOk) {
        setError("⚠️ Error : delete unable to be completed ⚠️");
        setIsLoading(false);
        return;
      }
      setError("");
    } catch (error) {
      setError("⚠️ Error : delete unable to be completed ⚠️");
      setIsLoading(false);
      return;
    }

    try {
      if (deleteCity === "" || deleteCountryCode === "") return;
      setWeatherEntriesArr((prevWeatherEntriesArr) =>
        prevWeatherEntriesArr.filter(
          (entry) =>
            !(
              entry.city === deleteCity &&
              entry.countryCode === deleteCountryCode
            )
        )
      );
    } catch (error) {
      setError("⚠️ Error : delete not completed locally⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeatherArr = (
    data: WeatherData,
    status: EntryStatus,
    city?: string,
    countryCode?: string
  ) => {
    setIsLoading(true);
    try {
      /* New entries and retrieved entries are treated differently:
      -   New entries use state-based input field values
      -   Retrieved entries use values from the database 
      */
      let entry: WeatherEntry | undefined;
      if (status === "new") {
        if (!token) {
          setError("⚠️ Error : Weather entry unable to be added ⚠️");
          return;
        }
        entry = dataConverter(cityInput, countryCodeInput, data);
      }
      if (status === "retrieved") {
        if (!city || !countryCode) return;
        entry = dataConverter(city, countryCode, data);
      }

      if (!entry) {
        if (status === "retrieved") {
          setError(
            `⚠️ Error : Entry ${city}, ${countryCode} weather entry not displayed ⚠️`
          );
          return;
        }
        if (status === "new") {
          setError("⚠️ Error : Weather entry unable to be added");
          return;
        }
        setError("⚠️ Error : Weather entry unable to be added");
        return;
      }
      setWeatherEntriesArr((prev) => [...prev, entry]);
      setCityInput("");
      setCountryCodeInput("");
      setError("");
    } catch (error) {
      if (status === "retrieved") {
        setError(
          `⚠️ Error : Entry ${city}, ${countryCode} weather entry not displayed ⚠️`
        );
        return;
      }
      if (status === "new") {
        setError("⚠️ Error : Weather entry unable to be added");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (reachedLimit(weatherEntriesArr)) {
        setError("⚠️ Limit reached. Delete a reading ⚠️");
        setCityInput("");
        setCountryCodeInput("");
        return;
      }
      if (foundDuplicate(cityInput, countryCodeInput, weatherEntriesArr)) {
        setError(
          "⚠️ Reading already exists. Enter a new reading or delete the existing one ⚠️"
        );
        setCityInput("");
        setCountryCodeInput("");
        return;
      }

      if (!token) {
        setError("⚠️ Error : Weather Entry could not be added ⚠️");
        return;
      }

      /* getWeather is called before uploading city and countryCode
      to the database :
          - This prevents invalid inputs that
          cannot be caught by toTitleCase()
          from being uploaded.
          - getWeather confirms that the name returned by the
          external API matches the city input, providing
          extra protection. For instance, "Cluj Napoca"
          is correctly formatted, but if the API returns
          "Cluj-Napoca", this would indicate that the input
          was misspelt.

      */

      const result = await getWeather(cityInput, countryCodeInput);
      if (result === null) {
        setError("⚠️ Error : City or CountryCode input could be incorrect ⚠️");
        return;
      }
      const responseOk = await postEntry(cityInput, countryCodeInput, token);

      if (!responseOk) {
        setError(
          "⚠️ Error : Weather entry unable to be added. Please try again later"
        );
        return;
      }

      handleWeatherArr(result, "new");
      setError("");
    } catch (error) {
      setError("⚠️ Error : Weather entry unable to be added ⚠️");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleGetAllEntries = async () => {
      setIsLoading(true);
      try {
        if (skipInitialEffect) {
          setskipInitialEffect(false);
          return;
        }
        if (!token) {
          setError("⚠️ Weather entries unable to be retrieved ⚠️");
          return;
        }
        const result = await getAllEntries(token);
        if (!result) {
          setError("⚠️ Weather entries unable to be retrieved ⚠️");
          return;
        }
        /* Result provides each city and country code pair stored in the database.
            It is stored this way so that updated weather entries can be provided on each login.
        */

        for (let i = 0; i < result.length; i++) {
          let entry = result[i];
          const weatherResult = await getWeather(entry.city, entry.countryCode);
          if (weatherResult === null) {
            setError(``);
            continue;
          }
          handleWeatherArr(
            weatherResult,
            "retrieved",
            entry.city,
            entry.countryCode
          );
        }
      } catch (error) {
        setError(
          `⚠️ Error : Something went wrong whilst retrieving entries - Entries may be missing ⚠️`
        );
      } finally {
        setIsLoading(false);
      }
    };
    /* The external weather API provided updated results every 15 minutes.
      A 16 minute timer (refreshInterval) provides enough time for external
      API to update before fetching again.
    */
    timerRef.current = window.setTimeout(() => {
      setClockCycles((prev) => prev + 1);
      setWeatherEntriesArr([]);
    }, refreshInterval);

    handleGetAllEntries();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [token, clockCycles]);

  return (
    <div>
      {!token ? (
        <div>
          <LoggedOut
            handleUserSignup={handleUserSignup}
            handleUserLogin={handleUserLogin}
            userFormStatus={userFormStatus}
            setUserFormStatus={setUserFormStatus}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          ></LoggedOut>
          {isLoading && <Loading></Loading>}
          {error !== "" && <p className="error-p">{error}</p>}
        </div>
      ) : (
        <div>
          <LoggedIn
            handleUserLogout={handleUserLogout}
            cityInput={cityInput}
            setCityInput={setCityInput}
            countryCodeInput={countryCodeInput}
            setCountryCodeInput={setCountryCodeInput}
            handleClick={handleClick}
            weatherEntriesArr={weatherEntriesArr}
            deleteWeatherEntry={deleteWeatherEntry}
          ></LoggedIn>
          {isLoading && <Loading></Loading>}
          {error !== "" && <p className="error-p">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
