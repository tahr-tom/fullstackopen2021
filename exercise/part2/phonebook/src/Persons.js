const Persons = ({ persons, searchTerm }) => {
  return (
    <div>
      {" "}
      {persons
        .filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>{`${person.name} ${person.number}`}</div>
        ))}
    </div>
  )
}

export default Persons
