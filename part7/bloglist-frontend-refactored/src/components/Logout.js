import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { toggleOnNotification, toggleOffNotification } from '../reducers/notificationReducer'
import { initializeLoginForm } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Navigation } from  './Navigation'

const LogoutForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = event => {
    event.preventDefault()
    
    try {
      dispatch(removeUser())
      dispatch(initializeLoginForm())
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
    <div>
      <form onSubmit={handleLogout}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}> 
          <p style={{fontSize: 40, fontWeight: 'bold', color: 'palevioletred'}}>Hi, {user.name}!</p>
          <Button style={{backgroundColor: 'palevioletred', border: 'none'}} type="submit">logout</Button> 
        </div>
      </form>
      <Navigation />
    </div>
 ) 
}

export { LogoutForm }