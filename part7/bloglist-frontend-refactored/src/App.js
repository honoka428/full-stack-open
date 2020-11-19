import React, { useState, useEffect } from 'react'
import { BlogForm } from './components/BlogForm'
import { BlogList } from './components/BlogList'
import { UserList } from './components/UserList'
import { LoginForm } from './components/Login'
import { LogoutForm } from './components/Logout'
import { Toggleable } from './components/Toggleable'
import { Notification } from './components/Notification'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './reducers/userReducer'
import { updateToken } from './reducers/tokenReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { getAllUsers } from './reducers/allUsersReducer'

const App = () => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
      dispatch(initializeBlogs())
      dispatch(getAllUsers())
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
    <LogoutForm />

  const blogList = () =>
    <BlogList/>

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

  const userList = () => 
    <UserList />

  return (
    <Router>
      <div>
        <h1>Blog List</h1>
        <Notification />
        {user === null ? loginForm() : logoutForm(user)}
        {/* <Navigation /> */}
      </div>
      <div>
        <Link to='/'/>
        <Link to='/users'/>
      </div>
      <Switch>
        <Route exact path='/'>
          {user !== null && blogForm()}
          {user !== null && blogList()}
        </Route>
        <Route path='/user'>
          { user !== null && userList()}
        </Route>
      </Switch>
    </Router>
  )
}

export default App