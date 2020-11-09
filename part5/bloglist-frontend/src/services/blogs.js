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

export default { getAll, createOne }