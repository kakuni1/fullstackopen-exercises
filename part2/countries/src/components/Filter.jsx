const Filter = ({ countries, show, setShow }) => {
  const ulStyle = {
    listStyleType: "none",
    padding: 0
  }

  const showCountry = (event, country) => {
    event.preventDefault()
    setShow(country)
  }

  if (show) return (
    <div>
      <h1> {show.name.common} </h1>
      <p>Capital: {show.capital ?? "none"}</p>
      <p>Area: {show.area}</p>
      <h2>Languages</h2>
      <ul> {Object.values(show.languages).map((language, index) =>
        <li key={index}>{language}</li>
      )}
      </ul>
      <img src={show.flags.png} alt={show.flags.alt} />
    </div>
  )

  if (countries.length > 10) return (
    <div>
      <p>Too many matches, specify country further</p>
    </div>
  )

  if (countries.length < 10 && countries.length > 1) return (
    <div>
      <ul style={ulStyle}>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={(event) => showCountry(event, country)}>show</button>
          </li>
        ))}
      </ul>
    </div>
  )

  if (countries.length === 1) return (
    <div>
      <h1> {countries[0].name.common} </h1>
      <p>Capital: {countries[0].capital ?? "none"}</p>
      <p>Area: {countries[0].area}</p>
      <h2>Languages</h2>
      <ul> {Object.values(countries[0].languages).map((language, index) =>
        <li key={index}>{language}</li>
      )}
      </ul>
      <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
    </div>
  )

  return (
    <div><p> No matches. </p></div>
  )
}

export default Filter
