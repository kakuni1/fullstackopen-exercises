import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const showPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => alert(`Error: ${error.message}`));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new entry</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={showPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
