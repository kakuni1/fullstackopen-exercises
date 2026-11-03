import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const Detail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather({ lat: country.latlng[0], lon: country.latlng[1] })
      .then((data) => setWeather(data))
  }, [country])

  return (
    <div>
      <h1> {country.name.common} </h1>
      <p>Capital: {country.capital ?? "none"}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul> {Object.values(country.languages).map((language, index) =>
        <li key={index}>{language}</li>
      )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.name.common}</h2>
      {weather && (
        <>
          <p> Temperature {weather.main.temp} Celsius </p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p> Wind {weather.wind.speed} m/s </p>
        </>
      )}
    </div>
  )
}

export default Detail
