import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

export const Notification = () => {

    const notification = useSelector(state => { return state.notification})
    console.log(notification)
    return(
        <div>
            { notification.message
                ? <Alert id={notification.type}> <p>{notification.message}</p> </Alert>
                : <div></div>
            }
        </div>


    )
}
