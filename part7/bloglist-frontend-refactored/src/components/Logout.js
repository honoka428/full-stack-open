import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../reducers/userReducer'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { initializeLoginForm } from '../reducers/loginReducer'
import { resetToken } from '../reducers/tokenReducer'

const LogoutForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = event => {
    event.preventDefault()

    try {
      dispatch(updateUser(null))
      dispatch(initializeLoginForm())
      dispatch(resetToken())
      window.localStorage.clear()
      dispatch(toggleOnNotification({
        type: 'greenError',
        message: 'Successfully logged out.'
      }))
    }
    catch(err){
      console.log(err)
      dispatch(toggleOnNotification({
        type: 'redError',
        message: 'There was a problem logging you out. Please try again later.'
      }))
      setTimeout(() => {
        dispatch(toggleOffNotification())
      }, 3000)
    }
  }

  return(
    <form onSubmit={handleLogout}>
      <div> Hello, {user.name}! </div>
      <button type="submit">logout</button>
    </form>
 ) 
}


export { LogoutForm }