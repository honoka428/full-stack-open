import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    
    props.changeFilter(event.target.value)
    // input-field value is in variable event.target.value
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)