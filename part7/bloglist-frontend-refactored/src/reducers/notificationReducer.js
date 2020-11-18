const initialNotification = {
    type: 'greenError',
    message: ''
}

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type) {
        case 'TURN_ON_NOTIFICATION':
            return action.data
        
        case 'TURN_OFF_NOTIFIATION':
            return initialNotification

        default: 
            return state
    }
}

export const toggleOnNotification = (notification) => {
    return ({
        type: 'TURN_ON_NOTIFICATION',
        data: notification
    })
}

export const toggleOffNotification = () => {
    return ({
        type: 'TURN_OFF_NOTIFIATION',
        data: ''
    })
}

export { notificationReducer }