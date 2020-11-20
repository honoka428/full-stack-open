import React, { useState, useEffect } from 'react'
import { BlogForm } from './components/BlogForm'
import { BlogList } from './components/BlogList'
import { BlogDetails } from './components/BlogDetails'
import { UserList } from './components/UserList'
import { LoginForm } from './components/Login'
import { LogoutForm } from './components/Logout'
import { Toggleable } from './components/Toggleable'
import { Notification } from './components/Notification'
import './App.css'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { UserBlogs } from './components/UserBlogs'
import { getAllUsers } from './reducers/allUsersReducer'

const App = () => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
      dispatch(setUser())
      dispatch(initializeBlogs())
      dispatch(getAllUsers())
  }, [notification, dispatch])

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
  console.log(user)

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
        <Link to='/users/:id'/>
      </div>
      <Switch>
        <Route exact path='/'>
          {user !== null && blogForm()}
          {user !== null && blogList()}
        </Route>
        <Route exact path='/users'>
          {user !== null && userList()}
        </Route>
        <Route 
          exact path='/users/:id'
          render={({ match }) => 
            user !== null && <UserBlogs match={match}/>
        }/>
        <Route 
          exact path='/blogs/:id'
          render={({ match }) => 
            user !== null && <BlogDetails match={match}/>
        }/>
      </Switch>
    </Router>
  )
}

export default App