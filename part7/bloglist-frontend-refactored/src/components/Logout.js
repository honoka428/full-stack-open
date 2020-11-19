import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { initializeLoginForm } from '../reducers/loginReducer'
import {   useHistory } from 'react-router-dom'

const LogoutForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = event => {
    event.preventDefault()
    
    try {
      dispatch(removeUser())
      dispatch(initializeLoginForm())  // FIX HERE - logout doenst claer form
      window.localStorage.clear()
      dispatch(toggleOnNotification({
        type: 'greenError',
        message: 'Successfully logged out.'
      }))
      history.push('/')
    }
    catch(err){
      console.log(err)
      dispatch(toggleOnNotification({
        type: 'redError',
        message: 'There was a problem logging you out. Please try again later.'
      }))
    }
    setTimeout(() => {
      dispatch(toggleOffNotification())
    }, 3000)
  }

  return(
    <form onSubmit={handleLogout}>
      <div> Hello, {user.name}! </div>
      <button type="submit">logout</button>
    </form>
 ) 
}

export { LogoutForm }