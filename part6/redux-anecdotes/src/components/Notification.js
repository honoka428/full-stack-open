import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const [ visible, setVisible ] = useState(false)

  const notification = useSelector(state => state.notification)

  // Does not remove view in 5 seconds
  // Try to set different action creators to set and remove notifications (INSTEAD OF USING visible STATES)
  useEffect(() => {
    setVisible(!visible)
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? 'none' : ''
  }

  console.log(notification)

  return (
    <div style={style}>
      {notification.map(n => 
        <div key={n.id}> {n.content} </div>
      )
      }
    </div>
  )
}

export default Notification