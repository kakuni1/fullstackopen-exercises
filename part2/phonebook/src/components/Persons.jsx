import phonebookService from "../services/phonebook";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (event, personId, personName) => {
    event.preventDefault();

    if (confirm(`Delete: ${personName}?`)) {
      phonebookService
        .remove(personId)
        .then(
          setPersons((current) =>
            current.filter((person) => person.id !== personId),
          ),
        )
        .catch((error) => alert(`Error: ${error.message}`));
    }
  };

  return (
    <div>
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td> {person.name} </td>
              <td> {person.number} </td>
              <td>
                <form
                  onSubmit={(event) =>
                    deletePerson(event, person.id, person.name)
                  }
                >
                  <button type="submit">delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
