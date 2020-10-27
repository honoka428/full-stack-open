import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Person = (person) => <div>{person.person.name}  {person.person.number}</div>

const Filter = (props) => <div> filter shown with: <input value={props.newFilter}  onChange={props.handleFilterChange}/></div> 
const PersonInput = (props) => 
  <form onSubmit={props.addPerson}>
    <div>
      name: <input 
            value={props.newName}  
            onChange={props.handleNameChange}
            />
    </div>
    <div>
      number: <input 
            value={props.newNumber}  
            onChange={props.handleNumberChange}
            />
    </div>        
    <div>
      <button type="submit">add</button>
    </div>
  </form>
const App = () => {

  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const personsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
  

  const addPerson = (event) => {
    event.preventDefault()

    var personExists = false;

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
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
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>     
      <Filter newFilter={newFilter}  handleFilterChange={handleFilterChange}/>

      <h2>Add New Person</h2>    
      <PersonInput 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      /> 
      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul> 
    </div>
  )
}

export default App