import React, { useState } from 'react'

const Person = (person) => <div>{person.person.name}</div>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    var personExists = false;

    const personObject = {
      name: newName,
      id: persons.length + 1
    }

    persons.forEach( e => {
      if (e.name === newName) {
        personExists = true
        return
      }
    })
    
    if (!personExists) {
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>     
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                value={newName}  
                onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul> 
    </div>
  )
}

export default App