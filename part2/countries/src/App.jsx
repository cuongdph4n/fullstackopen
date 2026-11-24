import { useEffect, useState } from "react";
import Weather from "./components/Weather";
import countriesService from "./services/countries";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const showCountries = !!name?.trim();
  const filteredCountries = countries?.filter((countryData) =>
    countryData.name.common.toLowerCase().includes(name.toLowerCase()),
  );

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setName(event.target.value);
    setSelectedCountry(null);
  };

  const renderContent = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (selectedCountry || filteredCountries.length === 1) {
      const country = selectedCountry || filteredCountries[0];

      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital.join(", ")}</p>
          <p>Area {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <Weather
            lat={country.capitalInfo.latlng[0]}
            long={country.capitalInfo.latlng[1]}
          />
        </div>
      );
    } else if (
      filteredCountries.length > 1 &&
      filteredCountries.length <= 10 &&
      !selectedCountry
    ) {
      return filteredCountries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>{" "}
          <button type="button" onClick={() => setSelectedCountry(country)}>
            show
          </button>
        </div>
      ));
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="name">find countries</label>{" "}
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleFilterChange}
          disabled={!countries}
        />
      </div>
      {showCountries && renderContent()}
    </div>
  );
}

export default App;
