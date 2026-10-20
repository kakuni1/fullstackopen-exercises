const Persons = ({ persons }) => (
  <div>
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td> {person.name} </td>
            <td> {person.number} </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Persons;
