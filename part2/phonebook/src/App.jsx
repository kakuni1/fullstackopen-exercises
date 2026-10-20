import { useState } from "react";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("newName: ", newName);
    console.log("newNumber: ", newNumber);

    if (!persons.find((person) => person.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
    } else {
      alert(`"${newName}" is already in the phonebook`);
    }

    setNewName("");
  };

  const handlePersonChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterQuery = (event) => {
    const matches = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value),
    );

    // console.log(event.target.value);
    // console.log(matches);
    setFilteredPersons(matches);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input onChange={handleFilterQuery} placeholder="by name" />
      </div>
      <h2>Add new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
