import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createOne = async(authToken, blog) => {
  console.log('inside createONe')
  const request = await axios.post(baseUrl, blog, {
    headers: {
      'Authorization': authToken
    }
  })
  console.log(request)
  return request.data
}

const updateOne = async updatedBlog => {
  console.log('inside update one')
  const id = updatedBlog.user.id

  const request = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  
  console.log(request)
  return request.data
}

// For DELETE requests only send the id to the server.
// Only send data as request body for PUT, POST requests.
const deleteOne = async idToDelete => {
  console.log('inside delete one')
  console.log(idToDelete)

  const request = await axios.delete(`${baseUrl}/${idToDelete}`)
  
  console.log(request)
  return request.data

}

export default { getAll, createOne, updateOne, deleteOne }