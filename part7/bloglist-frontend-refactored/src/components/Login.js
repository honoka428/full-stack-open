import React from 'react'
import loginService from '../services/login'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, removeUser } from '../reducers/userReducer'
import { updateUsername, updatePassword } from '../reducers/loginReducer'

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
    <form onSubmit={handleLogin}>
      <h2> Login </h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(updateUsername(target.value))}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(updatePassword(target.value))}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export { LoginForm }