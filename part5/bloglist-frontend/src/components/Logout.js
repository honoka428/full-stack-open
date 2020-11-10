import React from 'react'

const LogoutForm = props =>
  <form onSubmit={props.handleLogout}>
    <div> Hello, {props.user.name}! </div>
    <button type="submit">logout</button>
  </form>

export { LogoutForm }