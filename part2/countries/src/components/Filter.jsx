import Detail from "./Detail"

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
    <Detail country={show} />
  )

  if (countries.length > 10) return (
    <div>
      <p>Too many matches, specify country further</p>
    </div>
  )

  if (countries.length <= 10 && countries.length > 1) return (
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
    <Detail country={countries[0]} />
  )

  return (
    <div><p> No matches. </p></div>
  )
}

export default Filter
