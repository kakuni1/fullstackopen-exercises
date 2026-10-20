import { useState } from "react";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("newName: ", newName);

    if (!persons.find((person) => person.name === newName)) {
      const personObject = {
        id: persons.length + 1,
        name: newName,
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
