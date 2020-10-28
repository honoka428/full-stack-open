import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(error => {console.log('failed', error)})
}

export default {getAll, create, remove}