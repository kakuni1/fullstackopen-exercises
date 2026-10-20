const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}> {person.name} </p>
    ))}
  </div>
);

export default Persons;
