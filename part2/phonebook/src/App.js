import React, { useState, useEffect } from 'react'
import PersonService from './services/persons'
import './index.css'

const Person = (props) => 
  <div style={{display: 'flex', marginTop: 10}}>
    <div>{props.person.name}:  {props.person.number}</div>
    <button value={props.person.id} onClick={props.handleDelete} style={{marginLeft: 10}}>delete</button>
  </div>

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

const Notification = ({ message, errorType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={errorType}>
      {message}
    </div>
  )
}
const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')

  var personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  useEffect(() => {
    PersonService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    
    // Keep in useEffect to ensure UI reloads in real time when changes are made to phonebook
    personsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)   

  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    var personExists = false;

    const personObject = {
      name: newName,
      id: Math.random(),
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
      PersonService
        .create(personObject)
        .catch(error => {
          // backup server error handling in case personExists check in frontend fails
          setErrorType('redError')
          setErrorMessage (error.response.data)
        })
      setErrorType('greenError')
      setErrorMessage('Person Added Successfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    else if (personExists){
      if (window.confirm('This person already exists. Do you want to replace the old number with a new one?')){

        // Find appropriate person to replace create new obj of what updated person should be
        const personToReplace = persons.find(p => p.name === newName)
        const id = personToReplace.id
        const modifiedObject = {...personToReplace, number: newNumber}

        // Update the entire persons list with new number
        const indexToUpdate = persons.findIndex(p  => p.id === id)
        const updatedPersons = [...persons]
        updatedPersons[indexToUpdate] = {...persons[indexToUpdate], number: newNumber}

        PersonService
          .modify(modifiedObject, id)
          .then(res => {
            setPersons(updatedPersons)
            setErrorType('greenError')
            setErrorMessage('Number replaced succesfully')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        
      } else return
    }
    
    else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
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

  const handleDeleteButton = (event) => {
    if (window.confirm("Are you sure you want to delete this person?")) { 
      PersonService
        .remove(event.target.value)
        .then( () => {
          const idToDelete = persons.find(p => String(p.id) === event.target.value).id
          setPersons(persons.filter(p => p.id !== idToDelete))
          setErrorType('greenError')
          setErrorMessage('Person deleted succesfully')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch( err => {
          console.log(err)
          setErrorType('redError')
          setErrorMessage(`This person was already deleted from the server`)
          const idToDelete = persons.find(p => String(p.id) === event.target.value).id
          setPersons(persons.filter(p => p.id !== idToDelete))          
        })
    }
  }

  return (
    <div style={{margin: 30}}>
      <h2>Phonebook</h2>   
      <Notification message={errorMessage} errorType={errorType}/>        
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
          <Person 
            key={person.id}
            person={person}
            handleDelete={handleDeleteButton}
          />
        )}
      </ul> 
    </div>
  )
}

export default App