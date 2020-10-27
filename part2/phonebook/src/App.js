import React, { useState } from 'react'

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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 0, number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }    
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)


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