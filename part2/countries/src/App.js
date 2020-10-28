import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = (props) => 
    <div style={{paddingTop: 20, display: 'flex'}}>
      <div>{props.country.name}</div>
      <button type="button" style={{marginLeft: 10}} onClick={props.handleClick} name={props.country.name} value={props.country.capital}>show</button>
    </div>
  
const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [countryWeather, setCountryWeather] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const getCountryWeather = (capital) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setCountryWeather(response.data)
      })
      .catch( err => {
          console.error(err)
      })
  }
  var filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  const handleShowBtnClick = (event) => {
    const country = event.target.name
    const capital = event.target.value

    setNewFilter(country)
    setFiltered(true)
    getCountryWeather(capital)
  }
  
  const handleFilterChange = (event) => {
    const country = event.target.value
    const capital = filteredCountries[0].capital

    setNewFilter(country)
    setFiltered(true)
    getCountryWeather(capital)
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
    const country = filteredCountries[0]
    const weather = countryWeather.current

    FilteredSearchResult = 
      <div>
        <h1>{country.name}</h1>
        <div> Capital: {country.capital}</div>
        <div> Population: {country.population}</div>
        <div>
          <h2>Languages:</h2>
          <ul>{country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}</ul>
        </div>
        <img src={country.flag} style={{height: 200}} alt="country flag"/>
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>Temperature: {weather.temperature} Celcius </div>
          <img src={weather.weather_icons} alt="weather icon"/>
          <div>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </div>        
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
