import React, { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/Login'
import { LogoutForm } from './components/Logout'
import { Toggleable } from './components/Toggleable'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './reducers/userReducer'
import { updateToken } from './reducers/tokenReducer'

const App = () => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog )
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs)
      )
    })
  }, [notification, dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(updateUser(user))
      dispatch(updateToken(`bearer ${user.token}`))
    }
  }, [dispatch])

  const loginForm = () =>
    <LoginForm />

  const logoutForm = () =>
    <LogoutForm
    />

  const blogList = () =>
    <div className="blogList">
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => a.likes - b.likes) // if a.likes - b.likes returns negative, sort a.likes first
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )
      }
    </div>

  const blogForm = () =>
    <Toggleable
      buttonLabel='new blog'
      setVisible={setVisible}
      visible={visible}
    >
      <BlogForm 
        setVisible={setVisible}
        visible={visible}
      />
    </Toggleable>

  return (
    <div>
      <h1>Blog List</h1>
      <Notification />

      {user === null ? loginForm() : logoutForm(user)}
      {user !== null && blogForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App