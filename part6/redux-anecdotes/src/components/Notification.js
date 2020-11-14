import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const n = useSelector(state => state.notification)[0]

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(n.content.length)
  return (
    <div>
      { n.content.length > 0 
        ? <div key={n.id} style={style}> {n.content} </div>
        : <div> </div>
      }
    </div>
  )
}

export default Notification