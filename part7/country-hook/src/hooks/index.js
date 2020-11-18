import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const [found, setFound] = useState(false)
  
    useEffect(() => {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((response) => {
          if (response) {
            setCountry(response)
            setFound(true)
          }
        })
        .catch((err) => {
          console.log(err.message)
          setCountry(name)
        })
    }, [name])
  
    return {
      country,
      found
    }
}
