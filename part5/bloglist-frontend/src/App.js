import React, { useState, useEffect } from 'react'
import {Blog, BlogForm} from './components/Blog'
import {LoginForm} from './components/Login'
import {LogoutForm} from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('greenError')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(`bearer ${user.token}`)
    }
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
      
      setUser(user)
      setErrorMessage('Successfully logged in.')
      setErrorType('greenError')

    } catch (err) {
      console.log(err)
      setErrorMessage('Wrong credentials')
      setErrorType('redError')

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
      window.localStorage.clear()
      setErrorMessage('Successfully logged out.')
      setErrorType('greenError')            
    }
    catch(err){
      console.log(err)
      setErrorMessage('There was a problem logging you out. Please try again later.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async event => {
    event.preventDefault()

    const newBlog = {
      "title": title,
      "author": author,
      "url": url
    }

    try {
      await blogService.createOne(token, newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage('Successfully created blog post.')
      setErrorType('greenError')
      setBlogFormVisible(false)
    }
    catch(err) {
      console.log(err)
      setErrorMessage('There was a problem creating your blog post.')
      setErrorType('redError')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const loginForm = () =>
    <LoginForm 
      handleLogin={handleLogin}  
      setUsername={setUsername}
      setPassword={setPassword}
      username={username}
      password={password}
    />

  const logoutForm = user =>
    <LogoutForm 
      handleLogout={handleLogout}
      user={user}
    />

  const blogList = () =>
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div> 

  const Notification = props =>
    <div id={errorType}>
      <p>{props.message}</p>
    </div>

  const createBlog = () => 
    <BlogForm 
      handleCreateBlog={handleCreateBlog}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      title={title}
      author={author}
      url={url}
      blogFormVisible={blogFormVisible}
      setBlogFormVisible={setBlogFormVisible}
    />    

  return (
    <div>
      <h1>Login</h1>
      <Notification message={errorMessage} />

      {user === null && loginForm()}
      {user !== null && logoutForm(user)}
      {user !== null && blogList()}
      {user !== null && createBlog()}
    </div>
  )
}

export default App