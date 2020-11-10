import React from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {

  const showWhenVisible = { display: props.visible ? '' : 'none' }
  const hideWhenVisible = { display: props.visible ? 'none' : '' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export { Toggleable }
