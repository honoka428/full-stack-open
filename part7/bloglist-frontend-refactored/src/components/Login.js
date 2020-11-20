import React from 'react'
import loginService from '../services/login'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, removeUser } from '../reducers/userReducer'
import { updateUsername, updatePassword } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({ username, password })

      console.log(`response: ${response.data}`)

      if(response === 'invalid username or password'){
        dispatch(toggleOnNotification({
          type: 'redError',
          message: 'invalid username or password'
        }))
        dispatch(removeUser())
      }
      else {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
        dispatch(setUser())
        dispatch(toggleOnNotification({
          type: 'greenError',
          message: 'Successfully logged in.'
        }))
      }

      setTimeout(() => {
        dispatch(toggleOffNotification())
      }, 3000)

    } catch (err) {
      dispatch(toggleOnNotification({
        type: 'redError',
        message: String(err)
      }))
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2> Login </h2>
      <Form.Group>
        username
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(updateUsername(target.value))}
        />
      </Form.Group>
      <Form.Group>
        password
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(updatePassword(target.value))}
        />
      </Form.Group>
      <Button type="submit">login</Button>
    </Form>
  )
}

export { LoginForm }