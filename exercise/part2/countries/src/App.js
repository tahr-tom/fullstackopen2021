import axios from "axios"
import { useEffect, useState } from "react"
import "./App.css"

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    setFilteredCountries(
      newFilter === ""
        ? countries
        : countries.filter((country) =>
            country.name.common.toLowerCase().includes(newFilter)
          )
    )
  }

  const ToggleableCountry = ({ country }) => {
    const [showView, setShowView] = useState(false)

    return (
      <div>
        <p>
          {country.name.common}{" "}
          <button onClick={() => setShowView(!showView)}>
            {showView ? "hide" : "show"}
          </button>
        </p>
        {showView && <CountryView country={country} />}
      </div>
    )
  }

  const CountryView = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
        <WeatherView capital={country.capital} />
      </div>
    )
  }

  const WeatherView = ({ capital }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data)
        })
    }, [])

    return (
      weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>
            <strong>temperature: </strong> {weather.main.temp} Celcius
          </p>
          <p>
            <strong>wind: </strong> {weather.wind.speed} m/s
          </p>
        </div>
      )
    )
  }

  const Countries = ({ filteredCountries }) => {
    if (filteredCountries.length === 0) {
      return ""
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return <CountryView country={country} />
    } else if (filteredCountries.length <= 10) {
      return filteredCountries.map((country) => (
        <ToggleableCountry key={country.name.common} country={country} />
      ))
    }
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
