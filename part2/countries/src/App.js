import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => 
    <div style={{paddingTop: 20, display: 'flex'}}>
      <div>{props.country.name}   </div>
      <button type="button" style={{marginLeft: 10}} onClick={props.handleClick} value={props.country.name}>show</button>
    </div>
  
const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filtered, setFiltered] = useState(false)
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  var filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  const handleShowBtnClick = (event) => {
    setNewFilter(event.target.value)
    setFiltered(true)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFiltered(true)
  }

  const DefaultSearchResult = countries.map( country => <Country country={country} key={country.numericCode} handleClick={handleShowBtnClick}/> )
    
  var FilteredSearchResult = filteredCountries.map( country => <Country country={country} key={country.numericCode} handleClick={handleShowBtnClick}/> )

  if (filteredCountries.length >= 10) {
    FilteredSearchResult = <div>Too many matches, specify another filter.</div>
  }

  if (filteredCountries.length === 0) {
    FilteredSearchResult = <div> No matches, try a different search. </div>
  }

  if (filteredCountries.length === 1) {
    FilteredSearchResult = 
      <div>
        <h1>{filteredCountries[0].name}</h1>
        <div> Capital: {filteredCountries[0].capital}</div>
        <div> Population: {filteredCountries[0].population}</div>
        <div>
          <h2>Languages:</h2>
          <ul>{ filteredCountries[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}</ul>
        </div>
        <img src={filteredCountries[0].flag} style={{height: 200}}/>
      </div>
  }

  const CountriesToShow = () => filtered
    ? FilteredSearchResult
    : DefaultSearchResult

  return (
    <div className="App" style={{margin: 20}}>
      <div style={{marginBottom: 10}}>
        find countries <input value={newFilter}  onChange={handleFilterChange}/>
      </div>
      <div>
        <CountriesToShow/>
      </div>
    </div>
  );
}

export default App;
