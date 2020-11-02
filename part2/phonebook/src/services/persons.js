import axios from 'axios';

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

// Returns a status code
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.statusText)
}

const modify = (modifiedObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, modifiedObject)
    return request.then(response => response.data).catch(error => {console.log('failed', error)})
}

export default {getAll, create, remove, modify}