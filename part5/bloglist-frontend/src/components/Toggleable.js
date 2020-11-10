import React from 'react'

const Toggleable = (props) => {

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
}

export { Toggleable }
