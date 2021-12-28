import React, { useEffect, useState } from "react"
import Filter from "./Filter"
import Notification from "./Notification"
import PersonForm from "./PersonForm"
import Persons from "./Persons"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addOrUpdatePerson = (event) => {
    event.preventDefault()

    const person = persons.find((p) => p.name === newName)
    if (person) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      const shouldUpdate = window.confirm(message)
      if (!shouldUpdate) return
      updateNumber(person)
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
      setMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }

  const updateNumber = (person) => {
    const changedPerson = { ...person, number: newNumber }
    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== newName ? person : returnedPerson
          )
        )
        setMessage(`Changed ${person.name}' number to ${newNumber}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch((error) => {
        setError(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  const removePerson = (id) => {
    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addOrUpdatePerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
