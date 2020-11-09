import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      
      console.log(window.localStorage.getItem('loggedNoteappUser'))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }    
  }

  const handleLogout = event => {
    event.preventDefault()

    try {
      setUser(null)
      setUsername('')
      setPassword('')
    }
    catch(err){
      console.log(err)
      setErrorMessage('There was a problem logging you out. Please try again later.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logoutForm = user => (
    <form onSubmit={handleLogout}>
      <div>
        Hello, {user.name}!
      </div>
      <button type="submit">logout</button>
    </form>      
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div> 
  )

  const Notification = props => (
    <div>
      <p>{props.errorMessage}</p>
    </div>
  )

  return (
    <div>
      <h1>Login</h1>
      <Notification message={errorMessage} />

      {user === null && loginForm()}
      {user !== null && logoutForm(user)}
      {user !== null && blogList()}

    </div>
  )
}

export default App