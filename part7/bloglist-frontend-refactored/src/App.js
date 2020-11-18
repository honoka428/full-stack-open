import React, { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/Login'
import { LogoutForm } from './components/Logout'
import { Toggleable } from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('greenError')
  const [token, setToken] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const blogs = useSelector(state => { return state.blog })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs)
      )
    })
  }, [errorMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(`bearer ${user.token}`)
    }
  }, [])

  const handleLogin = async (event, next) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      if ( user === 'invalid username or password') {
        setUser(null)
        setErrorMessage('invalid username or password')
        setErrorType('redError')
      }

      else {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        setUser(user)
        setErrorMessage('Successfully logged in.')
        setErrorType('greenError')
      }

      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    } catch (err) {
      next(err)
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    try {
      setUser(null)
      setUsername('')
      setPassword('')
      setToken('')
      window.localStorage.clear()
      setErrorMessage('Successfully logged out.')
      setErrorType('greenError')
    }
    catch(err){
      console.log(err)
      setErrorMessage('There was a problem logging you out. Please try again later.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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

  const likeBlog = async updatedBlog => {
    try {
      await blogService.updateOne(updatedBlog)
      setErrorMessage(`Successfully liked ${updatedBlog.title}`)
      setErrorType('greenError')
    }

    catch(err) {
      console.log(err)
      setErrorMessage('There was a problem liking this blog post.')
      setErrorType('redError')
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const deleteBlog = async idToDelete => {
    try {
      await blogService.deleteOne(idToDelete)
      setErrorMessage('Successfully deleted blog.')
      setErrorType('greenError')
    }
    catch(err){
      console.log(err)
      setErrorMessage('There was a problem deleting your blog post.')
      setErrorType('redError')
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const blogList = () =>
    <div className="blogList">
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => a.likes - b.likes) // if a.likes - b.likes returns negative, sort a.likes first
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        )
      }
    </div>

  const Notification = props =>
    <div id={errorType}>
      <p>{props.message}</p>
    </div>

  const blogForm = () =>
    <Toggleable
      buttonLabel='new blog'
      setVisible={setVisible}
      visible={visible}
    >
      <BlogForm 
        // createBlog={createBlog}
        token={token}
        setErrorType={setErrorType}
        setErrorMessage={setErrorMessage}
        setVisible={setVisible}
        visible={visible}
      />
    </Toggleable>

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() : logoutForm(user)}
      {user !== null && blogForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App