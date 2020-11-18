import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {

    const notification = useSelector(state => { return state.notification})
    console.log(notification)
    return(
        <div id={notification.type}>
            <p>{notification.message}</p>
        </div>
    )
}
