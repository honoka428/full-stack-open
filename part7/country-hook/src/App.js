import React, { useState } from 'react'
import { useField, useCountry } from './hooks/index'

const Country = ({ country }) => {

  if (!country.country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const info = country.country.data[0]

  return (
    <div>
      <h3>{info.name} </h3>
      <div>capital {info.capital} </div>
      <div>population {info.population}</div> 
      <img src={info.flag} height='100' alt={`flag of ${info.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App