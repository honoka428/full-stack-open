import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = React.forwardRef((props, ref) => {

  const showWhenVisible = { display: props.visible ? '' : 'none' }
  const hideWhenVisible = { display: props.visible ? 'none' : '' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export { Toggleable }
