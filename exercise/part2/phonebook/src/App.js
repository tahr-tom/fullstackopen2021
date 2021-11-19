import React, { useState } from "react"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import Persons from "./Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
