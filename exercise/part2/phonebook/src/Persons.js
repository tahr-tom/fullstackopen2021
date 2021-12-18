const Persons = ({ persons, searchTerm, removePerson }) => {
  return (
    <div>
      {" "}
      {persons
        .filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {`${person.name} ${person.number}`}{" "}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </div>
        ))}
    </div>
  )
}

export default Persons
