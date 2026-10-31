import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Query from "./components/Query";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(null)
  const [query, setQuery] = useState("");

  const showCountries =
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    countriesService
      .getAll()
      .then((data) => setCountries(data))
  }, [])

  return (
    <div>
      <Query query={query} setQuery={setQuery} />
      <Filter countries={showCountries} show={show} setShow={setShow} />
    </div>
  );
};

export default App;

