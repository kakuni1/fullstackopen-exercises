import { useState } from "react";
import phonebookService from "../services/phonebook";

const PersonForm = ({ persons, setPersons, setMessage, setMessageType }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handlePersonChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const match = persons.find((person) => person.name === newName);

    if (!match) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .create(personObject)
        .then((created) => setPersons((previous) => previous.concat(created)))
        .then(() => {
          setMessageType("success");
          setMessage(`Added '${personObject.name}' to phonebook`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => alert(`Error: ${error.message}`));
    } else if (match.number !== newNumber) {
      if (confirm(`'${newName}' already in phonebook, update phone number?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
        };

        phonebookService
          .update(match.id, personObject)
          .then((response) => {
            setPersons((persons) =>
              persons.map((person) =>
                person.id === response.id ? response : person,
              ),
            );
          })
          .then(() => {
            setMessageType("success");
            setMessage(`Updated phone number for '${personObject.name}'`);
            setTimeout(() => setMessage(null), 5000);
          })
          .catch((error) => alert(`Error: ${error.message}`));
      }
    } else {
      alert(`"${newName}" is already in the phonebook`);
    }

    setNewName("");
    setNewNumber("");
    setMessageType("");
  };

  return (
    <div>
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
    </div>
  );
};

export default PersonForm;
