import { toTitleCase } from "../services/api/backend/weatherEntry/toTitleCase";

export function InputForm({
  cityInput,
  setCityInput,
  countryCodeInput,
  setCountryCodeInput,
  handleClick,
}: {
  cityInput: string;
  setCityInput: React.Dispatch<React.SetStateAction<string>>;
  countryCodeInput: string;
  setCountryCodeInput: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}) {
  return (
    <div className="input-elements">
      <input
        value={cityInput}
        placeholder="Insert City"
        onChange={(e) => setCityInput(toTitleCase(e.target.value))}
      ></input>
      <input
        value={countryCodeInput}
        placeholder="Insert Country Code"
        onChange={(e) => setCountryCodeInput(e.target.value.toUpperCase())}
      ></input>
      <button onClick={handleClick}>Get Weather</button>
    </div>
  );
}
