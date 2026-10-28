const Filter = ({ countries }) => {
  const ulStyle = {
    listStyleType: "none",
    padding: 0
  }

  if (countries.length > 10) return (
    <div>
      <p>Too many matches, specify country further</p>
    </div>
  )

  if (countries.length < 10 && countries.length > 1) return (
    <div>
      <ul style={ulStyle}>
        {countries.map((country) => (
          <li key={country.cca3}> {country.name.common} </li>
        ))}
      </ul>
    </div>
  )

  if (countries.length === 1) return (
    <div>
      <h1 key={countries[0].cca3}> {countries[0].name.common} </h1>
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

  else return (
    <div><p> No matches. </p></div>
  )
}

export default Filter
