import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (country) => <div>{country.country.name}</div>
  
const App = () => {

  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log(countries[0])
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const countriesToShow = showAll 
    ? countries
    : countries.filter(country => country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)
  
  return (
    <div className="App">
      <div>
        find countries <input value={newFilter}  onChange={handleFilterChange}/>
      </div>
      <div>
        {
          countriesToShow.map( country =>
            <Country country={country} key={country.numericCode}/>
          )
        }
      </div>
    </div>
  );
}

export default App;
